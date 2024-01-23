module.exports = {
  fix: true,
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
  rules: {
    // 'prettier/prettier': false,
    'selector-class-pattern': '^[a-zA-Z][a-zA-Z0-9-_]+$',
    'selector-id-pattern': false,
  },
}
