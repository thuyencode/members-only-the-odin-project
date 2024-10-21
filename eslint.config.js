// @ts-check

import js from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginRouter from '@tanstack/eslint-plugin-router'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import ts_eslint from 'typescript-eslint'

export default ts_eslint.config({
  extends: [
    js.configs.recommended,
    ...ts_eslint.configs.recommendedTypeChecked,
    reactPlugin.configs['jsx-runtime'].flat,
    reactPlugin.configs['recommended'].flat,
    ...pluginQuery.configs['flat/recommended'],
    ...pluginRouter.configs['flat/recommended'],
    eslintConfigPrettier
  ],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist', 'node_modules'],
  plugins: {
    'react-refresh': reactRefresh
  },
  languageOptions: {
    ecmaVersion: 2023,
    globals: globals.browser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname
    }
  },
  rules: {
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error'
  }
})
