import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import eslintImport from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";

export default tseslint.config(
  { ignores: ["dist", "cypress.config.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      import: eslintImport,
      "no-relative-import-paths": noRelativeImportPaths,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
          "newlines-between": "never",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "no-relative-import-paths/no-relative-import-paths": ["warn", { rootDir: "src", prefix: "" }],
    },
  },
);
