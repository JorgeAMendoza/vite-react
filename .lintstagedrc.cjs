module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --cache --fix',
    'prettier --write',
  ],
  '*.{css,scss}': 'stylelint --cache --fix',
  '*.{ts,tsx}': () => 'npm run check:types',
}
