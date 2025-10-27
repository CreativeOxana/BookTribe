module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 120,
  bracketSpacing: true,
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
};
