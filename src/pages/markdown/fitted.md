---
layout: ../../layouts/MarkdownLayout.astro
title: Fitted
description: Wardrobe-to-outfit web app that won HackUSF 2025 AI track.
---

## Overview

Fitted is a wardrobe-to-outfit web app that won the AI track at HackUSF 2025. It helps people generate outfits based on what they already own, reducing decision fatigue and making it easy to dress for specific occasions.

![Fitted product preview](/images/fitted.png)

## Links

- [Live App](https://fitted-zeta.vercel.app)
- [GitHub Repository](https://github.com/outfit-create-projecty/project-y)

## Problem

Most wardrobe apps require tedious manual input and still fail to offer useful, personalized recommendations. We wanted a faster way to capture a closet and generate outfits that feel tailored to real-world needs.

## Solution

- Capture wardrobe items with photos and metadata.
- Prompt by occasion or style and return a full outfit (top, bottom, shoes, accessories).
- Track availability, save outfits, and favorite the best results.

## How it works

1. GPT-4o mini generates a title, description, and stylistic tags for each uploaded item.
2. Tags are embedded with Ada-002 and stored as vectors alongside the wardrobe item.
3. When a user requests an outfit, the prompt is embedded into the same latent space.
4. Cosine similarity ranks wardrobe items to assemble the best matching look.
5. The final outfit is saved with a generated title and description.

## Challenges

- Prompt quality varied across styles, so we iterated on structured tag generation.
- Hackathon timing meant we had to prioritize a clean, low-friction UI.

## Outcome

Fitted shipped end-to-end in a hackathon weekend, delivered a polished UI, and won the AI track at HackUSF 2025.

## What's next

- Native mobile capture flow for faster wardrobe ingestion.
- Closet improvement recommendations with shopping links.
