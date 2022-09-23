module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ['prettier', 'standard'],
  ignorePatterns: ['dist'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['prettier'],
  rules: {
    'comma-dangle': 0,
    semi: 0,
  },
};
