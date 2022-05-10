module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,
  // parser: '@typescript-eslint/parser',
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    // parser: '@babel/eslint-parser', // 'babel-eslint',
    extraFileExtensions: ['.vue'],
    ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },

  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    // 'eslint:recommended',

    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    // 'plugin:vue/essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/vue3-essential',
    // 'plugin:vue/strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    // 'plugin:vue/recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

    /* 'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript', */
    // 'plugin:vue/recommended',
    // '@vue/typescript/recommended',
    // 'standard',
    // 'plugin:@typescript-eslint/recommended'
    'eslint:recommended',
    'standard',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript'
    // '@vue/eslint-config-typescript/recommended',
    // '@vue/eslint-config-prettier'
  ],

  plugins: [
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    // 'vue',
    // '@typescript-eslint'

  ],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
    chrome: true,
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },

  // add your custom rules here
  rules: {
    'object-curly-spacing': 'off',
    'space-before-function-paren': 'off',
    semi: 'off',
    skipTemplates: 'off',
    skipStrings: 'off',
    'no-inferrable-types': 'off',
    'ban-ts-comment': 'off',
    'no-irregular-whitespace': 'off',
    'vue/multi-word-component-names': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    'no-unused-vars': 'off',
    'one-var': 'off',
    'dot-notation': 'off',

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prefer-promise-reject-errors': 'off',

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
