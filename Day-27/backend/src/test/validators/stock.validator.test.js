const { validationResult } = require('express-validator');
const { createStockValidator, updateStockValidator } = require('../../validators/stock.validator');

describe('stock.validators', () => {
  test('createStockValidator - invalid input produces errors', async () => {
    const req = { body: { company: '', symbol: '', sector: '', exchange: '', currentPrice: -5 } };
    await Promise.all(createStockValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    const msgs = errors.array().map(e => e.msg);
    expect(msgs).toEqual(expect.arrayContaining([
      'Company is required',
      'Symbol is required',
      'Sector is required',
      'Exchange is required',
      'Current price must be greater than 0',
    ]));
  });

  test('createStockValidator - valid input has no errors', async () => {
    const req = { body: { company: 'Acme', symbol: 'ACME', sector: 'Tech', exchange: 'NASDAQ', currentPrice: 10, marketCap: 1000 } };
    await Promise.all(createStockValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  test('updateStockValidator - empty body passes (all optional)', async () => {
    const req = { body: {} };
    await Promise.all(updateStockValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  test('updateStockValidator - invalid currentPrice when provided', async () => {
    const req = { body: { currentPrice: -1 } };
    await Promise.all(updateStockValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    const msgs = errors.array().map(e => e.msg);
    expect(msgs).toEqual(expect.arrayContaining([
      'Current price must be greater than 0',
    ]));
  });
});
