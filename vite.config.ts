import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Relative asset paths, so dist/ works from any folder or sub-path.
  base: './',
  // 'mpa': no single-page-app fallback, so a missing file (e.g. config.json) gets a real 404
  // in `npm run dev` and `vite preview` instead of index.html with status 200 (A4.1).
  appType: 'mpa',
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
