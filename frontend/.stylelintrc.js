module.exports = {
  extends: "stylelint-config-standard-scss",
  rules: {
    "selector-class-pattern": [
      "^[A-Z][a-zA-Z0-9]+(__|--)?[A-Za-z]+$",
      {
        resolveNestedSelectors: true,
        message: "Use UpperPascalCase and BEM only 🚫"
      }
    ]
  }
}
