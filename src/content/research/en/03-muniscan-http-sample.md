---
title: "What 100 HTTP requests can and cannot tell us"
description: "We sampled one municipal domain from each of 100 municipalities. The useful result was not a new ranking, but a stricter boundary around what one observation proves."
abstract: |
  Muniscan selected 100 municipalities across five ranking bands and made one HTTP request to one classified municipal domain from each. Sixty-eight hosts returned an HTTP response and 53 returned 2xx.

  Those numbers are observations, not uptime. This note records the sampling frame, the result, and why a reachable website can still be unusable to a citizen.
date: 2026-08-21T18:00:00Z
status: result
urlSlug: muniscan-http-sample
lang: en
project: muniscan
author: railly
tags: [civic-tech, measurement, http, public-data, peru]
---

## The question behind the sample

Muniscan's census classifies the systems that municipalities link from their pages on gob.pe. A hostname can look municipal and still be unavailable. The next bounded question was therefore simple: if we try to reach a sample of those domains once, what responds?

We did not crawl every link or test a citizen journey. We selected one domain for each of 100 municipalities and made one sequential `GET` request per domain, with redirects enabled and a 15-second timeout.

## Five bands, twenty municipalities each

The sample begins only with municipalities for which Muniscan classifies at least one linked domain as a municipal system. Municipalities without such a domain are outside the sampling frame.

We ordered the eligible population by the ranking already frozen in the [2026-08-21 snapshot](https://github.com/crafter-research/muniscan/tree/main/data/2026-08-21), divided it into five equal bands, and selected 20 evenly spaced municipalities from each band. For every selected municipality, the first classified domain in lexical order became the observation target.

This makes the sample deterministic for that snapshot and spreads it across the ranking. It does not make it representative of every municipal website in Peru.

## What happened once

The [raw observations](https://github.com/crafter-research/muniscan/blob/main/data/2026-08-21/health-sample.json) record the request time, response status, final URL, elapsed time, and a short error when no HTTP response arrived.

| Observation | Domains |
|---|---:|
| Returned any HTTP response | 68 |
| Returned HTTP 2xx | 53 |
| Returned HTTP 403 | 14 |
| Returned HTTP 500 | 1 |
| No HTTP response | 32 |

Among the 32 requests without a response, the recorded failures included connection errors, timeouts, closed sockets, and TLS certificate errors. These are useful leads for another measurement. They are not diagnoses of the underlying service.

The five ranking bands also did not move monotonically with this one-shot result. Their 2xx counts were 10, 16, 7, 9, and 11 out of 20. With one domain and one moment per municipality, reading that sequence as a relationship between score and availability would exceed the method.

## Reachable does not mean usable

An HTTP response proves that one request reached a server and received a status at one recorded moment. It does not prove that a citizen could complete a procedure.

A `200` page can render an error message, depend on broken JavaScript, hide the actual service behind authentication, or fail after the first step. A `403` can be a deliberate security policy. A timeout can be transient. None of these outcomes establishes ownership, accessibility, security, legal compliance, service quality, or historical availability.

That is why the artifact is called a health sample, not an uptime report, and why its result is not added to the municipal score.

## The next measurement

A stronger availability claim would require repeated observations over time, a declared retry policy, and a method for separating DNS, TLS, HTTP, and application failures. A claim about citizen experience would require something different again: explicit task journeys, browser-level checks, accessibility criteria, and careful handling of services that require identity or private data.

For now, the honest result is narrower. Muniscan has a reproducible way to attach one stratified HTTP observation to a frozen census. Anyone can inspect the [method](https://github.com/crafter-research/muniscan/blob/main/HEALTH-SAMPLE.md), rerun it, and see exactly where the evidence stops.
