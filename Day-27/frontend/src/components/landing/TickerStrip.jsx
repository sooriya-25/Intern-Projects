import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";

const TICKERS = [
  { symbol: "AAPL", price: "228.14", change: "+1.24%", up: true },
  { symbol: "TSLA", price: "412.87", change: "-0.62%", up: false },
  { symbol: "NIFTY50", price: "24,812", change: "+0.38%", up: true },
  { symbol: "GOOGL", price: "182.55", change: "+2.11%", up: true },
  { symbol: "SENSEX", price: "81,204", change: "-0.15%", up: false },
  { symbol: "AMZN", price: "204.33", change: "+0.87%", up: true },
  { symbol: "BTC", price: "94,120", change: "+3.42%", up: true },
  { symbol: "MSFT", price: "441.02", change: "-0.28%", up: false },
  { symbol: "RELIANCE", price: "2,988", change: "+1.05%", up: true },
  { symbol: "NVDA", price: "138.60", change: "+4.03%", up: true },
];

const TickerCell = ({ symbol, price, change, up }) => (
  <div className="flex items-center gap-2.5 px-6 py-3 whitespace-nowrap">
    <span className="font-mono font-semibold text-ink-900 text-sm">{symbol}</span>
    <span className="font-mono text-[#5b7b9d] text-sm">{price}</span>
    <span
      className={`flex items-center gap-0.5 font-mono text-sm font-semibold ${
        up ? "text-bull" : "text-bear"
      }`}
    >
      {up ? <CaretUpFilled /> : <CaretDownFilled />}
      {change}
    </span>
    <span className="w-1 h-1 rounded-full bg-surge-500/20 ml-3" />
  </div>
);

const TickerStrip = () => {
  const doubled = [...TICKERS, ...TICKERS];

  return (
    <div id="ticker" className="relative w-full overflow-hidden bg-transparent scroll-mt-20">
      <div className="flex flex-nowrap w-max animate-marquee hover:[animation-play-state:paused] gap-4">
        {doubled.map((t, i) => (
          <TickerCell key={`${t.symbol}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
};

export default TickerStrip;
