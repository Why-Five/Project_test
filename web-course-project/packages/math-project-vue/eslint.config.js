import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import tseslint from '@typescript-eslint/eslint-plugin'
import parserVue from 'vue-eslint-parser'
import parserTs from '@typescript-eslint/parser'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from '@vue/eslint-config-prettier'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '*.d.ts']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
      },
      parser: parserVue,
      parserOptions: {
        parser: parserTs,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': tseslint,
      prettier: pluginPrettier
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-model-argument': 'off'
    }
  },
  ...configPrettier
]