import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";

import { version, dependencies, license } from "./package.json";

export const polyfills = {
  Promise: "promise-polyfill",
  Set: "core-js-pure/features/set",
  "Object.assign": "core-js-pure/features/object/assign",
};

const input = "node_modules/@ideal-postcodes/postcode-lookup/esm/index.js";

const banner = `/**
 * @license
 * Ideal Postcodes <https://ideal-postcodes.co.uk>
 * Copyright IDDQD Limited
 * Postcode Lookup Bundled ${version}
 * Built on Postcode Lookup ${dependencies["@ideal-postcodes/postcode-lookup"]}
 * ${license} Licence
 */`;

// Configure terser to ignore build info banner
const terserConfig = {
  output: {
    comments: (_, { value, type }) => {
      if (type === "comment2") return /@license/i.test(value);
    },
  },
};

/**
 * Whitelist files processed by Babel
 */
const include = [
  "node_modules/@ideal-postcodes/core-interface/esm/**",
  "node_modules/@ideal-postcodes/core-axios/esm/**",
  "node_modules/@ideal-postcodes/postcode-lookup/esm/**",
  "node_modules/@ideal-postcodes/jsutil/esm/**",
  "node_modules/capitalise-post-town/dist/**",
  "node_modules/core-js-pure/**/*",
];

const context = "window";

const sourceMap = false;

export default [
  /**
   * ESM build targeting minimum browser versions that allow [ES6 Modules](https://caniuse.com/#feat=es6-module)
   */
  {
    input,
    context,
    output: {
      file: "./dist/postcode-lookup.esm.js",
      banner,
      format: "esm",
      exports: "named",
    },
    plugins: [
      resolve({
        preferBuiltins: true,
        dedupe: ["@ideal-postcodes/jsutil"],
        mainFields: ["browser", "module", "main"],
        browser: true,
      }),
      commonjs(),
      babel({
        babelrc: false,
        include,
        sourceMap,
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                edge: "16",
                firefox: "60",
                chrome: "61",
                safari: "11",
              },
            },
          ],
        ],
      }),
      terser(terserConfig),
    ],
  },
  /**
   * UMD build that targets ie11 as base
   */
  {
    input,
    context,
    output: {
      file: "./dist/postcode-lookup.js",
      banner,
      format: "umd",
      extend: true,
      name: "IdealPostcodes",
      exports: "named",
    },
    plugins: [
      resolve({
        preferBuiltins: true,
        dedupe: ["@ideal-postcodes/jsutil"],
        mainFields: ["browser", "module", "main"],
        browser: true,
      }),
      commonjs(),
      inject(polyfills),
      babel({
        babelrc: false,
        include,
        sourceMap,
        presets: [["@babel/preset-env", { targets: { ie: "11" } }]],
      }),
      terser(terserConfig),
    ],
  },
];
