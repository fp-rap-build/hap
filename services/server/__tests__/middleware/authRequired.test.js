const { default: expectCt } = require('helmet/dist/middlewares/expect-ct');
const { intersect } = require('../../data/db-config');

describe('restrictTo unit test', () => {
  it('works', () => {
    expect(2 + 2).toBe(4);
  });
});
