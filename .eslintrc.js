module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'standard-with-typescript',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
    ],
    plugins: ['react', 'react-hooks', 'react-refresh'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeature: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
    },
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
        'react': {
            version: 'detect',
        },
    },
    rules: {
        'import/order': [
            'error',
            {
                'groups': ['builtin', 'external', 'internal', 'parent', 'sibling'],
                'pathGroups': [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '*.css',
                        group: 'index',
                        patternOptions: {
                            matchBase: true,
                        },
                        position: 'after',
                    },
                    {
                        pattern: '@/**',
                        group: 'external',
                        position: 'after',
                    },
                ],
                // "pathGroupsExcludedImportTypes": ["react"],
                'newlines-between': 'never',
                'alphabetize': {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        // local syntax principles
        'quotes': ['error', 'single'],
        'no-multi-spaces': 'error',
        'comma-style': ['error', 'last'],
        'func-call-spacing': ['error', 'never'],
        'function-paren-newline': ['error', 'consistent'],
        'key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: ['enum', 'enumMember', 'class'],
                format: ['PascalCase'],
            },
        ],
        'linebreak-style': ['error', 'unix'],
        // easy-to-read-and-refactor syntax
        '@typescript-eslint/no-shadow': ['error', { hoist: 'never' }],
        'no-else-return': ['error', { allowElseIf: false }],
        'func-names': ['error', 'never'],
        'dot-notation': 'error',
        'default-case-last': 'error',
        // code security enhancing syntax
        'react-refresh/only-export-components': 'warn',
        'init-declarations': ['warn', 'always'],
        'default-param-last': 'error',
        'default-case': 'error',
        // code cleanup rules
        '@typescript-eslint/no-unused-vars': 'warn',
        // hindering and useless syntax
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'max-classes-per-file': 'off',
        'no-use-before-define': 'off',
        'react/style-prop-object': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
};
