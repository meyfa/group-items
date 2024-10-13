import eslintConfig from '@meyfa/eslint-config'
import eslintConfigJsdoc from '@meyfa/eslint-config/jsdoc'

export default [
  ...eslintConfig,
  {
    ignores: [
      'dist',
      '.idea',
      '.vscode',
      'coverage'
    ]
  },
  {
    ...eslintConfigJsdoc,
    files: ['src/**/*.ts']
  }
]
