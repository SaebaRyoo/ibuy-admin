module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],

  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    '@typescript-eslint/no-use-before-define': 'off',
    'prefer-const': 'warn',
  },
};
