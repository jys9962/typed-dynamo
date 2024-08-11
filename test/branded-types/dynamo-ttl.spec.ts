import { DynamoTTL } from '../../src';

describe('DynamoTTL', function () {
  it('of', async function () {
    const ttl = DynamoTTL.of(new Date(123000));

    expect(ttl).toBe(123);
  });
});
