import { render, screen } from "@testing-library/react";
import SectorChart from "./SectorChart";

describe("SectorChart", () => {
  const mockData = [
    { sector: "Tech", count: 40 },
    { sector: "Finance", count: 60 },
  ];

  test("renders chart title and sector cards", () => {
    render(<SectorChart data={mockData} />);

    expect(screen.getByText("Sector Distribution")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
    expect(screen.getByText("Finance")).toBeInTheDocument();
    expect(screen.getByText("40 stocks")).toBeInTheDocument();
    expect(screen.getByText("60 stocks")).toBeInTheDocument();
  });
});
