import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';

export default [
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: [
      'babel.config.js',
      'metro.config.ts',
      'react-native.config.js',
      '**/node_modules/**',
      '**/build/**',
      '**/android/**',
      '**/ios/**',
      '**/.expo/**',
      '**/dist/**',
    ],
  },

  // Base configuration for all files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser-like globals for React Native
        console: 'readonly',
        Promise: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        XMLHttpRequest: 'readonly',
        __DEV__: 'readonly',
        React: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: fixupPluginRules(reactPlugin),
      'react-hooks': fixupPluginRules(reactHooksPlugin),
      'typescript-sort-keys': typescriptSortKeys,
      'sort-keys-fix': sortKeysFix,
      'simple-import-sort': simpleImportSort,
      import: fixupPluginRules(importPlugin),
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      ...typescriptEslint.configs['eslint-recommended'].rules,

      'import/order': 1,
      'import/no-named-as-default': 0,
      'no-console': 2,
      'react-hooks/rules-of-hooks': 2,
      'react-hooks/exhaustive-deps': 2,
      'react/prop-types': 0,
      'react/no-unstable-nested-components': 0,
      'react-native/no-inline-styles': 0,
      '@typescript-eslint/no-shadow': 0,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/interface-name-prefix': 0,
      '@typescript-eslint/no-empty-function': 0,
      'typescript-sort-keys/interface': 1,
      'typescript-sort-keys/string-enum': 1,
      'react/jsx-sort-props': 1,
      'sort-keys-fix/sort-keys-fix': 1,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/camelcase': 0,
      'react/display-name': 0,
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      strict: ['error', 'never'],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages. `react` related packages come first.
            ['^react', '^@?\\w'],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            ['^'],
            // Relative imports.
            // Anything that starts with a dot.
            ['^\\.'],
            // Side effect imports.
            ['^\\u0000'],
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'styled-components',
              message: 'Please use styled-components/native instead.',
            },
          ],
        },
      ],
    },
  },

  // TypeScript-specific configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },

  // Node.js configuration files
  {
    files: ['*.config.{js,ts}', 'app.config.ts', 'metro.config.js', 'babel.config.js', 'src/_assets/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },
];
