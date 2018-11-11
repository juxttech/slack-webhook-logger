import * as sumologicLogger from './index';

describe('index.ts', () => {
  test('should export an object with child "Logger"', () => {
    expect(sumologicLogger).toHaveProperty('Logger');
  });
});
