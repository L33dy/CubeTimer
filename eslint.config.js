import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default ts.config(
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    plugins: {
      '@stylistic': stylistic,
      'svelte': svelte,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', { 'objects': 'always-multiline' }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/semi': ['error', 'never'],
      'svelte/indent': ['error', {
        'indent': 2,
        'indentScript': false,
      }],
      'svelte/spaced-html-comment': ['error', 'always'],
      'svelte/first-attribute-linebreak': 'error',
      'svelte/html-closing-bracket-new-line': 'error',
      'svelte/shorthand-attribute': ['error', {
        'prefer': 'always',
      }],
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte'],

    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/'],
  }
)
