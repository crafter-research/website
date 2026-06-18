---
title: "What the repo graph says the lab became"
description: "A GitHub pass over Crafter Research shows the lab has shifted from isolated civic tools into corpora, agents, evaluation harnesses, and source-visible interfaces."
date: 2026-06-18
status: milestone
urlSlug: github-repo-graph
lang: en
project: crafter-research
tags: [github, repos, strategy, corpora, agents, evaluation]
---

The website used to say a simple thing: every paper should have a working prototype. That is still true, but it is no longer specific enough.

A GitHub pass over the organization on June 18, 2026 shows a clearer shape: **Crafter Research is becoming a lab for evidence systems**. The public surface is no longer just apps. It is corpora, engines, SDKs, benchmarks, graph artifacts, and research logs that show how conclusions moved.

## The repo graph

The GitHub organization has 27 repositories: 23 public and 4 private. The most active work this week clusters into four arcs.

| Arc | Repos | What changed |
| --- | --- | --- |
| Legal research stack | [legalize-pe](https://github.com/crafter-research/legalize-pe), [legalize-pe-engine](https://github.com/crafter-research/legalize-pe-engine), [amicus](https://amicus.crafter.ing), [amicus-sdk](https://github.com/crafter-research/amicus-sdk) | The work now spans corpus, engine, assistant, SDK, docs, and retrieval evaluation. |
| Citizen process graph | [tramites-pe](https://github.com/crafter-research/tramites-pe), [tramites-pe-engine](https://github.com/crafter-research/tramites-pe-engine) | The scraper and engine split corpus truth from derived graph research. |
| Evaluation culture | [latambench](https://github.com/crafter-research/latambench), [website](https://github.com/crafter-research/website) | Benchmarks and logs now record when the first conclusion was wrong. |
| Civic interfaces | [peru-financia](https://github.com/crafter-research/peru-financia), [political-graph](https://github.com/crafter-research/political-graph), [sunat-cli](https://github.com/crafter-research/sunat-cli), [andenar](https://andenar.crafter.ing) | The older civic-tech layer remains useful, but it is now part of a broader research infrastructure story. |

## What moved this week

The latest commit pattern matters more than the repo count.

- **amicus** scaled the retrieval gold set to 35 firm pairs using dual blind annotation. That turned a flashy early result into a more cautious finding: rerank carried the result after the small-set story collapsed.
- **tramites-pe** harvested the gob.pe citizen-service taxonomy, process graph, and canonical entity directory.
- **tramites-pe-engine** turned the corpus into a web explorer and process map, including a goal library derived from public-service graphs.
- **LatamBench** tightened evaluation accounting: valid counts, hallucination metrics, abstention metrics, and judge calibration artifacts.

This is the actual strategy: make public data into durable substrates, put agents on top, and then measure the parts that can fail.

## The important shift

The old website grouped projects as active apps and tools. That made sense in March. It is now misleading.

The unit of work is no longer "project". The unit is **inspectable evidence**:

- corpus: legal norms, gob.pe services, political finance, election data
- engine: retrieval, graph construction, pathfinding, scoring
- evaluation: gold sets, ablations, judge agreement, precision gates
- interface: assistant, explorer, CLI, SDK, website
- log: what we believed, what broke, what survived

That is why the website needed to change. A visitor should understand the lab by its evidence chain, not by a portfolio grid.

## What stays honest

Some claims are still early:

- The amicus gold set is 35 firm pairs, not a legal-grade benchmark.
- The tramites graph has useful signals, but the engine found that real process dependencies often live outside a single public page.
- LatamBench is an evaluation platform, but benchmark methodology is still moving.
- Some active systems, like amicus and Andenar, are partly private while their public interfaces or SDKs are exposed.

The research standard is not to avoid weak spots. It is to publish the weak spot next to the artifact.

## Website update

The home page now says what the repos say:

> Research systems that can be inspected.

That is the current operating frame. Every new public claim should point to a source, run, repo, live interface, or research log. If it cannot, it is not ready for the homepage.
