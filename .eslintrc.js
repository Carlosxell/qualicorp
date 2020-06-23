module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "space-infix-ops": ["error", { "int32Hint": false }], //space around = , +, -, etc
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }], //space after :
    "keyword-spacing": ["error", { "before": true }],
    "space-before-blocks": ["error", "always"],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": "error",
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": 1,
      "multiline": {
        "max": 1,
        "allowFirstLine": true
      }
    }],
    "vue/script-indent": ["error", 2, { "baseIndent": 1 }],
  },
};
