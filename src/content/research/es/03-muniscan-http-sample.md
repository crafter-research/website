---
title: "Qué pueden decirnos 100 requests HTTP y qué no"
description: "Muestreamos un dominio municipal de cada una de 100 municipalidades. El resultado útil no fue otro ranking, sino un límite más estricto sobre lo que prueba una observación."
abstract: |
  Muniscan seleccionó 100 municipalidades en cinco franjas del ranking e hizo un request HTTP a un dominio municipal clasificado de cada una. Sesenta y ocho hosts devolvieron una respuesta HTTP y 53 devolvieron 2xx.

  Esos números son observaciones, no uptime. Esta nota registra el marco muestral, el resultado y por qué un sitio alcanzable todavía puede ser inutilizable para un ciudadano.
date: 2026-08-21T18:00:00Z
status: result
urlSlug: muniscan-http-sample
lang: es
project: muniscan
author: railly
tags: [civic-tech, medicion, http, datos-publicos, peru]
---

## La pregunta detrás de la muestra

El censo de Muniscan clasifica los sistemas que las municipalidades enlazan desde sus páginas en gob.pe. Un hostname puede parecer municipal y aun así no estar disponible. La siguiente pregunta acotada era simple: si intentamos alcanzar una muestra de esos dominios una vez, ¿qué responde?

No rastreamos cada enlace ni probamos un trámite ciudadano. Seleccionamos un dominio de cada una de 100 municipalidades e hicimos un request `GET` secuencial por dominio, siguiendo redirects y con un timeout de 15 segundos.

## Cinco franjas, veinte municipalidades cada una

La muestra empieza solo con municipalidades para las que Muniscan clasifica al menos un dominio enlazado como sistema municipal. Las municipalidades sin uno quedan fuera del marco muestral.

Ordenamos la población elegible por el ranking ya congelado en el [snapshot del 2026-08-21](https://github.com/crafter-research/muniscan/tree/main/data/2026-08-21), la dividimos en cinco franjas iguales y seleccionamos 20 municipalidades espaciadas uniformemente en cada una. Para cada municipalidad seleccionada, el primer dominio clasificado en orden lexical se convirtió en el objetivo de observación.

Esto vuelve la muestra determinística para ese snapshot y la distribuye a lo largo del ranking. No la vuelve representativa de todos los sitios municipales del Perú.

## Lo que ocurrió una vez

Las [observaciones crudas](https://github.com/crafter-research/muniscan/blob/main/data/2026-08-21/health-sample.json) registran la hora del request, el status de respuesta, la URL final, el tiempo transcurrido y un error corto cuando no llegó una respuesta HTTP.

| Observación | Dominios |
|---|---:|
| Devolvieron alguna respuesta HTTP | 68 |
| Devolvieron HTTP 2xx | 53 |
| Devolvieron HTTP 403 | 14 |
| Devolvió HTTP 500 | 1 |
| Sin respuesta HTTP | 32 |

Entre los 32 requests sin respuesta, las fallas registradas incluyeron errores de conexión, timeouts, sockets cerrados y errores de certificados TLS. Son pistas útiles para otra medición. No son diagnósticos del servicio subyacente.

Las cinco franjas del ranking tampoco se movieron de forma monotónica en este resultado puntual. Sus conteos 2xx fueron 10, 16, 7, 9 y 11 de 20. Con un dominio y un momento por municipalidad, leer esa secuencia como una relación entre score y disponibilidad excedería el método.

## Alcanzable no significa usable

Una respuesta HTTP demuestra que un request llegó a un servidor y recibió un status en un momento registrado. No demuestra que un ciudadano haya podido completar un trámite.

Una página `200` puede mostrar un mensaje de error, depender de JavaScript roto, esconder el servicio real detrás de autenticación o fallar después del primer paso. Un `403` puede ser una política de seguridad deliberada. Un timeout puede ser transitorio. Ninguno de estos resultados establece propiedad, accesibilidad, seguridad, cumplimiento legal, calidad de servicio ni disponibilidad histórica.

Por eso el artefacto se llama muestra de salud, no reporte de uptime, y su resultado no se suma al score municipal.

## La siguiente medición

Una afirmación más fuerte sobre disponibilidad requeriría observaciones repetidas en el tiempo, una política de reintentos declarada y un método para separar fallas DNS, TLS, HTTP y de aplicación. Una afirmación sobre experiencia ciudadana requeriría algo distinto: recorridos de tareas explícitos, pruebas a nivel de navegador, criterios de accesibilidad y un tratamiento cuidadoso de servicios que requieren identidad o datos privados.

Por ahora, el resultado honesto es más estrecho. Muniscan tiene una forma reproducible de adjuntar una observación HTTP estratificada a un censo congelado. Cualquiera puede inspeccionar el [método](https://github.com/crafter-research/muniscan/blob/main/HEALTH-SAMPLE.md), volver a correrla y ver exactamente dónde termina la evidencia.
