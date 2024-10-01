import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
        '@stylistic/js': stylisticJs,
        react: pluginReact,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
        'no-unused-vars': 'off',
        "react-hooks/exhaustive-deps": "off",
        "react/prop-types": "off",
        "react-refresh/only-export-components": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
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
