module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'max-len': ['off'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'require-jsdoc': ['off'],
    'object-curly-spacing': ['off'],
  },
};
