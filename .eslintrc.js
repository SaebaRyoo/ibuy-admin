module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],

  rules: {
    'no-unused-vars': 'off', // 未使用的变量js部分报错
    '@typescript-eslint/no-unused-vars': 'off', // 未使用的变量ts部分报错
    'react-hooks/rules-of-hooks': 'warn', // hook规则
    '@typescript-eslint/no-use-before-define': 'off', // 已定义，未使用变量warn
    'prefer-const': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
  },
};
