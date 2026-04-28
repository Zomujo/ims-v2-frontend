import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  {
    ignores: [".next/**", "node_modules/**", "public/**"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      ...pluginReact.configs.flat.recommended.plugins,
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": pluginReactHooks,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-unused-vars": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "prettier/prettier": [
        "error",
        { endOfLine: "auto", trailingComma: "all" },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
