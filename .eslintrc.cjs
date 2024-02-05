module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    react: { version: 'detect' },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:cypress/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json',
      './tsconfig.node.json',
      './cypress/tsconfig.json',
    ],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    semi: ['error', 'never'],
    'no-console': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        types: ['function'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        types: ['boolean', 'number', 'string', 'array'],
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    'no-nested-ternary': 'error',
  },
}
