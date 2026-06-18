---
title: "Lo que el grafo de repos dice que se volvió el laboratorio"
description: "Una pasada por GitHub muestra que Crafter Research pasó de herramientas cívicas aisladas a corpora, agentes, harnesses de evaluación e interfaces con fuentes visibles."
date: 2026-06-18
status: milestone
urlSlug: github-repo-graph
lang: es
project: crafter-research
tags: [github, repos, estrategia, corpora, agentes, evaluacion]
---

La web antes decía algo simple: cada paper debería tener un prototipo funcional. Eso sigue siendo cierto, pero ya no es suficientemente específico.

Una pasada por GitHub sobre la organización el 18 de junio de 2026 muestra una forma más clara: **Crafter Research se está volviendo un laboratorio de sistemas de evidencia**. La superficie pública ya no son solo apps. Son corpora, engines, SDKs, benchmarks, grafos y registros de investigación que muestran cómo se movieron las conclusiones.

## El grafo de repos

La organización de GitHub tiene 27 repos: 23 públicos y 4 privados. El trabajo más activo de esta semana cae en cuatro arcos.

| Arco | Repos | Qué cambió |
| --- | --- | --- |
| Stack de investigación legal | [legalize-pe](https://github.com/crafter-research/legalize-pe), [legalize-pe-engine](https://github.com/crafter-research/legalize-pe-engine), [amicus](https://amicus.crafter.ing), [amicus-sdk](https://github.com/crafter-research/amicus-sdk) | El trabajo ya cubre corpus, engine, asistente, SDK, docs y evaluación de retrieval. |
| Grafo de trámites ciudadanos | [tramites-pe](https://github.com/crafter-research/tramites-pe), [tramites-pe-engine](https://github.com/crafter-research/tramites-pe-engine) | El scraper y el engine separan la verdad del corpus de la investigación derivada sobre grafos. |
| Cultura de evaluación | [latambench](https://github.com/crafter-research/latambench), [website](https://github.com/crafter-research/website) | Benchmarks y logs ahora registran cuándo la primera conclusión estuvo mal. |
| Interfaces cívicas | [peru-financia](https://github.com/crafter-research/peru-financia), [political-graph](https://github.com/crafter-research/political-graph), [sunat-cli](https://github.com/crafter-research/sunat-cli), [andenar](https://andenar.crafter.ing) | La capa cívica anterior sigue sirviendo, pero ahora es parte de una historia más amplia de infraestructura de investigación. |

## Qué se movió esta semana

El patrón de commits recientes importa más que el conteo de repos.

- **amicus** escaló el gold set de retrieval a 35 pares firmes usando anotación dual y ciega. Eso convirtió un resultado llamativo inicial en un hallazgo más cauteloso: el rerank cargaba el resultado cuando la historia del set chico colapsó.
- **tramites-pe** recolectó la taxonomía de servicios ciudadanos de gob.pe, el grafo de procesos y el directorio canónico de entidades.
- **tramites-pe-engine** convirtió el corpus en un explorador web y mapa de procesos, incluyendo una librería de objetivos derivada de grafos de servicios públicos.
- **LatamBench** ajustó contabilidad de evaluación: conteos válidos, métricas de alucinación, métricas de abstención y artefactos de calibración de jueces.

Esta es la estrategia real: convertir data pública en sustratos durables, poner agentes encima y medir las partes que pueden fallar.

## El cambio importante

La web antigua agrupaba proyectos como apps activas y herramientas. Tenía sentido en marzo. Ahora distorsiona.

La unidad de trabajo ya no es "proyecto". La unidad es **evidencia inspeccionable**:

- corpus: normas legales, servicios de gob.pe, financiamiento político, data electoral
- engine: retrieval, construcción de grafos, pathfinding, scoring
- evaluación: gold sets, ablations, acuerdo entre jueces, gates de precisión
- interfaz: asistente, explorador, CLI, SDK, website
- log: qué creíamos, qué se rompió, qué sobrevivió

Por eso había que cambiar la web. Un visitante debería entender el laboratorio por su cadena de evidencia, no por un grid de portafolio.

## Qué sigue siendo honesto

Algunos claims todavía son tempranos:

- El gold set de amicus tiene 35 pares firmes, no es un benchmark legal-grade.
- El grafo de trámites tiene señales útiles, pero el engine encontró que las dependencias reales suelen vivir fuera de una sola página pública.
- LatamBench es una plataforma de evaluación, pero la metodología de benchmarks sigue moviéndose.
- Algunos sistemas activos, como amicus y Andenar, son parcialmente privados mientras sus interfaces públicas o SDKs están expuestos.

El estándar de investigación no es esconder los puntos débiles. Es publicar el punto débil al lado del artefacto.

## Actualización de la web

La home ahora dice lo que dicen los repos:

> Sistemas de investigación que se pueden inspeccionar.

Ese es el marco operativo actual. Cada nuevo claim público debería apuntar a una fuente, run, repo, interfaz viva o research log. Si no puede, todavía no está listo para la home.
