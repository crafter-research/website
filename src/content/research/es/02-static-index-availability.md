---
title: "La API del Estado falló el 38% de nuestros requests"
description: "Medimos tres fuentes de datos del Estado peruano contra índices binarios estáticos. La diferencia de velocidad era esperable. La de disponibilidad no."
abstract: |
  Medimos tres fuentes de datos del Estado peruano contra índices binarios servidos como archivos inmutables. La diferencia de velocidad era esperable: microsegundos contra decenas de milisegundos.

  La de disponibilidad no. Un endpoint oficial falló 380 de 1,000 requests mientras la copia estática no falló ninguno. Para cualquier proceso que hace varios lookups seguidos, ese es el número que decide si el trabajo termina.
date: 2026-08-18
status: result
urlSlug: static-index-availability
lang: es
project: static-index-poc
author: railly
tags: [data-infrastructure, benchmarks, government-data, agents, availability]
---

## El problema de los adaptadores

Crafter Research mantiene adaptadores de línea de comandos para datos del Estado peruano: SUNAT para registros tributarios, BCRP para series macroeconómicas, JNE para candidatos electorales, y varios más. Comparten una debilidad que tardamos en nombrar. Cada uno es un cliente de una fuente que no controlamos, así que hereda todas las fallas de esa fuente y no agrega resiliencia propia. Cuando el upstream está lento, el adaptador está lento. Cuando el upstream se niega, el adaptador se niega.

La alternativa es dejar de leer la fuente en tiempo de consulta. Traerla una vez, en un horario fijo, compilarla a un artefacto inmutable, y servir ese artefacto como archivos estáticos. Los lookups entonces golpean un archivo y no un servidor del Estado.

Construimos tres pruebas de concepto para averiguar si ese intercambio vale la pena, y cuánto cuesta.

## Qué construimos

Las tres implementan el mismo formato de solo lectura: un shard binario de registros, un índice de ancho fijo ordenado por clave, y un archivo de overflow para claves que legítimamente apuntan a más de un registro. Un lookup hace búsqueda binaria sobre el índice pequeño en memoria, y después lee solo los bytes que ese índice señala. Sobre HTTP eso es un range request; en disco es una lectura posicional. El tamaño del dataset casi no afecta el costo del lookup porque el archivo grande nunca se lee entero.

El layout completo está en [FORMAT.md](https://github.com/crafter-research/static-index-poc/blob/main/FORMAT.md), y los pipelines y benchmarks en [static-index-poc](https://github.com/crafter-research/static-index-poc).

Una decisión de diseño se generaliza más allá de este trabajo. La clave del índice es un entero de 32 bits derivado de la clave del registro, y cómo se deriva decide si el índice queda balanceado. El DNI peruano tiene ocho dígitos y se parsea directo. Los códigos de series del BCRP son alfanuméricos, así que se hashean. Pero tomar un prefijo de la clave es casi siempre la opción equivocada: casi todos los RUC peruanos empiezan con `10` o `20`, así que partir por prefijo produce dos cubetas enormes en vez de muchas chicas. Derivá la clave contra la distribución real, no contra la que parece natural.

## Las mediciones

Mil lookups por método, abril de 2026.

| Dataset | Registros | Warm p50 | Fuente oficial p50 | Errores de la fuente |
| --- | ---: | ---: | ---: | ---: |
| JNE candidatos 2026 | 9,065 | 0.05 ms | 90.32 ms | 0 / 1000 |
| BCRP series macro | 16,945 | 0.07 ms | 28.98 ms | **380 / 1000** |

Las columnas de latencia son el resultado esperable y el menos interesante. Nadie necesitaba un benchmark para saber que leer un archivo local le gana a un viaje de ida y vuelta a un servidor del Estado.

La columna de errores es el hallazgo. El endpoint del BCRP devolvió una respuesta usable en 620 de 1,000 requests. No lento: directamente no.

Esa distinción importa más de lo que parece a primera vista. Una mediana de 29 milisegundos se ve tolerable, y si el trabajo es un solo lookup lo es. Pero una tasa de falla del 38% por request no se queda en 38% a lo largo de una secuencia. Diez lookups dependientes a esa tasa terminan una vez de cada cien. El sistema no se degrada, deja de terminar.

## Lo que no pudimos construir

La tercera prueba de concepto es un resultado negativo que vale la pena publicar.

La SUNEDU mantiene el Registro Nacional de Grados y Títulos. Su consulta pública está detrás de un token de Cloudflare Turnstile, un bearer token, y un captcha de imagen, y el portal de datos abiertos publica solo datasets agregados de educación, no el registro. Probamos cada camino y no recuperamos nada usable en bulk. El formato funciona sobre un fixture sintético; no hay dataset que meterle.

La lección es sobre alcance. Una primitiva de lectura hace que una fuente accesible sea más rápida y más confiable. No hace nada con una fuente que no se deja leer. La ingeniería de disponibilidad no sustituye al acceso.

## Lo que sigue débil

**Falta el número contra CDN.** Todas las cifras warm de arriba son lecturas de disco local. El argumento entero de esta primitiva descansa en servir artefactos desde un CDN, y un range request en frío contra uno no está medido. Hasta que lo esté, ningún claim sobre latencia servida por CDN corresponde acá, incluido el nuestro.

**Benchmarks viejos.** Estas corridas son de abril de 2026 y describen las fuentes como se comportaban entonces. Las columnas de error en particular deberían moverse.

**Ningún dataset publicado.** El índice del JNE usa como clave el DNI de candidatos electorales. Esos registros son públicos por ley electoral, pero un índice descargable y consultable por DNI es un artefacto distinto de un dataset publicado, y merece su propio análisis legal en vez de heredar el que escribimos para [muniscan](https://github.com/crafter-research/muniscan), cuyos sujetos son municipalidades y no personas. El repositorio trae pipelines y benchmarks; cualquiera puede reconstruir el índice corriendo el scrape.

**Nada corre en producción.** Son pruebas de concepto. Si el patrón sobrevive a un build nocturno, al drift de la fuente, y a un artefacto que nadie está mirando, es exactamente lo que una prueba de concepto no puede decirte.

## Qué cambió

Empezamos midiendo velocidad y esperábamos que la respuesta fuera sobre velocidad. Fue sobre si la respuesta llega. Los argumentos de confiabilidad a favor del caché suelen hacerse en abstracto; este tiene un número al lado, y el número es más grande que el argumento de latencia al que reemplazó.
