module.exports = {
  fix: true,
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
  rules: {
    'prettier/prettier': null,
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'no-descending-specificity': true,
    'scss/no-global-function-names': null,
    'scss/load-no-partial-leading-underscore': null,
    'block-no-empty': null,
  },
}
