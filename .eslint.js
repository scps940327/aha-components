module.exports = {
  extends: [
      'react-app',
      'react-app/jest',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:prettier/recommended',
      'plugin:storybook/recommended',
  ],
  rules: {
      // Include .prettierrc.js rules
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],

      'react/display-name': 'warn',
      'import/no-anonymous-default-export': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
  },
  settings: {
      'import/resolver': {
          typescript: {},
      },
  },
};