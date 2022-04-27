import { flagToObj, queryNameToString } from '../../src/dns/utils';

describe('test flagToObj', () => {
  it('test RD 1', () => {
    const rawFlag = 256;
    expect(flagToObj(rawFlag).RD).toBe(1);
  });
});

describe('test queryNameToString fn', () => {
  it('test baidu', () => {
    const rawQueryName = Buffer.from(
      [3, 119, 119, 119, 5, 98, 97, 105, 100, 117, 3, 99, 111, 109, 0]
    );
    const queryNameStr = queryNameToString(rawQueryName);
    expect(queryNameStr).toBe('www.baidu.com');
  });
});
