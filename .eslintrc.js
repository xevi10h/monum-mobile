module.exports = {
  plugins: ["import",'@typescript-eslint',],
  rules: {
    "import/order": [
      "error",
      {
        "newlines-between": "always", // or 'never'
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  },
  parser: '@typescript-eslint/parser'
};

