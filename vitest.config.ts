import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    // Allows to use it, expect, etc. in tests without importing them
    globals: true,
    // This file runs before each test file
    setupFiles: 'tests/setup.ts'
  }
});
