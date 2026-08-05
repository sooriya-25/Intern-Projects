const { validationResult } = require('express-validator');
const { addToWatchlistValidator } = require('../../validators/watchlist.validator');

describe('watchlist.validators', () => {
  test('addToWatchlistValidator - missing stockId produces error', async () => {
    const req = { body: {} };
    await Promise.all(addToWatchlistValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    const msgs = errors.array().map(e => e.msg);
    expect(msgs).toEqual(expect.arrayContaining([
      'Stock ID is required',
    ]));
  });

  test('addToWatchlistValidator - valid stockId passes', async () => {
    const req = { body: { stockId: '507f1f77bcf86cd799439011' } };
    await Promise.all(addToWatchlistValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });
});
