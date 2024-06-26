module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'import'],
  rules: {
    curly: 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'sibling',
          'parent',
          'index',
        ],
        pathGroups: [
          {
            pattern: '@(react|react-*)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-native-gesture-handler/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@assets/**',
            group: 'internal',
          },
          {
            pattern: '@components/**',
            group: 'internal',
          },
          {
            pattern: '@screens/**',
            group: 'internal',
          },
          {
            pattern: '@navigation/**',
            group: 'internal',
          },
          {
            pattern: '@hooks/**',
            group: 'internal',
          },
          {
            pattern: './**',
            group: 'index',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal', 'react'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
