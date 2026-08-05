const getPagination = require("../../utils/pagination");

describe("getPagination utility", () => {
  test("uses default values and computes skip", () => {
    const result = getPagination();

    expect(result).toEqual({
      page: 1,
      limit: 10,
      skip: 0,
    });
  });

  test("parses string arguments and computes skip correctly", () => {
    const result = getPagination("2", "5");

    expect(result).toEqual({
      page: 2,
      limit: 5,
      skip: 5,
    });
  });
});
