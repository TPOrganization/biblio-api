module.exports = {
  "root": true,
  "ignorePatterns": [
    "projects/**/*"
  ],
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "parserOptions": {
        "project": [
          "tsconfig.json",
          "e2e/tsconfig.json"
        ],
        "createDefaultProgram": true
      }
    },
  ],
  "parser": "@typescript-eslint/parser",
  "extends": [
    "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  "rules": {
    "semi": [
      2,
      "never"
    ],
    "quotes": [
      2,
      "single"
    ],
    "indent": [
      2,
      4,
      {
        "SwitchCase": 1,
        "ignoredNodes": ["PropertyDefinition"]
      }
    ],
    "no-async-promise-executor": "off",
    "no-case-declarations": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
}
