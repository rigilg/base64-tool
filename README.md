# Base64 Tool

A lightweight, browser-only Base64 encoder and decoder.

Live site: https://base64.rigilgilbert.com/

## Features

- UTF-8 text, including Unicode and emoji
- Standard and URL-safe Base64
- Strict input validation
- Copy, download, clear, examples, and swapping output into input
- Responsive layout; Ctrl/Cmd + Enter to convert
- No dependencies, analytics, browser storage, or conversion server

Base64 is encoding, not encryption. This version handles text, not binary files, and limits each input to two million characters.

## Run locally

Open index.html or run:

```sh
python -m http.server 8765
```

Visit http://localhost:8765. Clipboard support depends on browser secure-context rules and permissions.

## Checks

Requires Node.js 22 or later.

```sh
node --check app.js
node --check codec.js
node --test tests/codec.test.cjs
```

## Automatic deployment

The GitHub Actions workflow in .github/workflows/deploy.yml checks JavaScript syntax and Base64 behavior on pull requests and pushes to main. After checks pass on main, it uploads only index.html, style.css, app.js, codec.js, and _headers to the existing Cloudflare Pages project rigil-base64.

Merging into main or pushing directly to main starts production deployment. Deployment takes time to run; it is not instantaneous. Pull requests run checks without deploying. The workflow can also be run manually from the Actions tab on main.

Required repository Actions secret: CLOUDFLARE_API_TOKEN, granting Cloudflare Pages Edit on the hosting account. The workflow contains the non-secret account ID. Never commit token values to source.

Credential setup and an initial successful deployment must be completed before treating automatic deployment as operational.

The custom domain base64.rigilgilbert.com uses a Porkbun CNAME pointing to rigil-base64.pages.dev.
