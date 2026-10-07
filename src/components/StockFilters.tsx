"use client";

import React from "react";

export type FilterState = {
  priceMin: string;
  priceMax: string;

  changeMin: string;
  changeMax: string;

  volumeMin: string;
  volumeMax: string;

  marketCapMin: string;
  marketCapMax: string;

  peMin: string;
  peMax: string;

  epsMin: string;
  epsMax: string;

  dividendYieldMin: string;
  dividendYieldMax: string;

  betaMin: string;
  betaMax: string;

  roeMin: string;
  roeMax: string;

  roaMin: string;
  roaMax: string;

  debtToEquityMin: string;
  debtToEquityMax: string;

  currentRatioMin: string;
  currentRatioMax: string;

  profitMarginMin: string;
  profitMarginMax: string;

  revenueGrowthMin: string;
  revenueGrowthMax: string;

  earningsGrowthMin: string;
  earningsGrowthMax: string;

  volatilityMin: string;
  volatilityMax: string;

  rsiMin: string;
  rsiMax: string;

  smaMin: string;
  smaMax: string;

  emaMin: string;
  emaMax: string;

  macdMin: string;
  macdMax: string;

  dayHighMin: string;
  dayHighMax: string;

  dayLowMin: string;
  dayLowMax: string;

  week52HighMin: string;
  week52HighMax: string;

  week52LowMin: string;
  week52LowMax: string;

  averageVolumeMin: string;
  averageVolumeMax: string;

  bookValueMin: string;
  bookValueMax: string;

  pegRatioMin: string;
  pegRatioMax: string;

  freeCashFlowMin: string;
  freeCashFlowMax: string;

  revenueMin: string;
  revenueMax: string;

  netIncomeMin: string;
  netIncomeMax: string;

  grossMarginMin: string;
  grossMarginMax: string;

  operatingMarginMin: string;
  operatingMarginMax: string;
};

type FilterKey = keyof FilterState;

type StockFiltersProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;

  sector: string;
  setSector: React.Dispatch<React.SetStateAction<string>>;

  trend: string;
  setTrend: React.Dispatch<React.SetStateAction<string>>;

  filters: FilterState;

  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;

  updateFilter: (key: FilterKey, value: string) => void;

  resetFilters: () => void;

  sectors: string[];
};

type FilterConfig = {
  label: string;
  minKey: FilterKey;
  maxKey: FilterKey;
};

const FILTER_CONFIG: FilterConfig[] = [
  {
    label: "Price",
    minKey: "priceMin",
    maxKey: "priceMax",
  },
  {
    label: "Change %",
    minKey: "changeMin",
    maxKey: "changeMax",
  },
  {
    label: "Volume",
    minKey: "volumeMin",
    maxKey: "volumeMax",
  },
  {
    label: "Market Cap",
    minKey: "marketCapMin",
    maxKey: "marketCapMax",
  },
  {
    label: "P/E Ratio",
    minKey: "peMin",
    maxKey: "peMax",
  },
  {
    label: "EPS",
    minKey: "epsMin",
    maxKey: "epsMax",
  },
  {
    label: "Dividend Yield",
    minKey: "dividendYieldMin",
    maxKey: "dividendYieldMax",
  },
  {
    label: "Beta",
    minKey: "betaMin",
    maxKey: "betaMax",
  },
  {
    label: "ROE",
    minKey: "roeMin",
    maxKey: "roeMax",
  },
  {
    label: "ROA",
    minKey: "roaMin",
    maxKey: "roaMax",
  },
  {
    label: "Debt / Equity",
    minKey: "debtToEquityMin",
    maxKey: "debtToEquityMax",
  },
  {
    label: "Current Ratio",
    minKey: "currentRatioMin",
    maxKey: "currentRatioMax",
  },
  {
    label: "Profit Margin",
    minKey: "profitMarginMin",
    maxKey: "profitMarginMax",
  },
  {
    label: "Revenue Growth",
    minKey: "revenueGrowthMin",
    maxKey: "revenueGrowthMax",
  },
  {
    label: "Earnings Growth",
    minKey: "earningsGrowthMin",
    maxKey: "earningsGrowthMax",
  },
  {
    label: "Volatility",
    minKey: "volatilityMin",
    maxKey: "volatilityMax",
  },
  {
    label: "RSI",
    minKey: "rsiMin",
    maxKey: "rsiMax",
  },
  {
    label: "SMA",
    minKey: "smaMin",
    maxKey: "smaMax",
  },
  {
    label: "EMA",
    minKey: "emaMin",
    maxKey: "emaMax",
  },
  {
    label: "MACD",
    minKey: "macdMin",
    maxKey: "macdMax",
  },
  {
    label: "Day High",
    minKey: "dayHighMin",
    maxKey: "dayHighMax",
  },
  {
    label: "Day Low",
    minKey: "dayLowMin",
    maxKey: "dayLowMax",
  },
  {
    label: "52 Week High",
    minKey: "week52HighMin",
    maxKey: "week52HighMax",
  },
  {
    label: "52 Week Low",
    minKey: "week52LowMin",
    maxKey: "week52LowMax",
  },
  {
    label: "Average Volume",
    minKey: "averageVolumeMin",
    maxKey: "averageVolumeMax",
  },
  {
    label: "Book Value",
    minKey: "bookValueMin",
    maxKey: "bookValueMax",
  },
  {
    label: "PEG Ratio",
    minKey: "pegRatioMin",
    maxKey: "pegRatioMax",
  },
  {
    label: "Free Cash Flow",
    minKey: "freeCashFlowMin",
    maxKey: "freeCashFlowMax",
  },
  {
    label: "Revenue",
    minKey: "revenueMin",
    maxKey: "revenueMax",
  },
  {
    label: "Net Income",
    minKey: "netIncomeMin",
    maxKey: "netIncomeMax",
  },
  {
    label: "Gross Margin",
    minKey: "grossMarginMin",
    maxKey: "grossMarginMax",
  },
  {
    label: "Operating Margin",
    minKey: "operatingMarginMin",
    maxKey: "operatingMarginMax",
  },
];

function FilterBox({
  label,
  minKey,
  maxKey,
  filters,
  updateFilter,
}: {
  label: string;
  minKey: FilterKey;
  maxKey: FilterKey;
  filters: FilterState;
  updateFilter: (key: FilterKey, value: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-slate-700">{label}</p>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          value={filters[minKey]}
          onChange={(e) => updateFilter(minKey, e.target.value)}
          placeholder="Min"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <input
          type="number"
          value={filters[maxKey]}
          onChange={(e) => updateFilter(maxKey, e.target.value)}
          placeholder="Max"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}

export default function StockFilters({
  search,
  setSearch,
  country,
  setCountry,
  sector,
  setSector,
  trend,
  setTrend,
  filters,
  showFilters,
  setShowFilters,
  updateFilter,
  resetFilters,
  sectors,
}: StockFiltersProps) {
  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Stock Screener
          </h2>

          <p className="text-sm text-slate-500">
            Search and filter Indian & US stocks
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <button
            type="button"
            onClick={resetFilters}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Search
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symbol or company..."
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Country */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Country
          </label>

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500"
          >
            <option value="All">All Countries</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
        </div>

        {/* Sector */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Sector
          </label>

          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500"
          >
            <option value="All">All Sectors</option>

            {sectors
              .filter((item) => item !== "All")
              .map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Trend */}
      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold text-slate-700">Trend</p>

        <div className="flex flex-wrap gap-2">
          {["All", "Gainers", "Losers"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTrend(item)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                trend === item
                  ? "bg-blue-600 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-6 border-t border-slate-200 pt-6">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-slate-900">
              Advanced Filters
            </h3>

            <p className="text-sm text-slate-500">
              Use minimum and maximum values to narrow down stocks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {FILTER_CONFIG.map((filter) => (
              <FilterBox
                key={filter.label}
                label={filter.label}
                minKey={filter.minKey}
                maxKey={filter.maxKey}
                filters={filters}
                updateFilter={updateFilter}
              />
            ))}
          </div>

          {/* Filter count */}
          <div className="mt-5 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
            <strong>{FILTER_CONFIG.length}</strong> advanced filter criteria
            available.
          </div>
        </div>
      )}
    </section>
  );
}