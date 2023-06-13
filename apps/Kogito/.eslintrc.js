module.exports = {
  root: true,
  extends: ['@react-native-community', '@mkraina/eslint-config-base'],
  rules: {
    'react-native/no-inline-styles': 'warn', //TODO: remove
    'react-hooks/exhaustive-deps': 'warn', //TODO: remove
    'max-lines-per-function': 'warn', //TODO: remove
    'import/no-cycle': 'warn', //TODO: remove
    '@typescript-eslint/ban-ts-comment': 'warn', //TODO: remove
    'react/jsx-no-literals': 'warn', //TODO: remove
    'max-statements': 'warn', //TODO: remove
    '@typescript-eslint/no-floating-promises': 'off', //TODO: remove
    '@typescript-eslint/no-explicit-any': 'warn', //TODO: remove
    '@shopify/prefer-early-return': 'warn', //TODO:remove
    'require-await': 'warn', //TODO: remove
    'max-lines': 'warn', //TODO: remove
    'no-shadow': 'warn', //TODO: remove
    '@typescript-eslint/prefer-optional-chain': 'warn', //TODO:remove
    'max-depth': 'warn', //TODO: remove
    '@typescript-eslint/no-unnecessary-condition': 'off', //TODO: remove
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native-config',
            message:
              'Please use ENV from src/env which uses react-native-config internally instead',
          },
        ],
      },
    ],
  },
};
