---
title: "Cómo un censo puntual se convirtió en un instrumento público recurrente"
description: "Muniscan mapeó la superficie digital pública de las municipalidades del Perú. Su resultado más útil apareció cuando falló el segundo escaneo."
abstract: |
  Muniscan mapeó los enlaces públicos declarados por las municipalidades del Perú. El primer censo funcionó. Los dos siguientes no, y esa falla expuso un supuesto oculto del pipeline: estábamos tratando el descubrimiento como memoria.

  Así convertimos un dataset estático en un instrumento recurrente e inspeccionable sin presentar un score heurístico como una medida de calidad institucional.
date: 2026-08-21
status: result
urlSlug: muniscan
lang: es
project: muniscan
author: railly
tags: [civic-tech, datos-publicos, data-pipelines, peru]
---

## Un mapa de lo que publican las municipalidades

[Muniscan](https://muniscan.crafter.ing) parte de una pregunta acotada: ¿qué sistemas digitales públicos podemos observar desde los enlaces que las municipalidades peruanas declaran en gob.pe?

La primera corrida recolectó y clasificó esos enlaces para 1,794 municipalidades. Separó dominios municipales de plataformas centrales del Estado, publicó el snapshot crudo y documentó el método de puntuación. El resultado era útil, pero seguía siendo estático. Un censo exitoso no demuestra que el instrumento pueda correr otra vez.

## La falla útil

Los siguientes escaneos devolvieron conjuntos municipales mucho menores. Publicar cualquiera de ellos habría hecho parecer que cientos de municipalidades desaparecieron de un día para otro.

No habían desaparecido. El directorio upstream simplemente devolvió un descubrimiento incompleto.

El control de completitud de Muniscan bloqueó ambas publicaciones. Esa fue la falla correcta. También reveló el modelo mental equivocado: estábamos tratando la respuesta actual del directorio como todo el universo conocido.

El descubrimiento es una observación. No es memoria.

## Darle memoria al pipeline

La reparación volvió stateful la recurrencia. Cada escaneo ahora une el descubrimiento actual con el último censo publicado y vuelve a consultar cada municipalidad. Una municipalidad recuperada puede devolver datos frescos o un error HTTP explícito, pero no puede desaparecer silenciosamente porque una corrida de descubrimiento fue débil.

La siguiente corrida completa puntuó 1,871 municipalidades:

| Snapshot | Municipalidades | Cambio |
|---|---:|---:|
| 2026-08-08 | 1,794 | primer censo |
| 2026-08-21 | 1,871 | +78 añadidas, −1 baja explícita |

El segundo snapshot pasó el mismo control de completitud sin usar un force flag. Eso demuestra una recurrencia exitosa. Todavía no demuestra una operación mensual estable.

## Qué significa el score

El score resume enlaces visibles y clasificaciones de hostnames dentro de un snapshot congelado. Sirve para inspeccionar la forma de la superficie digital declarada por una municipalidad.

No establece propiedad, uptime, accesibilidad, seguridad, cumplimiento legal, calidad de servicio ni desempeño institucional. También publicamos una muestra HTTP estratificada de 100 dominios, pero sigue siendo una observación puntual, no un monitor de disponibilidad.

Ese límite importa más que el ranking. Una medición pública solo es útil cuando cualquiera puede entender qué la refutaría y qué afirmaciones no permite hacer.

## El instrumento público

El [atlas en vivo](https://muniscan.crafter.ing) ahora tiene dominio e identidad visual propios. Ahí cualquiera puede buscar en el censo, inspeccionar el último snapshot, descargar los datos y seguir el método.

La fuente sigue abierta:

- [último snapshot congelado](https://github.com/crafter-research/muniscan/tree/main/data/2026-08-21)
- [método](https://github.com/crafter-research/muniscan/blob/main/METHOD.md)
- [limitaciones](https://github.com/crafter-research/muniscan/blob/main/LIMITATIONS.md)
- [pipeline y datos](https://github.com/crafter-research/muniscan)

La siguiente prueba es intencionalmente aburrida: seguir corriéndolo. Suficientes ciclos completos permitirían distinguir un instrumento recurrente de una sola repetición exitosa. Hasta entonces, el resultado honesto es más pequeño y más útil: el censo puede repetirse, sus fallas son visibles y los datos incompletos no pueden reescribir el mapa en silencio.
