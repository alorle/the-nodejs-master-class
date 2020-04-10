module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2019,
    sourceType: "module",
  },
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:promise/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["no-null"],
  rules: {
    // imports
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "parent",
          "sibling",
          "internal",
          "index",
          "unknown",
        ],
        "newlines-between": "always",
        "alphabetize": {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],

    // exports
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",

    // forbid null
    "no-null/no-null": "error",

    // oop
    "class-methods-use-this": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/member-ordering": "error",
  },
  overrides: [
    {
      files: ["*.spec.*"],
      rules: {
        "@typescript-eslint/unbound-method": "off",
      },
    },
  ],
};
