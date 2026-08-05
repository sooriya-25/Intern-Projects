const { validationResult } = require('express-validator');
const { updateUserStatusValidator } = require('../../validators/user.validator');

describe('user.validators', () => {
  test('updateUserStatusValidator - missing status produces error', async () => {
    const req = { body: {} };
    await Promise.all(updateUserStatusValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    const msgs = errors.array().map(e => e.msg);
    expect(msgs).toEqual(expect.arrayContaining([
      'Status is required',
    ]));
  });

  test('updateUserStatusValidator - invalid status produces error', async () => {
    const req = { body: { status: 'SUSPENDED' } };
    await Promise.all(updateUserStatusValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    const msgs = errors.array().map(e => e.msg);
    expect(msgs).toEqual(expect.arrayContaining([
      'Invalid status',
    ]));
  });

  test('updateUserStatusValidator - valid statuses pass', async () => {
    const reqA = { body: { status: 'ACTIVE' } };
    await Promise.all(updateUserStatusValidator.map(v => v.run(reqA)));
    const errorsA = validationResult(reqA);
    expect(errorsA.isEmpty()).toBe(true);

    const reqB = { body: { status: 'INACTIVE' } };
    await Promise.all(updateUserStatusValidator.map(v => v.run(reqB)));
    const errorsB = validationResult(reqB);
    expect(errorsB.isEmpty()).toBe(true);
  });
});
