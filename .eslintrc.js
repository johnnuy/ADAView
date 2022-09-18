module.exports = {
  root: true,
  env: {
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {},
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'off', // this is a good thing as it would prevent future conflicts with HTML elements but for now, disable
  },
  overrides: [
    {
      files: ['*.html'],
      rules: {
        'vue/comment-directive': 'off',
      },
    },
  ],
}
