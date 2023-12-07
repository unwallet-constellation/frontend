module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrder: [
    '^((react|next)/(.*)$)|^((react|next)$)',
    '<THIRD_PARTY_MODULES>',
    '^@/(config|types|styles|lib|utils|hooks|shared|components|app|pages|features)/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
        importOrderParserPlugins: ['typescript', 'jsx'],
      },
    },
  ],
  tailwindConfig: 'tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cva'],
}
