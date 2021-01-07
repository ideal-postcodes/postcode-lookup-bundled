import "core-js";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import { version, dependencies, license } from "./package.json";

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
];

const context = "window";

const sourceMap = false;

export default [
  /**
   * ESM build targeting minimum browser versions that allow [ES6 Modules](https://caniuse.com/#feat=es6-module)
   */
  {
    input,
    output: {
      file: "./dist/postcode-lookup.esm.js",
      banner,
      format: "esm",
      exports: "named",
    },
    context,
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel({
        babelrc: false,
        ignore: [/core-js/],
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
              modules: false,
              spec: true,
              useBuiltIns: "usage",
              corejs: 3,
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
    output: {
      file: "./dist/postcode-lookup.js",
      banner,
      format: "umd",
      extend: true,
      name: "IdealPostcodes",
      exports: "named",
    },
    context,
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel({
        babelrc: false,
        ignore: [/core-js/],
        include,
        sourceMap,
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                ie: "11",
              },
              modules: false,
              spec: true,
              useBuiltIns: "usage",
              corejs: 3,
              forceAllTransforms: true,
            },
          ],
        ],
      }),
      terser(terserConfig),
    ],
  },
];
