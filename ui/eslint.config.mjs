import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import stylisticJs from '@stylistic/eslint-plugin-js';
import reactCompiler from 'eslint-plugin-react-compiler';
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      'public',
    ]
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended
    ],
    files: ['**/*.{ts,tsx,jsx,js}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic/js': stylisticJs,
      react: pluginReact,
      'react-compiler': reactCompiler,
      'unused-imports': unusedImports
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      //  'react-compiler/react-compiler': 'error', Will be turned on after fixing code issues
      'no-unused-vars': 'off',
      "react-hooks/exhaustive-deps": "off",
      "react/prop-types": "off",
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-this-alias": "off",
      "no-empty": "warn",
      "@typescript-eslint/no-unused-expressions": "off",
      "no-useless-escape": "off",
      "no-unused-vars": "off",
      "prefer-const": "warn",
      "no-self-assign": "off",
      '@typescript-eslint/no-unused-vars': "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_",
        },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'no-promise-executor-return': 'off',
      "@typescript-eslint/ban-ts-comment": "off"
    },
  },
)
