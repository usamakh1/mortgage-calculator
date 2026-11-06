import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Relative asset paths, so dist/ works from any folder or sub-path.
  base: './',
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
