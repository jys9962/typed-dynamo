import { DynamoKey } from '../../src';

describe('DynamoKey', () => {
  describe('create', () => {
    it('키 생성', () => {
      const format = 'USER#{id}';
      const result = DynamoKey.create(format, { id: '123' });
      expect(result).toBe('USER#123');
    });

    it('복잡한 키 생성', () => {
      const format = 'USER#{id}#POST#{postId}';
      const result = DynamoKey.create(format, {
        id: '123',
        postId: '456',
      });
      expect(result).toBe('USER#123#POST#456');
    });
  });

  describe('parse', () => {
    it('키에서 값 추출', () => {
      const format = 'USER#{id}';
      const key = 'USER#123' as DynamoKey<typeof format>;
      const result = DynamoKey.parse(format, key);
      expect(result).toEqual({ id: '123' });
    });

    it('복잡한 키에서 값 추출', () => {
      const format = 'USER#{id}#POST#{postId}';
      const key = 'USER#123#POST#456' as DynamoKey<typeof format>;
      const result = DynamoKey.parse(format, key);
      expect(result).toEqual({ id: '123', postId: '456' });
    });

    it('값이 없는경우 빈 객체', () => {
      const format = 'CONSTANT#VALUE';
      const key = 'CONSTANT#VALUE' as DynamoKey<typeof format>;
      const result = DynamoKey.parse(format, key);
      expect(result).toEqual({});
    });
  });
});
