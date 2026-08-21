---
title: "How a one-shot census became a recurring public instrument"
description: "Muniscan mapped the public digital surface of Peru's municipalities. Its most useful result came when the second scan failed."
abstract: |
  Muniscan mapped the public links declared by Peru's municipalities. The first census worked. The next two did not, and that failure exposed a hidden assumption in the pipeline: discovery was being treated as memory.

  This is how a static dataset became a recurring, inspectable instrument without turning a heuristic score into a claim about institutional quality.
date: 2026-08-21
status: result
urlSlug: muniscan
lang: en
project: muniscan
author: railly
tags: [civic-tech, public-data, data-pipelines, peru]
---

## A map of what municipalities publish

[Muniscan](https://muniscan.crafter.ing) starts with a bounded question: what public digital systems can we observe from the links Peruvian municipalities declare on gob.pe?

The first run collected and classified those links for 1,794 municipalities. It separated municipal domains from central government platforms, published the raw snapshot, and documented the scoring method. The result was useful, but still static. One successful census says nothing about whether the instrument can run again.

## The useful failure

The next scans returned much smaller municipal sets. Publishing either result would have made hundreds of municipalities appear to vanish overnight.

They had not vanished. The upstream directory had simply produced an incomplete discovery set.

Muniscan's completeness guard blocked both releases. That was the right failure. More importantly, it revealed the wrong mental model: the current directory response was being treated as the whole known universe.

Discovery is an observation. It is not memory.

## Giving the pipeline memory

The repair made recurrence stateful. Each scan now unions current discovery with the latest published census, then fetches every municipality again. A restored municipality can return fresh data, or an explicit HTTP error, but it cannot silently disappear because one discovery run was weak.

The next complete run scored 1,871 municipalities:

| Snapshot | Municipalities | Change |
|---|---:|---:|
| 2026-08-08 | 1,794 | first census |
| 2026-08-21 | 1,871 | +78 added, −1 explicit removal |

The second snapshot passed the same completeness gate without a force flag. That demonstrates one successful recurrence. It does not yet demonstrate stable monthly operation.

## What the score means

The score summarizes visible links and hostname classifications in one frozen snapshot. It helps inspect the shape of a municipality's declared digital surface.

It does not establish ownership, uptime, accessibility, security, legal compliance, service quality, or institutional performance. We also published a stratified 100-domain HTTP sample, but that remains a point-in-time observation, not an availability monitor.

That boundary matters more than the leaderboard. A public measurement is only useful when readers can tell what would falsify it and what it cannot support.

## The public instrument

The [live atlas](https://muniscan.crafter.ing) now has its own domain and visual identity. It is where anyone can search the census, inspect the latest snapshot, download the data, and follow the method.

The source remains open:

- [latest frozen snapshot](https://github.com/crafter-research/muniscan/tree/main/data/2026-08-21)
- [method](https://github.com/crafter-research/muniscan/blob/main/METHOD.md)
- [limitations](https://github.com/crafter-research/muniscan/blob/main/LIMITATIONS.md)
- [pipeline and data](https://github.com/crafter-research/muniscan)

The next test is intentionally boring: keep running it. Enough complete cycles would let us distinguish a recurring instrument from one successful rerun. Until then, the honest result is smaller and more useful: the census can recur, its failures are visible, and incomplete data cannot quietly rewrite the map.
