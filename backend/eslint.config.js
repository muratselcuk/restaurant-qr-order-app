import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules', 'dist'] },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.node,
      sourceType: 'module',
    },
    plugins: {
      // ek plugin’ler eklenebilir
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
