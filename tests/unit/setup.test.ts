import { describe, expect, it } from 'vitest';
import { APP_TITLE } from '../../src/messages';

describe('project setup', () => {
  it('exposes the app title from the messages module', () => {
    expect(APP_TITLE).toBe('Mortgage Calculator');
  });
});
