---
title: "Medir si nuestra búsqueda legal de verdad funciona"
description: "Construimos un asistente hybrid-RAG sobre 21,000 normas peruanas. Después lo medimos, y la conclusión se movió tres veces a medida que la evaluación se volvía más rigurosa."
abstract: |
  Construimos un asistente hybrid-RAG sobre 21,000 normas peruanas. Después lo medimos, y la conclusión se movió tres veces a medida que la evaluación se volvía más rigurosa.

  Cualquiera arma un RAG. Pocos miden si funciona. Este es el registro de medir el nuestro, y de ver cómo la respuesta cambiaba a medida que la medición mejoraba.
date: 2026-06-18
status: result
urlSlug: measuring-legal-retrieval
lang: es
project: legalize-pe
author: railly
tags: [retrieval, evaluacion, rag, ablation, legal-nlp]
---

## El sistema

[legalize-pe](https://legalize-pe.crafter.ing) es un corpus abierto y versionado en git de la legislación peruana: ~21,000 documentos markdown, nacional más 26 jurisdicciones regionales. Encima construimos [amicus](https://amicus.crafter.ing), un asistente de investigación legal que responde en español llano y cita la norma.

Todo en este registro es reproducible. El corpus vive en [legalize-pe](https://github.com/crafter-research/legalize-pe) y su motor de retrieval en [legalize-pe-engine](https://github.com/crafter-research/legalize-pe-engine). El harness de evaluación, el gold set y cada métrica de abajo salen de [amicus-eval](https://github.com/crafter-research/amicus-eval), un benchmark abierto que puedes volver a correr. También hay un [amicus-sdk](https://github.com/crafter-research/amicus-sdk) (el CLI `@crafter/amicus` y servidor MCP) para consultar el corpus directo.

El retrieval es la parte difícil. El pipeline apila tres piezas:

```
query → [expand] → [búsqueda híbrida: FTS + embeddings, fusionados por RRF] → [rerank] → respuesta
```

Reciprocal Rank Fusion es el pegamento. Mezcla los rankings de palabra y de vector sin mirar sus scores crudos, solo sus posiciones:

```typescript
// Reciprocal Rank Fusion: mezcla dos listas ordenadas por posición, no por score.
const RRF_K = 60;

function fuse(lists: string[][], k = RRF_K): string[] {
  const scores = new Map<string, number>();

  for (const ranking of lists) {
    ranking.forEach((docId, rank) => {
      const contribution = 1 / (k + rank + 1);
      scores.set(docId, (scores.get(docId) ?? 0) + contribution);
    });
  }

  return [...scores.entries()]
    .sort(([, a], [, b]) => b - a)
    .map(([docId]) => docId);
}

const fused = fuse([ftsResults, vectorResults]);
console.log(`fused ${fused.length} candidates`);
```

- **FTS**: búsqueda de texto completo en español (por palabra).
- **embeddings**: búsqueda semántica sobre pgvector.
- **RRF**: Reciprocal Rank Fusion, mezcla los dos rankings.
- **expand**: reescribe una consulta coloquial a términos legales.
- **rerank**: un LLM reordena candidatos, prefiriendo la norma núcleo sobre su reglamento.

La pregunta que responde este registro: **¿cuál de estas piezas de verdad carga el resultado?**

## La trampa de la evaluación chica

La primera vez que medimos, teníamos un gold set de 19 pares consulta→norma, anotado por una persona. La tabla de ablations decía algo llamativo: el pipeline completo en producción (`best`) *no* era la mejor configuración. La búsqueda híbrida más expansión de consulta (`rrf+expand`, sin rerank) le ganaba.

Eso es un buen tweet. También resultó ser falso.

El gold set era muy chico y anotado por un solo juez. Así que lo escalamos, y cambiamos el método para defendernos de nuestro propio sesgo.

## Dos anotadores, a ciegas

Armamos una hoja de 50 candidatos consulta→norma en seis estratos (coloquial, técnico, multi-norma, núcleo-vs-reglamento, subnacional, fuera de alcance). Después **dos modelos la anotaron de forma independiente y a ciegas**, ninguno vio la respuesta esperada ni la anotación del otro:

- Claude (Opus)
- Codex (gpt-5.5, razonamiento alto)

Donde coincidían, el par se volvía gold automáticamente. Donde divergían, un humano arbitraba leyendo el texto de la norma (no eligiendo un favorito). El acuerdo entre los dos anotadores es en sí una medición: de qué tan difícil es cada estrato.

| Estrato | Acuerdo entre anotadores |
|---|---:|
| técnico-legal | 100% |
| fuera de alcance | 100% |
| coloquial | 92% |
| multi-norma | 86% |
| núcleo-vs-reglamento | 86% |
| **subnacional** | **22%** |

Ese 22% es un hallazgo, no un fallo. Dos anotadores competentes, leyendo el mismo corpus, coinciden en la norma subnacional correcta solo dos de nueve veces. El corpus regional es *intrínsecamente ambiguo*: muchas ordenanzas tratan materias genéricas ("declaración de interés público"), reutilizan números entre años y órganos, y no tienen una única respuesta correcta. Medimos la ambigüedad en vez de asumirla.

## La conclusión se movió

Acá está la parte honesta. Corrimos la misma ablation tres veces, sobre gold sets cada vez mejores:

| Config (MRR) | $N=19$, 1 juez | $N=28$, 2 jueces | $N=35$, +subnacional |
|---|---:|---:|---:|
| fts (solo palabras) | 0.092 | 0.090 | 0.089 |
| vec (solo embeddings) | 0.495 | 0.538 | 0.511 |
| rrf (híbrido) | 0.367 | 0.400 | 0.401 |
| rrf+expand | **0.755** | 0.656 | 0.605 |
| rrf+rerank | 0.657 | 0.819 | **0.792** |
| best (pipeline completo) | 0.657 | **0.862** | 0.761 |

Lee las filas `rrf+expand` y `best` de arriba a abajo. La historia se reescribió sola:

- **$N=19$**: "expand es lo que importa; el pipeline en producción no es óptimo".
- **$N=28$**: "no, el pipeline completo domina".
- **$N=35$**: "la pieza que carga el resultado es el **rerank**. `rrf+rerank` (0.792) le saca ventaja al pipeline completo `best` (0.761)".

Así que la conclusión se asentó en el rerank, y en un punto de segundo orden: con $N=35$, agregar expansión de consulta encima del rerank no ayuda. La config `rrf+rerank` sin expand puntúa un poco más alto que `best`. Leemos ese gap (0.792 vs 0.761) como ruido dentro de un intervalo de confianza amplio, no como evidencia de que expand dañe. El claim honesto es que expand es neutro una vez que está el rerank, no la pieza que carga el resultado como hizo parecer la primera corrida.

El hallazgo viral de esa primera corrida (*tu pipeline en producción no es óptimo por culpa de expand*) era un artefacto de un gold chico, de un solo anotador. Murió al escalar. Si lo hubiéramos publicado, habríamos publicado ruido.

## Lo que sobrevivió cada corrida

Dos resultados aguantaron $N=19$, $N=28$ y $N=35$. Esos son los confiables:

1. **FTS solo es casi inútil con lenguaje natural** (MRR ~0.09). Una consulta en forma de pregunta completa obliga a que todas las palabras clave aparezcan a la vez, así que el recall colapsa. FTS solo gana su lugar en el estrato fuera de alcance, donde se abstiene correctamente más seguido que cualquier otra config (el estrato es chico, así que léelo como dirección, no como tasa precisa).

2. **Embeddings solo le ganan al híbrido ingenuo** (vec 0.51 > rrf 0.40). Fusionar un buen retriever semántico con uno léxico roto *degrada* el resultado. RRF puro pondera cada lista por posición de rank y no tiene señal de qué tan confiable es cada retriever, así que el ranking malo de FTS inyecta candidatos basura en el tope de la lista fusionada y empuja hacia abajo los buenos hits vectoriales. Cuando un retriever es mucho más débil, la fusión sin pesos arrastra al bueno con él. Este es el contraintuitivo, y es el más robusto.

## La lección

> Afina tus baselines hasta que duela. Ablaciona hasta saber qué componente carga el resultado: suele ser uno, y suele no ser el que adivinarías.

Corrimos el experimento tres veces. La conclusión solo dejó de moverse cuando el baseline dejó de ser ruidoso. El primer número se sentía como un resultado. Era una medición de nuestro gold set, no de nuestro sistema.

## Limitaciones honestas

- **N=35 es chico.** Los intervalos de confianza son amplios. Son señales, todavía no resultados publicables.
- **No hay abogado en el equipo.** Vigencia, derogación y qué norma prevalece se marcaron `needs_lawyer` y se excluyeron del set firme. El arbitraje de divergencias se hizo leyendo texto, por no-abogados, y está marcado como tal.
- **Tres consultas subnacionales se descartaron** como no-anotables (materia genérica, sin norma única correcta). Ese descarte es el 22% de acuerdo hecho concreto.

Próximo milestone: escalar el gold más allá de 100, conseguir validación legal del set `needs_lawyer`, y re-correr. El corpus, el [harness de evaluación](https://github.com/crafter-research/amicus-eval) y el gold set son todos abiertos, así que puedes reproducir estos números o romperlos.
