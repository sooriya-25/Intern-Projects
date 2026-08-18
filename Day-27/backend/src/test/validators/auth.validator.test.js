const { validationResult } = require('express-validator');
const { registerValidator, loginValidator } = require('../../validators/auth.validator');

describe('auth.validators', () => {
  test('registerValidator - invalid input produces errors', async () => {
    const req = { body: { name: '', email: 'not-an-email', password: '123' } };
    await Promise.all(registerValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    const msgs = errors.array().map(e => e.msg);
    expect(msgs).toEqual(expect.arrayContaining([
      'Name is required',
      'Please enter a valid email',
      'Password should be at least 6 characters',
    ]));
  });

  test('registerValidator - password must include uppercase, number, and special character', async () => {
    const req = { body: { name: 'Alice', email: 'alice@example.com', password: 'secret123' } };
    await Promise.all(registerValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    const msgs = errors.array().map(e => e.msg);
    expect(msgs).toEqual(expect.arrayContaining([
      'Password must contain at least one uppercase letter, one number, and one special character',
    ]));
  });

  test('registerValidator - valid input has no errors', async () => {
    const req = { body: { name: 'Alice', email: 'alice@example.com', password: 'Secret@123' } };
    await Promise.all(registerValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  test('loginValidator - invalid input produces errors', async () => {
    const req = { body: { email: 'bad', password: '' } };
    await Promise.all(loginValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    const msgs = errors.array().map(e => e.msg);
    expect(msgs).toEqual(expect.arrayContaining([
      'Please enter a valid email',
      'Password is required',
    ]));
  });

  test('loginValidator - valid input has no errors', async () => {
    const req = { body: { email: 'bob@example.com', password: 'password' } };
    await Promise.all(loginValidator.map(v => v.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });
});
