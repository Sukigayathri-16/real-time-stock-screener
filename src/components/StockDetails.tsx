"use client";

import type { ExtendedStock } from "../store/stockStore";

type StockDetailsProps = {
  stock: ExtendedStock | null;
};

export default function StockDetails({
  stock,
}: StockDetailsProps) {
  if (!stock) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          Stock Details
        </h2>

        <p className="text-slate-500 mt-2">
          Select a stock from the table to view details.
        </p>
      </div>
    );
  }

  const positive = stock.change >= 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900">
              {stock.symbol}
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                positive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {positive ? "GAINER" : "LOSER"}
            </span>
          </div>

          <p className="text-slate-500 mt-1">
            {stock.company} · {stock.country} · {stock.sector}
          </p>
        </div>

        <div className="text-left md:text-right">
          <p className="text-3xl font-bold text-slate-900">
            ${stock.price.toFixed(2)}
          </p>

          <p
            className={`font-semibold ${
              positive ? "text-green-600" : "text-red-600"
            }`}
          >
            {positive ? "+" : ""}
            {stock.change.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Metric
          label="Volume"
          value={stock.volume.toLocaleString()}
        />

        <Metric
          label="Market Cap"
          value={`$${(stock.marketCap / 1e9).toFixed(2)}B`}
        />

        <Metric
          label="P/E"
          value={stock.pe.toFixed(2)}
        />

        <Metric
          label="EPS"
          value={`$${stock.eps.toFixed(2)}`}
        />

        <Metric
          label="RSI"
          value={stock.rsi.toFixed(2)}
        />

        <Metric
          label="Beta"
          value={stock.beta.toFixed(2)}
        />

        <Metric
          label="SMA"
          value={stock.sma.toFixed(2)}
        />

        <Metric
          label="EMA"
          value={stock.ema.toFixed(2)}
        />

        <Metric
          label="ROE"
          value={`${stock.roe.toFixed(2)}%`}
        />

        <Metric
          label="ROA"
          value={`${stock.roa.toFixed(2)}%`}
        />

        <Metric
          label="Dividend Yield"
          value={`${stock.dividendYield.toFixed(2)}%`}
        />

        <Metric
          label="Volatility"
          value={`${stock.volatility.toFixed(2)}%`}
        />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border border-slate-200 rounded-lg p-4">
      <p className="text-xs text-slate-500 mb-1">
        {label}
      </p>

      <p className="text-lg font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}