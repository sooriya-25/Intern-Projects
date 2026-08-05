const dashboardController = require("../../controllers/dashboard.controller");

describe("dashboard.controller", () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getDashboard returns 200", async () => {
    const req = {};
    const res = { status };
    jest.spyOn(require("../../services/dashboard.service"), "getDashboard").mockResolvedValue({ stats: {} });

    await dashboardController.getDashboard(req, res, next);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ success: true, data: { stats: {} } });
  });
});
