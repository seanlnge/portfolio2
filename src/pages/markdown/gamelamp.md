---
layout: ../../layouts/MarkdownLayout.astro
title: GameLamp
description: Tic-tac-toe and Connect 4 over SMS, with the live board in the message preview.
---

# GameLamp

Take a turn. Text the board.

GameLamp is tic-tac-toe and Connect 4 over SMS, in the same spirit as Game Pigeon. You play a move, send a link, and the other person sees **that board** in the iMessage preview before they tap through.

**Live:** [d3spvqcd90i9d.cloudfront.net](https://d3spvqcd90i9d.cloudfront.net/)

![GameLamp tic-tac-toe Open Graph board](/images/gamelamp.png)

## How the preview works

Every turn URL ships `og:title`, `og:description`, and a 900x900 `og:image` of the current position. Crawlers unfurl the game, not a generic logo.

- **Tic-tac-toe:** boards are pre-rendered on S3 at `/og/tictactoe/{board}.png`.
- **Connect 4:** too many legal boards to pre-render. `/og/connect4/{42 trits}.png` is painted at request time by Lambda@Edge.

## Stack

- Web app: React + TypeScript (Vite), hosted as static files on S3
- CDN: CloudFront in front of the bucket, HTTPS only
- Turn HTML: CloudFront Functions on `tictactoe/*` and `connect4/*` decode the turn blob and return OG-tagged HTML
- Connect 4 art: Lambda@Edge origin-request handler, 512 MB, 10s timeout
- Tic-tac-toe art: precomputed PNGs deployed next to the app

The whole product is the share link. There is no app install and no game server. State lives in the URL, the preview is the board, and SMS is just how the turn gets to the other person.
