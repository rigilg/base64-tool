# Base64 Tool

A lightweight, browser-only Base64 encoder and decoder.

Live site: https://base64.rigilgilbert.com/

## Features

- UTF-8 text, including Unicode and emoji
- Standard and URL-safe Base64
- Validation of alphabet, length, padding, canonical bits, and UTF-8
- Copy, download, clear, examples, and swapping output into input
- Responsive layout and keyboard shortcut: Ctrl/Cmd + Enter
- No dependencies, tracking, browser storage, or conversion server

Base64 is encoding, not encryption. This version handles text rather than binary files and limits each input to two million characters.

## Run locally

Open `index.html` in a browser, or serve this directory:

```sh
python -m http.server 8765
```

Then visit http://localhost:8765. Clipboard support may depend on browser permissions and secure-context rules.

## Files

- `index.html`: page structure
- `style.css`: responsive styling
- `codec.js`: encoding and strict decoding
- `app.js`: interface behavior
- `_headers`: Cloudflare Pages security headers

## Deployment

Hosted on Cloudflare Pages as `rigil-base64` using Direct Upload. Upload the five site files above from the Cloudflare Pages dashboard when publishing changes. No build command is needed.

Custom domain: `base64.rigilgilbert.com`. Porkbun DNS has a CNAME with host `base64` pointing to `rigil-base64.pages.dev`.

Checking code into GitHub does not automatically redeploy this Direct Upload project.
