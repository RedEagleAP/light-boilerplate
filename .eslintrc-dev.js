// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jquery: true,
  },
  extends: [
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack/webpack.config.base.babel.js',
      },
    },
  },
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
      },
    ],
    'arrow-parens': 1,
    'no-multi-spaces': 1,
    'key-spacing': 1,
    'no-unused-vars': 0,
    'no-undef': 0,
    indent: 1,
    'no-console': 1,
    'no-new': 1,
    'object-curly-spacing': 0,
    'arrow-body-style': [2, 'as-needed'],
    'no-param-reassign': [2, { props: false }],
    'func-names': 1,
    'space-before-function-paren': 0,
  },
};
