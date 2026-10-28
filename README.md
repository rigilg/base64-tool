# Base64 Tool

A lightweight Base64 encoder and decoder that runs entirely in your browser.

**[Use the live tool](https://base64.rigilgilbert.com/)**

## Features

- Encode UTF-8 text to Base64 and decode Base64 back to text.
- Support Unicode, accents, non-Latin scripts, and emoji.
- Choose standard Base64 or the URL-safe alphabet.
- Copy or download results as a text file.
- Swap the result into the input to reverse a conversion.
- Try an example, clear the input, or convert with **Ctrl/Cmd + Enter**.
- Responsive layout with labeled controls and conversion status messages.
- No external libraries, analytics, or browser storage.

## Usage

1. Choose **Encode** or **Decode**.
2. Paste your input.
3. Enable **URL-safe Base64** if your input or desired output uses that format.
4. Select the conversion button, then copy or download the result.

URL-safe encoding uses `-` and `_` instead of `+` and `/` and omits trailing padding. Decoding accepts whitespace and valid unpadded input, and checks the alphabet, length, padding, canonical encoding, and UTF-8 validity.

Editing the input or changing the format clears the previous result so it cannot be mistaken for a new conversion.

## Privacy and limitations

Conversions happen locally. The tool does not upload input or output, save conversion history, or track visitors. Copying places the result on your clipboard; downloading saves a text file on your device.

- **Base64 is encoding, not encryption.** It does not protect passwords or other secrets.
- This tool handles UTF-8 text, not arbitrary binary files. Invalid UTF-8 data produces an error.
- Input is limited to two million JavaScript string units per conversion.
- Clipboard access depends on browser permissions and secure-context support.

## Run locally

No installation or build step is needed. Open `index.html` in a browser, or serve the project folder:

```sh
python -m http.server 8765
```

Then visit [localhost:8765](http://localhost:8765/).

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and controls |
| `style.css` | Responsive styling |
| `codec.js` | UTF-8 encoding and Base64 validation |
| `app.js` | Interface interactions |
| `_headers` | Security headers for compatible hosting |
| `tests/codec.test.cjs` | Conversion and validation checks |
| `.github/workflows/deploy.yml` | CI checks and deployment workflow |

## Development checks

Use Node.js 22 or later:

```sh
node --check app.js
node --check codec.js
node --test tests/codec.test.cjs
```

The tests cover known vectors, Unicode round trips, whitespace, unpadded input, URL-safe mode, and invalid input.

## Contributing and releases

1. Create a branch or fork and make your changes.
2. Run the development checks.
3. Open a pull request targeting `main`.

Pull requests run checks without deploying. The maintainer reviews changes and merges them in GitHub once required checks pass. Direct pushes to `main` are blocked by branch protection.

Merging into `main` triggers the production deployment automatically after CI passes. A manual workflow run on `main` can redeploy the current version. Deployment progress is available in the repository's **Actions** tab.

Hosting credentials are managed outside the source code. Do not include credentials, tokens, or personal data in commits, issues, or pull requests.
