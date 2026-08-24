---
layout: ../../layouts/MarkdownLayout.astro
title: Bitflip
description: Space weather forecasting for proactive bit-flip mitigation. First place and $1500 at Groundswell Startups.
---

# Bitflip

Won first place and $1500 at the Groundswell Startups Space Coast Initiative hackathon. Built with Deep Akbari, Nicolas Diaz, Ethan Zylman, and Evin Bento.

Space weather and radiation forecasting for commercial satellites, including telecom and in-orbit data centers, where bit-flips are expensive to handle after the fact. The module reads current radiation and chip wear, pulls live solar wind and proton flux, then forecasts expected bit-flips-per-hour so operators can protect at-risk chips before errors hit.

## Stack

- Data: GOES-18 integral proton flux, ACE solar wind speed and magnetic field
- Short-term forecast (1-minute intervals, up to 2 hours): time-series CNN and XGBoost
- Long-term forecast (6-hour and 12-hour): LightGBM with Databricks ML and a Databricks endpoint
- Dashboard: Next.js, React, and Tailwind
- Hardware: ESP-32 HTTP server with interval polling, Geiger counter (M4011), and EPROM for chip wear testing

## Outcome

The product was aimed at reducing the cost of reactive error mitigation in orbit. The takeaway from mentors at the event was to start from the market, then build, rather than finding something cool and working backwards to a customer.
