module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    // Miscellaneous
    'no-console': ['error'],
    'no-debugger': ['error'],
    '@typescript-eslint/triple-slash-reference': 'off',
  },
};
