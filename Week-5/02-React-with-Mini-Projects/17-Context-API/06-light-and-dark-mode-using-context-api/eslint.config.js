import js from '@eslint/js'
import globals from '../../../../Week-06/03-frontend-authentication/03-Frontend-Auth/node_modules/globals'
import reactHooks from '../../../../Week-04/26-interview-practice-sets/01-component-exercises/03-tweet-post/node_modules/eslint-plugin-react-hooks'
import reactRefresh from '../../../../Week-06/03-frontend-authentication/03-Frontend-Auth/node_modules/eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
