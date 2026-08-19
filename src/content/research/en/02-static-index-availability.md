---
title: "The government API failed 38% of our requests"
description: "We benchmarked three Peruvian government data sources against static binary indexes. The speed difference was expected. The availability difference was the finding."
abstract: |
  We benchmarked three Peruvian government data sources against static binary indexes served as immutable files. The speed difference was expected: microseconds against tens of milliseconds.

  The availability difference was not. One official endpoint failed 380 of 1,000 requests while the static copy failed none. For anything making several lookups in a row, that is the number that decides whether the work finishes.
date: 2026-08-18
status: result
urlSlug: static-index-availability
lang: en
project: static-index-poc
author: railly
tags: [data-infrastructure, benchmarks, government-data, agents, availability]
---

## The problem with adapters

Crafter Research maintains command-line adapters for Peruvian government data: SUNAT for tax records, BCRP for macroeconomic series, JNE for electoral candidates, and several more. They share a weakness that took a while to name. Each one is a client for a source we do not control, so it inherits every failure of that source and adds none of its own resilience. When the upstream is slow the adapter is slow. When the upstream refuses, the adapter refuses.

The alternative is to stop reading the source at query time. Fetch it once on a schedule, compile it into an immutable artifact, and serve that artifact as static files. Lookups then hit a file rather than a government server.

We built three proofs of concept to find out whether that trade is worth making, and what it costs.

## What we built

All three implement the same read-only format: a binary shard of records, a fixed-width index sorted by key, and an overflow file for keys that legitimately map to more than one record. A lookup binary-searches the small index in memory, then reads only the bytes the index points at. Over HTTP that is a range request; on disk it is a positional read. Dataset size barely affects lookup cost because the large file is never read whole.

The full layout is documented in [FORMAT.md](https://github.com/crafter-research/static-index-poc/blob/main/FORMAT.md), and the pipelines and benchmarks are in [static-index-poc](https://github.com/crafter-research/static-index-poc).

One design decision generalizes beyond this work. The index key is a 32-bit integer derived from the record key, and how you derive it decides whether the index is balanced. Peruvian national IDs are eight digits and parse directly. BCRP series codes are alphanumeric, so they hash. But a prefix of the key is almost always the wrong choice: nearly every Peruvian tax ID begins with `10` or `20`, so splitting on the prefix produces two enormous buckets instead of many small ones. Derive the key against the real distribution, not the one that looks natural.

## The measurements

One thousand lookups per method, April 2026.

| Dataset | Records | Warm p50 | Official source p50 | Source errors |
| --- | ---: | ---: | ---: | ---: |
| JNE candidates 2026 | 9,065 | 0.05 ms | 90.32 ms | 0 / 1000 |
| BCRP macro series | 16,945 | 0.07 ms | 28.98 ms | **380 / 1000** |

The latency columns are the expected result and the least interesting one. Nobody needed a benchmark to learn that reading a local file beats a round trip to a government server.

The error column is the finding. The BCRP endpoint returned a usable answer for 620 of 1,000 requests. Not slowly: not at all. The static copy answered every one.

That distinction matters more than it first appears. A 29 millisecond median looks tolerable, and if the work is one lookup it is. But a 38% per-request failure rate does not stay at 38% across a sequence. Ten dependent lookups at that rate complete about one time in a hundred. The system does not degrade, it stops finishing.

## What we could not build

The third proof of concept is a negative result worth publishing.

SUNEDU maintains the national registry of university degrees. Its public lookup sits behind a Cloudflare Turnstile token, a bearer token, and an image captcha, and the open-data portal publishes only aggregate education datasets, not the registry itself. We probed each path and recovered nothing usable in bulk. The format works on a synthetic fixture; there is no dataset to put in it.

The lesson is about scope. A read primitive makes an accessible source faster and more reliable. It does nothing about a source that will not be read. Availability engineering cannot substitute for access.

## What is still weak

**No CDN number.** Every warm figure above is a local disk read. The entire argument for this primitive rests on serving artifacts from a CDN, and a cold range request against one is not measured. Until it is, no claim about CDN-served latency belongs here, including ours.

**Old benchmarks.** These runs are from April 2026 and describe the sources as they behaved then. The error columns in particular should be expected to move.

**No dataset published.** The JNE index keys on the national ID numbers of electoral candidates. Those records are public under Peruvian electoral law, but a downloadable index queryable by national ID is a different artifact from a published dataset, and it deserves its own legal analysis rather than inheriting the one we wrote for [muniscan](https://github.com/crafter-research/muniscan), whose subjects are municipalities rather than people. The repository ships pipelines and benchmarks; anyone can rebuild the index by running the scrape.

**Nothing runs in production.** These are proofs of concept. Whether the pattern survives a nightly build, source drift, and an artifact nobody is watching is exactly what a proof of concept cannot tell you.

## What changed

We started out measuring speed and expected the answer to be about speed. It was about whether the answer arrives at all. Reliability arguments for caching usually get made in the abstract; this one has a number attached, and the number is larger than the latency argument it replaced.
