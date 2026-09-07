module.exports = {
  projects: [
    {
      displayName: 'Android',
      preset: 'react-native',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],
      collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/index.ts',
        '!src/app/**',
      ],
      coverageThreshold: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
  ],
  testTimeout: 10000,
};
