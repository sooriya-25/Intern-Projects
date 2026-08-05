import { render, screen } from "@testing-library/react";
import StockCard from "./StockCard";

describe("StockCard", () => {
  const stock = {
    _id: "1",
    company: "Test Corp",
    symbol: "TC",
    currentPrice: 100,
    sector: "Tech",
    exchange: "NASDAQ",
    description: "Test description",
  };

  test("renders stock information and add button", () => {
    render(
      <StockCard
        stock={stock}
        isAdmin={false}
        isInWatchlist={false}
        isPending={false}
        onWatchlist={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("Test Corp")).toBeInTheDocument();
    expect(screen.getByText("TC")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Add to Watchlist")).toBeInTheDocument();
  });
});
