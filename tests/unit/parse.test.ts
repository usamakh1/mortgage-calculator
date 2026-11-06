import { describe, expect, it } from 'vitest';
import { parseField, type FieldKind } from '../../src/engine/parse';

const value = (raw: string, kind: FieldKind) => parseField(raw, kind);
const okValue = (n: number) => ({ kind: 'ok', value: n });
const INVALID = { kind: 'invalid' };
const EMPTY = { kind: 'empty' };

describe('P. Parsing (Shared definitions, Input rules)', () => {
  it('P1 (L8.6): "1,500,000" in a money field is 1,500,000.00', () => {
    expect(value('1,500,000', 'money')).toEqual(okValue(150_000_000));
  });

  it('P2/P3 (L8.6, rule 7): " 6.5 ", "6.5%" and "6.5 %" in the rate are 6.5', () => {
    expect(value(' 6.5 ', 'rate')).toEqual(okValue(6.5));
    expect(value('6.5%', 'rate')).toEqual(okValue(6.5));
    expect(value('6.5 %', 'rate')).toEqual(okValue(6.5));
    expect(value(' 6.5% ', 'rate')).toEqual(okValue(6.5));
  });

  it.each(['abc', '1e400', '1e5', '--5', '6.5%'])('P4 (L8.7): "%s" in a money field is rejected', (raw) => {
    expect(value(raw, 'money')).toEqual(INVALID);
  });

  it('P5 (rule 7): "%" is rejected outside the rate field', () => {
    expect(value('6.5%', 'money')).toEqual(INVALID);
    expect(value('15%', 'term')).toEqual(INVALID);
  });

  it('P6 (rules 1, 6): trimming and cents', () => {
    expect(value('  350000  ', 'money')).toEqual(okValue(35_000_000));
    expect(value('350000.50', 'money')).toEqual(okValue(35_000_050));
    expect(value('0.01', 'money')).toEqual(okValue(1));
    expect(value(' 350000 ', 'money')).toEqual(okValue(35_000_000)); // pasted non-breaking spaces
  });

  it.each(['%', '6.5%%', 'Infinity', 'NaN', '0x10', '%6.5'])('P7: "%s" in the rate is rejected', (raw) => {
    expect(value(raw, 'rate')).toEqual(INVALID);
  });

  it.each(['', '   ', '\t'])('V5 (rule 1): "%s" counts as empty', (raw) => {
    expect(value(raw, 'money')).toEqual(EMPTY);
    expect(value(raw, 'rate')).toEqual(EMPTY);
    expect(value(raw, 'term')).toEqual(EMPTY);
  });
});

describe('U. Input rules the docs now define (U1–U12)', () => {
  it('U1 (rule 6): more than 2 decimals in money is rejected, never rounded', () => {
    expect(value('100.123', 'money')).toEqual(INVALID);
    expect(value('100.12', 'money')).toEqual(okValue(10_012));
  });

  it.each(['1.500.000', '1,50,000', '1,5', '15,00', ',500', '1,500,00', '1 500 000'])(
    'U2/U3/U11 (rule 3): "%s" is rejected',
    (raw) => {
      expect(value(raw, 'money')).toEqual(INVALID);
    },
  );

  it('U3 (rule 3): "6,5" in the rate is rejected, not read as 65', () => {
    expect(value('6,5', 'rate')).toEqual(INVALID);
  });

  it.each(['٣٠٠٠٠٠', '３００'])('U4 (rule 2): non-ASCII digits "%s" are rejected', (raw) => {
    expect(value(raw, 'money')).toEqual(INVALID);
  });

  it('U6 (rule 4): ".5" is 0.5 and "5." is 5; "." alone is rejected', () => {
    expect(value('.5', 'money')).toEqual(okValue(50));
    expect(value('5.', 'money')).toEqual(okValue(500));
    expect(value('.5', 'rate')).toEqual(okValue(0.5));
    expect(value('.', 'money')).toEqual(INVALID);
  });

  it.each(['+5', '-5', '-0', '+0'])('U7 (rule 5): sign "%s" is rejected', (raw) => {
    expect(value(raw, 'money')).toEqual(INVALID);
    expect(value(raw, 'rate')).toEqual(INVALID);
    expect(value(raw, 'term')).toEqual(INVALID);
  });

  it('U8 (rule 4): leading zeros are ignored', () => {
    expect(value('007', 'money')).toEqual(okValue(700));
    expect(value('007', 'term')).toEqual(okValue(7));
  });

  it('U9 (rule 7): the rate accepts at most 3 decimals', () => {
    expect(value('6.125', 'rate')).toEqual(okValue(6.125));
    expect(value('0.001', 'rate')).toEqual(okValue(0.001));
    expect(value('6.1234', 'rate')).toEqual(INVALID);
  });

  it('U10 (rule 8): the term must be whole; "15.0" and "15." are 15', () => {
    expect(value('15.0', 'term')).toEqual(okValue(15));
    expect(value('15.', 'term')).toEqual(okValue(15));
    expect(value('15.00', 'term')).toEqual(okValue(15));
    expect(value('15.5', 'term')).toEqual(INVALID);
  });

  it('very long digit strings are rejected without throwing; no non-finite value leaves the parser', () => {
    expect(value('9'.repeat(400), 'money')).toEqual(INVALID);
    expect(value('9'.repeat(400), 'rate')).toEqual(INVALID);
    expect(value('9'.repeat(400), 'term')).toEqual(INVALID);
  });
});
