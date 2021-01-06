<h1 align="center">
  <img src="https://img.ideal-postcodes.co.uk/Postcode%20Lookup%20Logo@3x.png" alt="Ideal Postcodes Postcode Lookup Bundle">
</h1>

> JavaScript browser bundles for the Postcode Lookup library

![CI](https://github.com/ideal-postcodes/postcode-lookup-bundled/workflows/CI/badge.svg)
![Cross Browser Testing](https://github.com/ideal-postcodes/postcode-lookup-bundled/workflows/Cross%20Browser%20Testing/badge.svg?branch=saucelabs)

[![npm version](https://badge.fury.io/js/%40ideal-postcodes%2Fpostcode-lookup-bundled.svg)](https://badge.fury.io/js/%40ideal-postcodes%2Fpostcode-lookup-bundled)
[![jscdn](https://badgen.net/jsdelivr/v/npm/@ideal-postcodes/postcode-lookup-bundled)](https://cdn.jsdelivr.net/npm/@ideal-postcodes/postcode-lookup-bundled/dist/)
![Release](https://github.com/ideal-postcodes/postcode-lookup-bundled/workflows/Release/badge.svg)

This package exports polyfilled, minified copies of `postcode-lookup` in various formats available on npm and various JavaScript cdns. It can be readily [dropped in](#usage) on a page without transpilation of `postcode-lookup`.

If you intend to incorporate the browser client in your own bundle, please use [`postcode-lookup`](https://github.com/ideal-postcodes/postcode-lookup) as your `package.json` dependency.

Builds tested against [a suite of modern and legacy, mobile and desktop browsers](https://github.com/ideal-postcodes/supported-browsers).

## Download

Latest and pinned versions of each bundle can be downloaded from [jsdelivr.com](https://www.jsdelivr.com).

We recommend serving your own versioned copy. If served from a JavaScript CDN like jsdelivr.com you must attach a version number.

### Download Latest Bundle

- [postcode-lookup.umd.min.js](https://cdn.jsdelivr.net/npm/@ideal-postcodes/postcode-lookup-bundled/dist/postcode-lookup.umd.min.js)
- [postcode-lookup.umd.ie11.min.js](https://cdn.jsdelivr.net/npm/@ideal-postcodes/postcode-lookup-bundled/dist/postcode-lookup.umd.ie11.min.js)
- [postcode-lookup.esm.min.js](https://cdn.jsdelivr.net/npm/@ideal-postcodes/postcode-lookup-bundled/dist/postcode-lookup.esm.min.js)
- [postcode-lookup.esm.modern.min.js](https://cdn.jsdelivr.net/npm/@ideal-postcodes/postcode-lookup-bundled/dist/postcode-lookup.esm.modern.min.js)

Do not link the above URLs in your scripts. Instead use pinned versions described below.

### ⚠️ Pinned Versions

It is important you pin your bundle version in production. Pulling directly from latest **will** cause your integration to fail at some point in the future.

Please follow the instructions on [jsdelivr.com/postcode-lookup-bundled](https://www.jsdelivr.com/package/npm/@ideal-postcodes/postcode-lookup-bundled) to pin a specific version in production.

Example `<script>` pinned to version `1.1.0`

```
<script src="https://cdn.jsdelivr.net/npm/@ideal-postcodes/postcode-lookup-bundled@1.1.0/dist/postcode-lookup.umd.min.js"></script>
```

## Links

- [Bundles Overview](#bundles-overview)
- [Usage](#usage)
- [Documentation](https://postcode-lookup.ideal-postcodes.dev/)
- [npm](https://www.npmjs.com/package/@ideal-postcodes/postcode-lookup-bundled)
- [GitHub Repository](https://github.com/ideal-postcodes/postcode-lookup-bundled)

## Other JavaScript Clients

- [Postcode Lookup Library](https://github.com/ideal-postcodes/postcode-lookup)

## Documentation

### Bundles Overview

`postcode-lookup-bundled` ships 4 javascript bundles.

#### postcode-lookup.umd.min.js

- **UMD compatible**
- Transpiles postcode-lookup to target browsers with more than 0.25% marketshare according to [caniuse.com](https://caniuse.com/usage-table). This is a moving target and obselete browsers will lose support over time as new builds are created.
- Default export of the npm module

#### postcode-lookup.umd.ie11.min.js

- **UMD compatible**
- Transpiles postcode-lookup to target IE11 as minimum browser version. This will create a fixed target bundle over time. The tradeoff to this is larger script payload.

#### postcode-lookup.esm.min.js

- **ES Module compatible**
- Targets browsers with [ES Module support](https://caniuse.com/#search=module)
- Default ES Module export

#### postcode-lookup.esm.latest.min.js

- **ES Module compatible**
- No legacy browser transpilation or polyfills
- Smallest package size

### Usage

#### UMD

```html
<script src="https://cdn.jsdelivr.net/npm/@ideal-postcodes/postcode-lookup-bundled@1.1.0/dist/postcode-lookup.umd.min.js"></script>

<script>
  PostcodeLookup.setup({
    apiKey: "iddqd",
    context: "#postcode_lookup_field",
    outputFields: {
      line_1: "#line_1",
      line_2: "#line_2",
      line_3: "#line_3",
      post_town: "#post_town",
      postcode: "#postcode",
    },
  });
</script>
```

#### ES Module

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@ideal-postcodes/postcode-lookup-bundled@1.1.0/dist/postcode-lookup.esm.min.js"></script>

<script type="module">
  import { PostcodeLookup } from "https://cdn.jsdelivr.net/npm/@ideal-postcodes/postcode-lookup-bundled@1.1.0/dist/postcode-lookup.esm.min.js";
  PostcodeLookup.setup({
    apiKey: "iddqd",
    context: "#postcode_lookup_field",
    outputFields: {
      line_1: "#line_1",
      line_2: "#line_2",
      line_3: "#line_3",
      post_town: "#post_town",
      postcode: "#postcode",
    },
  });
</script>
```

### Client Documentation

This package is a transpiled copy of [`ideal-postcodes/postcode-lookup`](https://github.com/ideal-postcodes/postcode-lookup).

For a complete list of client methods, including low level resource methods, please see the [postcode-lookup documentation](https://postcode-lookup.ideal-postcodes.dev/#documentation)

## Run Examples

Build, and serve example pages locally:

```bash
npm run build && \ # Build JS bundles
npm start          # Start http server
```

For UMD demo visit [http://localhost:8081/example/umd.html](http://localhost:8081/example/umd.html)

For ES module demo visit [http://localhost:8081/example/esm.html](http://localhost:8081/example/esm.html)
