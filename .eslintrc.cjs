/** @type {import("eslint").Linter.Config} */
const config = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": true
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked"
  ],
  "rules": {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": {
          "attributes": false
        }
      }
    ],

    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc"
        }
      }
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["../*", "../**/*"],
            message:
              'Use absolute imports with the "~" alias instead of relative imports.',
          },
        ],
      },
    ],
    "react/jsx-first-prop-new-line": [
      "error",
      "multiline-multiprop",
    ],
    "react/jsx-max-props-per-line": [
      "error",
      {
        maximum: 1,
      },
    ],
    "react/jsx-indent-props": [
      "error",
      2,
    ],
    "react/jsx-newline": [
      "error",
      {
        prevent: false,
      },
    ],
    "react/jsx-sort-props": [
      1,
      {
        multiline: "first"
      }
    ],
    "react/jsx-closing-bracket-location": [
      1, "after-props"
    ],
    "react/jsx-curly-brace-presence": [
      "error", "always"
    ],
    "react/jsx-boolean-value": [
      "error", "always"
    ],
  }
}
module.exports = config;
