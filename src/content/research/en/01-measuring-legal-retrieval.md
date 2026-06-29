---
title: "Measuring whether our legal search actually works"
description: "We built a hybrid-RAG assistant over 21,000 Peruvian legal norms. Then we measured it, and the conclusion moved three times as the evaluation got more rigorous."
abstract: |
  We built a hybrid-RAG assistant over 21,000 Peruvian legal norms. Then we measured it, and the conclusion moved three times as the evaluation got more rigorous.

  Anyone can build a RAG system. Few measure whether it works. This is the log of measuring ours, and of watching the answer change as the measurement got better.
date: 2026-06-18
status: result
urlSlug: measuring-legal-retrieval
lang: en
project: legalize-pe
author: railly
tags: [retrieval, evaluation, rag, ablation, legal-nlp]
---

## The system

[legalize-pe](https://legalize-pe.crafter.ing) is an open, git-versioned corpus of Peruvian legal norms: ~21,000 markdown documents, national plus 26 regional jurisdictions. On top of it we built [amicus](https://amicus.crafter.ing), a legal research assistant that answers questions in plain Spanish and cites the norm.

Everything in this log is reproducible. The corpus lives in [legalize-pe](https://github.com/crafter-research/legalize-pe) and its retrieval engine in [legalize-pe-engine](https://github.com/crafter-research/legalize-pe-engine). The eval harness, gold set, and every metric below come from [amicus-eval](https://github.com/crafter-research/amicus-eval), an open benchmark you can rerun yourself. There is also an [amicus-sdk](https://github.com/crafter-research/amicus-sdk) (the `@crafter/amicus` CLI and MCP server) for querying the corpus directly.

Retrieval is the hard part. The pipeline stacks three pieces:

```
query → [expand] → [hybrid search: FTS + embeddings, fused by RRF] → [rerank] → answer
```

Reciprocal Rank Fusion is the glue. It merges the keyword and vector rankings without caring about their raw scores, only their positions:

```typescript
// Reciprocal Rank Fusion: merge two ranked lists by position, not score.
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

- **FTS**: Spanish full-text search (keyword match).
- **embeddings**: semantic search over pgvector.
- **RRF**: Reciprocal Rank Fusion, merges the two rankings.
- **expand**: rewrites a colloquial query into legal terms.
- **rerank**: an LLM reorders candidates, preferring the core norm over its regulation.

The question this log answers: **which of these pieces actually carries the result?**

## The trap of the small evaluation

The first time we measured, we had a gold set of 19 query→norm pairs, annotated by one person. The ablation table said something striking: the full pipeline in production (`best`) was *not* the best configuration. Hybrid search plus query expansion (`rrf+expand`, no rerank) beat it.

That is a great tweet. It is also, it turned out, wrong.

The gold set was too small and annotated by a single judge. So we scaled it, and changed the method to defend against our own bias.

## Two annotators, blind

We built a sheet of 50 query→norm candidates across six strata (colloquial, technical, multi-norm, core-vs-regulation, subnational, out-of-scope). Then **two models annotated it independently and blind**. Neither saw the expected answer, nor the other's annotation:

- Claude (Opus)
- Codex (gpt-5.5, high reasoning)

Where they agreed, the pair became gold automatically. Where they diverged, a human arbitrated by reading the norm text (not by picking a favorite). The agreement between the two annotators is itself a measurement of how hard each stratum is.

| Stratum | Inter-annotator agreement |
|---|---:|
| technical-legal | 100% |
| out-of-scope | 100% |
| colloquial | 92% |
| multi-norm | 86% |
| core-vs-regulation | 86% |
| **subnational** | **22%** |

That 22% is a finding, not a failure. Two competent annotators, reading the same corpus, agree on the right subnational norm only twice in nine tries. The regional corpus is *intrinsically ambiguous*: many ordinances cover generic matters ("declaration of public interest"), reuse numbers across years and bodies, and have no single correct answer. We measured the ambiguity instead of assuming it.

## The conclusion moved

Here is the honest part. We ran the same ablation three times, on progressively better gold sets:

| Config (MRR) | $N=19$, 1 judge | $N=28$, 2 judges | $N=35$, +subnational |
|---|---:|---:|---:|
| fts (keywords only) | 0.092 | 0.090 | 0.089 |
| vec (embeddings only) | 0.495 | 0.538 | 0.511 |
| rrf (hybrid) | 0.367 | 0.400 | 0.401 |
| rrf+expand | **0.755** | 0.656 | 0.605 |
| rrf+rerank | 0.657 | 0.819 | **0.792** |
| best (full pipeline) | 0.657 | **0.862** | 0.761 |

Read the `rrf+expand` and `best` rows top to bottom. The story rewrote itself:

- **$N=19$**: "expand is what matters, the production pipeline is not optimal."
- **$N=28$**: "no, the full pipeline dominates."
- **$N=35$**: "the component that carries the result is the **rerank**. `rrf+rerank` (0.792) edges out the full `best` pipeline (0.761)."

So the conclusion settled on the rerank, and on a second-order point: at $N=35$, adding query expansion on top of the rerank does not help. The `rrf+rerank` config without expand scores slightly higher than `best`. We read that gap (0.792 vs 0.761) as noise inside a wide confidence interval, not as evidence that expand hurts. The honest claim is that expand is neutral once the rerank is in place, not that it is the load-bearing piece the first run made it look like.

The viral finding from that first run (*your shipped pipeline is not optimal because of expand*) was an artifact of a small, single-annotator gold set. It died on scaling. If we had published it, we would have published noise.

## What survived every run

Two results held across $N=19$, $N=28$, and $N=35$. Those are the ones worth trusting:

1. **FTS alone is nearly useless on natural language** (MRR ~0.09). A full-question query forces every keyword to match at once, so recall collapses. FTS only earns its keep on the out-of-scope stratum, where it correctly abstains more often than any other config (the stratum is small, so read this as direction, not a precise rate).

2. **Embeddings alone beat the naive hybrid** (vec 0.51 > rrf 0.40). Fusing a strong semantic retriever with a broken keyword one *degrades* the result. Plain RRF weights every list by rank position and has no signal for how trustworthy each retriever is, so the bad FTS ranking injects junk candidates into the top of the fused list and pushes the good vector hits down. When one retriever is far weaker, unweighted fusion drags the good one down with it. This is the counter-intuitive one, and it is the most robust.

## The lesson

> Tune your baselines until it hurts. Ablate until you know which component carries the result. It's usually one, and it's usually not the one you'd guess.

We ran the experiment three times. The conclusion only stopped moving when the baseline stopped being noisy. The first number felt like a result. It was a measurement of our gold set, not of our system.

## Honest limitations

- **$N=35$ is small.** Confidence intervals are wide. These are signals, not publishable results yet.
- **No lawyer on the team.** Norm vigency, repeal, and which norm prevails were marked `needs_lawyer` and excluded from the firm set. The arbitration of divergences was done by reading text, by non-lawyers, flagged as such.
- **Three subnational queries were discarded** as not-annotatable (generic matter, no single correct norm). That discard is the 22% agreement made concrete.

Next milestone: scale the gold past 100, get legal validation on the `needs_lawyer` set, and re-run. The corpus, the [eval harness](https://github.com/crafter-research/amicus-eval), and the gold set are all open, so you can reproduce these numbers or break them.
