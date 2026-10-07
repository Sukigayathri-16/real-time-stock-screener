"use client";

import { useEffect, useMemo, useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

import {
  useStockStore,
  type ExtendedStock,
  type Stock,
} from "../store/stockStore";

import StockSummary from "../components/StockSummary";

import StockFilters, {
  type FilterState,
} from "../components/StockFilters";

import StockDetails from "../components/StockDetails";

import TechnicalIndicators from "../components/TechnicalIndicators";

import StockTable from "../components/StockTable";


// =====================================================
// BASE STOCK TYPE
// =====================================================

type BaseStock = Omit<Stock, "pe" | "eps">;


// =====================================================
// BASE STOCK DATA
// INDIA + USA
// =====================================================

const BASE_STOCKS: BaseStock[] = [

  // ================= INDIA =================

  {
    symbol: "RELIANCE",
    company: "Reliance Industries",
    country: "India",
    sector: "Energy",
    price: 2950,
    change: 1.42,
    volume: 8200000,
    marketCap: 1990000000000,
  },

  {
    symbol: "TCS",
    company: "Tata Consultancy Services",
    country: "India",
    sector: "Technology",
    price: 3850,
    change: 0.84,
    volume: 3200000,
    marketCap: 1400000000000,
  },

  {
    symbol: "INFY",
    company: "Infosys",
    country: "India",
    sector: "Technology",
    price: 1780,
    change: -0.52,
    volume: 5100000,
    marketCap: 740000000000,
  },

  {
    symbol: "HDFCBANK",
    company: "HDFC Bank",
    country: "India",
    sector: "Financial",
    price: 1720,
    change: 1.12,
    volume: 4300000,
    marketCap: 1310000000000,
  },

  {
    symbol: "ICICIBANK",
    company: "ICICI Bank",
    country: "India",
    sector: "Financial",
    price: 1320,
    change: 0.72,
    volume: 6100000,
    marketCap: 930000000000,
  },

  {
    symbol: "SBIN",
    company: "State Bank of India",
    country: "India",
    sector: "Financial",
    price: 820,
    change: -0.34,
    volume: 7600000,
    marketCap: 730000000000,
  },

  {
    symbol: "ITC",
    company: "ITC Limited",
    country: "India",
    sector: "Consumer",
    price: 520,
    change: 0.42,
    volume: 9200000,
    marketCap: 650000000000,
  },

  {
    symbol: "HINDUNILVR",
    company: "Hindustan Unilever",
    country: "India",
    sector: "Consumer",
    price: 2650,
    change: -0.21,
    volume: 2100000,
    marketCap: 620000000000,
  },

  {
    symbol: "LT",
    company: "Larsen and Toubro",
    country: "India",
    sector: "Industrial",
    price: 3650,
    change: 1.67,
    volume: 1900000,
    marketCap: 500000000000,
  },

  {
    symbol: "SUNPHARMA",
    company: "Sun Pharmaceutical",
    country: "India",
    sector: "Healthcare",
    price: 1780,
    change: 0.91,
    volume: 2800000,
    marketCap: 430000000000,
  },


  // ================= USA =================

  {
    symbol: "AAPL",
    company: "Apple",
    country: "USA",
    sector: "Technology",
    price: 225,
    change: 1.21,
    volume: 42000000,
    marketCap: 3400000000000,
  },

  {
    symbol: "MSFT",
    company: "Microsoft",
    country: "USA",
    sector: "Technology",
    price: 510,
    change: 0.87,
    volume: 21000000,
    marketCap: 3800000000000,
  },

  {
    symbol: "GOOGL",
    company: "Alphabet",
    country: "USA",
    sector: "Technology",
    price: 245,
    change: -0.42,
    volume: 18000000,
    marketCap: 2900000000000,
  },

  {
    symbol: "AMZN",
    company: "Amazon",
    country: "USA",
    sector: "Consumer",
    price: 230,
    change: 1.55,
    volume: 25000000,
    marketCap: 2400000000000,
  },

  {
    symbol: "META",
    company: "Meta Platforms",
    country: "USA",
    sector: "Technology",
    price: 720,
    change: 1.18,
    volume: 12000000,
    marketCap: 1800000000000,
  },

  {
    symbol: "NVDA",
    company: "NVIDIA",
    country: "USA",
    sector: "Technology",
    price: 180,
    change: 2.14,
    volume: 55000000,
    marketCap: 4400000000000,
  },

  {
    symbol: "TSLA",
    company: "Tesla",
    country: "USA",
    sector: "Automotive",
    price: 410,
    change: -1.32,
    volume: 38000000,
    marketCap: 1300000000000,
  },

  {
    symbol: "JPM",
    company: "JPMorgan Chase",
    country: "USA",
    sector: "Financial",
    price: 320,
    change: 0.64,
    volume: 9000000,
    marketCap: 900000000000,
  },

  {
    symbol: "V",
    company: "Visa",
    country: "USA",
    sector: "Financial",
    price: 350,
    change: 0.73,
    volume: 7000000,
    marketCap: 700000000000,
  },

  {
    symbol: "NFLX",
    company: "Netflix",
    country: "USA",
    sector: "Entertainment",
    price: 1250,
    change: 1.76,
    volume: 3000000,
    marketCap: 530000000000,
  },
];


// =====================================================
// CREATE EXTENDED STOCK
// =====================================================

function generateExtendedStock(
  stock: BaseStock,
  index: number
): ExtendedStock {

  const variation = (index % 100) / 100;

  const price = Number(
    (stock.price * (1 + variation * 0.05)).toFixed(2)
  );

  return {

    ...stock,

    price,

    change: Number(
      (
        stock.change +
        ((index % 20) - 10) * 0.05
      ).toFixed(2)
    ),

    volume: Math.round(
      stock.volume *
      (1 + (index % 30) / 100)
    ),

    marketCap: Math.round(
      stock.marketCap *
      (1 + (index % 20) / 100)
    ),

    // ================= FUNDAMENTALS =================

    pe: Number(
      (15 + (index % 30) * 0.7).toFixed(2)
    ),

    eps: Number(
      (5 + (index % 50) * 0.5).toFixed(2)
    ),

    dividendYield: Number(
      (0.5 + (index % 40) * 0.1).toFixed(2)
    ),

    beta: Number(
      (0.7 + (index % 20) * 0.05).toFixed(2)
    ),

    roe: Number(
      (8 + (index % 30) * 0.8).toFixed(2)
    ),

    roa: Number(
      (4 + (index % 20) * 0.4).toFixed(2)
    ),

    debtToEquity: Number(
      (0.2 + (index % 15) * 0.15).toFixed(2)
    ),

    currentRatio: Number(
      (1 + (index % 20) * 0.1).toFixed(2)
    ),

    profitMargin: Number(
      (5 + (index % 30) * 0.7).toFixed(2)
    ),

    revenueGrowth: Number(
      (-5 + (index % 30) * 0.8).toFixed(2)
    ),

    earningsGrowth: Number(
      (-8 + (index % 35) * 0.7).toFixed(2)
    ),

    volatility: Number(
      (10 + (index % 25) * 0.8).toFixed(2)
    ),

    // ================= TECHNICAL =================

    rsi: Number(
      (30 + (index % 60)).toFixed(2)
    ),

    sma: Number(
      (price * (0.95 + (index % 10) / 100)).toFixed(2)
    ),

    ema: Number(
      (price * (0.97 + (index % 8) / 100)).toFixed(2)
    ),

    macd: Number(
      (-3 + (index % 60) * 0.1).toFixed(2)
    ),

    dayHigh: Number(
      (price * 1.05).toFixed(2)
    ),

    dayLow: Number(
      (price * 0.95).toFixed(2)
    ),

    week52High: Number(
      (price * 1.3).toFixed(2)
    ),

    week52Low: Number(
      (price * 0.7).toFixed(2)
    ),

    // ================= EXTRA FUNDAMENTALS =================

    averageVolume: Math.round(
      stock.volume *
      (1 + (index % 20) / 100)
    ),

    bookValue: Number(
      (price * (0.4 + (index % 10) / 20)).toFixed(2)
    ),

    pegRatio: Number(
      (0.8 + (index % 20) * 0.08).toFixed(2)
    ),

    freeCashFlow: Math.round(
      stock.marketCap *
      (0.001 + (index % 10) / 10000)
    ),

    revenue: Math.round(
      stock.marketCap *
      (0.15 + (index % 10) / 100)
    ),

    netIncome: Math.round(
      stock.marketCap *
      (0.03 + (index % 10) / 1000)
    ),

    grossMargin: Number(
      (25 + (index % 40) * 1.2).toFixed(2)
    ),

    operatingMargin: Number(
      (10 + (index % 30) * 0.8).toFixed(2)
    ),
  };
}


// =====================================================
// GENERATE 5,000 STOCKS
// =====================================================

function generate5000Stocks(): ExtendedStock[] {

  const stocks: ExtendedStock[] = [];

  for (let i = 0; i < 5000; i++) {

    const baseStock =
      BASE_STOCKS[i % BASE_STOCKS.length];

    const stock = generateExtendedStock(
      {
        ...baseStock,

        symbol:
          `${baseStock.symbol}${i + 1}`,

        company:
          `${baseStock.company} ${i + 1}`,
      },
      i
    );

    stocks.push(stock);
  }

  return stocks;
}


// =====================================================
// NUMERIC FILTER KEYS
// =====================================================

type NumericStockKey =
  | "price"
  | "change"
  | "volume"
  | "marketCap"
  | "pe"
  | "eps"
  | "dividendYield"
  | "beta"
  | "roe"
  | "roa"
  | "debtToEquity"
  | "currentRatio"
  | "profitMargin"
  | "revenueGrowth"
  | "earningsGrowth"
  | "volatility"
  | "rsi"
  | "sma"
  | "ema"
  | "macd"
  | "dayHigh"
  | "dayLow"
  | "week52High"
  | "week52Low";


// =====================================================
// FILTER CONFIG
// =====================================================

const FILTER_CONFIG: NumericStockKey[] = [

  "price",
  "change",
  "volume",
  "marketCap",

  "pe",
  "eps",
  "dividendYield",
  "beta",

  "roe",
  "roa",
  "debtToEquity",
  "currentRatio",

  "profitMargin",
  "revenueGrowth",
  "earningsGrowth",
  "volatility",

  "rsi",
  "sma",
  "ema",
  "macd",

  "dayHigh",
  "dayLow",

  "week52High",
  "week52Low",
];


// =====================================================
// FILTER VALUE TYPE
// =====================================================

type NumericFilterValues =
  Partial<Record<NumericStockKey, number>>;


// =====================================================
// EMPTY FILTERS
// =====================================================

function createEmptyFilters(): FilterState {
  return {
    priceMin: "",
    priceMax: "",

    changeMin: "",
    changeMax: "",

    volumeMin: "",
    volumeMax: "",

    marketCapMin: "",
    marketCapMax: "",

    peMin: "",
    peMax: "",

    epsMin: "",
    epsMax: "",

    dividendYieldMin: "",
    dividendYieldMax: "",

    betaMin: "",
    betaMax: "",

    roeMin: "",
    roeMax: "",

    roaMin: "",
    roaMax: "",

    debtToEquityMin: "",
    debtToEquityMax: "",

    currentRatioMin: "",
    currentRatioMax: "",

    profitMarginMin: "",
    profitMarginMax: "",

    revenueGrowthMin: "",
    revenueGrowthMax: "",

    earningsGrowthMin: "",
    earningsGrowthMax: "",

    volatilityMin: "",
    volatilityMax: "",

    rsiMin: "",
    rsiMax: "",

    smaMin: "",
    smaMax: "",

    emaMin: "",
    emaMax: "",

    macdMin: "",
    macdMax: "",

    dayHighMin: "",
    dayHighMax: "",

    dayLowMin: "",
    dayLowMax: "",

    week52HighMin: "",
     week52HighMax: "",

     week52LowMin: "",
      week52LowMax: "",
    averageVolumeMin: "",
    averageVolumeMax: "",

    bookValueMin: "",
    bookValueMax: "",

    pegRatioMin: "",
    pegRatioMax: "",

    freeCashFlowMin: "",
    freeCashFlowMax: "",

    revenueMin: "",
    revenueMax: "",

    netIncomeMin: "",
    netIncomeMax: "",

    grossMarginMin: "",
    grossMarginMax: "",

    operatingMarginMin: "",
    operatingMarginMax: "",
  };
}


// =====================================================
// FILTER KEY MAP
// =====================================================

const FILTER_KEY_MAP: Record<
  NumericStockKey,
  {
    min: keyof FilterState;
    max: keyof FilterState;
  }
> = {

  price: {
    min: "priceMin",
    max: "priceMax",
  },

  change: {
    min: "changeMin",
    max: "changeMax",
  },

  volume: {
    min: "volumeMin",
    max: "volumeMax",
  },

  marketCap: {
    min: "marketCapMin",
    max: "marketCapMax",
  },

  pe: {
    min: "peMin",
    max: "peMax",
  },

  eps: {
    min: "epsMin",
    max: "epsMax",
  },

  dividendYield: {
    min: "dividendYieldMin",
    max: "dividendYieldMax",
  },

  beta: {
    min: "betaMin",
    max: "betaMax",
  },

  roe: {
    min: "roeMin",
    max: "roeMax",
  },

  roa: {
    min: "roaMin",
    max: "roaMax",
  },

  debtToEquity: {
    min: "debtToEquityMin",
    max: "debtToEquityMax",
  },

  currentRatio: {
    min: "currentRatioMin",
    max: "currentRatioMax",
  },

  profitMargin: {
    min: "profitMarginMin",
    max: "profitMarginMax",
  },

  revenueGrowth: {
    min: "revenueGrowthMin",
    max: "revenueGrowthMax",
  },

  earningsGrowth: {
    min: "earningsGrowthMin",
    max: "earningsGrowthMax",
  },

  volatility: {
    min: "volatilityMin",
    max: "volatilityMax",
  },

  rsi: {
    min: "rsiMin",
    max: "rsiMax",
  },

  sma: {
    min: "smaMin",
    max: "smaMax",
  },

  ema: {
    min: "emaMin",
    max: "emaMax",
  },

  macd: {
    min: "macdMin",
    max: "macdMax",
  },

  dayHigh: {
    min: "dayHighMin",
    max: "dayHighMax",
  },

  dayLow: {
    min: "dayLowMin",
    max: "dayLowMax",
  },

 week52High: {
  min: "week52HighMin",
  max: "week52HighMax",
},

week52Low: {
  min: "week52LowMin",
  max: "week52LowMax",
},

};


// =====================================================
// MAIN COMPONENT
// =====================================================

export default function Home() {

  useWebSocket();

  const {
    stocks,
    selectedStock,
    setStocks,
    selectStock,
    startLiveUpdates,
    stopLiveUpdates,
  } = useStockStore();
  // ===================================================
  // UI STATE
  // ===================================================

  const [search, setSearch] =
    useState("");

  const [country, setCountry] =
    useState("All");

  const [sector, setSector] =
    useState("All");

  // Important:
  // string is used because StockFilters expects
  // (value: string) => void
  const [trend, setTrend] =
    useState<string>("All");

 const [filters, setFilters] = useState<FilterState>(
  createEmptyFilters()
);

const [showFilters, setShowFilters] = useState(true);
  const [filterTime, setFilterTime] =
    useState(0);


  // ===================================================
  // LOAD 5,000 STOCKS
  // ===================================================

  useEffect(() => {

    if (stocks.length === 0) {

      const generatedStocks =
        generate5000Stocks();

      setStocks(generatedStocks);
    }

  }, [
    stocks.length,
    setStocks,
  ]);


  // ===================================================
  // LIVE UPDATES
  // ===================================================




  // ===================================================
  // SECTORS
  // ===================================================

  const sectors = useMemo(() => {

    const uniqueSectors =
      new Set<string>();

    stocks.forEach((stock) => {
      uniqueSectors.add(stock.sector);
    });

    return [
      "All",
      ...Array.from(uniqueSectors),
    ];

  }, [stocks]);


  // ===================================================
  // CONVERT FILTER VALUES ONLY ONCE
  // ===================================================

  const numericFilterValues =
    useMemo(() => {

      const min:
        NumericFilterValues = {};

      const max:
        NumericFilterValues = {};

      for (const key of FILTER_CONFIG) {

        const config =
          FILTER_KEY_MAP[key];

        const minRaw =
          filters[config.min];

        const maxRaw =
          filters[config.max];


        if (
          typeof minRaw === "string" &&
          minRaw.trim() !== ""
        ) {

          const value =
            Number(minRaw);

          if (!Number.isNaN(value)) {
            min[key] = value;
          }
        }


        if (
          typeof maxRaw === "string" &&
          maxRaw.trim() !== ""
        ) {

          const value =
            Number(maxRaw);

          if (!Number.isNaN(value)) {
            max[key] = value;
          }
        }
      }

      return {
        min,
        max,
      };

    }, [filters]);


  // ===================================================
  // FILTER STOCKS
  // ===================================================

  const filterResult =
    useMemo(() => {

      const start =
        performance.now();


      const result =
        stocks.filter((stock) => {

          // ===========================
          // SEARCH
          // ===========================

          if (search.trim() !== "") {

            const query =
              search
                .trim()
                .toLowerCase();

            const matchesSearch =
              stock.symbol
                .toLowerCase()
                .includes(query) ||

              stock.company
                .toLowerCase()
                .includes(query);

            if (!matchesSearch) {
              return false;
            }
          }


          // ===========================
          // COUNTRY
          // ===========================

          if (
            country !== "All" &&
            stock.country !== country
          ) {
            return false;
          }


          // ===========================
          // SECTOR
          // ===========================

          if (
            sector !== "All" &&
            stock.sector !== sector
          ) {
            return false;
          }


          // ===========================
          // TREND
          // ===========================

          if (
            trend === "Gainers" &&
            stock.change <= 0
          ) {
            return false;
          }

          if (
            trend === "Losers" &&
            stock.change >= 0
          ) {
            return false;
          }


          // ===========================
          // NUMERIC FILTERS
          // ===========================

          for (const key of FILTER_CONFIG) {

            const min =
              numericFilterValues.min[key];

            const max =
              numericFilterValues.max[key];

            const value =
              stock[key] as number;


            if (
              min !== undefined &&
              value < min
            ) {
              return false;
            }


            if (
              max !== undefined &&
              value > max
            ) {
              return false;
            }
          }


          return true;
        });


      const end =
        performance.now();


      return {
        result,
        executionTime:
          end - start,
      };

    }, [
      stocks,
      search,
      country,
      sector,
      trend,
      numericFilterValues,
    ]);


  // ===================================================
  // UPDATE PERFORMANCE TIME
  // ===================================================

  useEffect(() => {

    setFilterTime(
      filterResult.executionTime
    );

  }, [
    filterResult.executionTime,
  ]);


  const filteredStocks =
    filterResult.result;


  // ===================================================
  // PERFORMANCE STATUS
  // ===================================================

  const performanceStatus =
    filterTime < 200
      ? "PASS"
      : "NEEDS OPTIMIZATION";


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <main className="min-h-screen bg-slate-50">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-6 py-6">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Real-Time Stock Screener
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                India + USA • 5,000 Stocks
              </p>

            </div>


            <div className="flex items-center gap-3">

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                ● LIVE
              </span>

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  performanceStatus === "PASS"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                Filter: {filterTime.toFixed(2)} ms
              </span>

            </div>

          </div>

        </div>

      </header>


      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="mx-auto max-w-7xl px-6 py-6">


        {/* =================================================
            SUMMARY
        ================================================= */}

         <StockSummary
           totalStocks={stocks.length}
           filteredStocks={filteredStocks.length}
           technicalIndicators={5}
           liveUpdates="LIVE"
/>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="mt-6">

          <StockFilters
  search={search}
  setSearch={setSearch}
  country={country}
  setCountry={setCountry}
  sector={sector}
  setSector={setSector}
  trend={trend}
  setTrend={setTrend}
  filters={filters}
  showFilters={showFilters}
  setShowFilters={setShowFilters}
  updateFilter={(key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }}
  resetFilters={() => {
    setFilters(createEmptyFilters());
  }}
  sectors={sectors}
/>
        </div>


        {/* =================================================
            PERFORMANCE INFO
        ================================================= */}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Performance Benchmark
              </h2>

              <p className="text-sm text-slate-500">
                Filtering {stocks.length.toLocaleString()} stock records
              </p>

            </div>


            <div className="flex items-center gap-4">

              <div>

                <p className="text-xs text-slate-500">
                  Execution Time
                </p>

                <p className="text-2xl font-bold text-blue-600">
                  {filterTime.toFixed(2)} ms
                </p>

              </div>


              <div
                className={`rounded-lg px-4 py-2 text-sm font-bold ${
                  performanceStatus === "PASS"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {performanceStatus}
              </div>

            </div>

          </div>


          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className={`h-full rounded-full ${
                filterTime < 200
                  ? "bg-green-500"
                  : "bg-orange-500"
              }`}
              style={{
                width: `${Math.min(
                  (filterTime / 200) * 100,
                  100
                )}%`,
              }}
            />

          </div>


          <p className="mt-2 text-xs text-slate-500">
            Target: under 200 ms for 5,000 stock records.
          </p>

        </div>


        {/* =================================================
            SELECTED STOCK DETAILS
        ================================================= */}

        {selectedStock && (

          <div className="mt-6">

            <StockDetails
              stock={selectedStock}
            />

          </div>

        )}


        {/* =================================================
            TECHNICAL INDICATORS
        ================================================= */}

        {selectedStock && (

          <div className="mt-6">

            <TechnicalIndicators
              stock={selectedStock}
            />

          </div>

        )}


        {/* =================================================
            SIMPLE PRICE CHART
        ================================================= */}

        {selectedStock && (

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  {selectedStock.symbol}
                </h2>

                <p className="text-sm text-slate-500">
                  {selectedStock.company}
                </p>

              </div>


              <div className="text-right">

                <p className="text-2xl font-bold text-slate-900">
                  ${selectedStock.price.toFixed(2)}
                </p>

                <p
                  className={`text-sm font-semibold ${
                    selectedStock.change >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedStock.change >= 0
                    ? "+"
                    : ""}
                  {selectedStock.change.toFixed(2)}%
                </p>

              </div>

            </div>


            <SimpleStockChart
              stock={selectedStock}
            />

          </div>

        )}


        {/* =================================================
            STOCK TABLE
        ================================================= */}

        <div className="mt-6">

          <StockTable
            stocks={filteredStocks}
            selectedStock={selectedStock}
            onSelectStock={selectStock}
          />

        </div>


      </div>

    </main>
  );
}


// =====================================================
// SIMPLE STOCK CHART
// =====================================================

function SimpleStockChart({
  stock,
}: {
  stock: ExtendedStock;
}) {

  const points =
    Array.from(
      { length: 30 },
      (_, index) => {

        const wave =
          Math.sin(index / 2.5) * 0.03;

        const trend =
          index * 0.002;

        const value =
          stock.price *
          (
            1 +
            wave +
            trend
          );

        return value;
      }
    );


  const width = 900;
  const height = 320;

  const padding = 30;

  const min =
    Math.min(...points);

  const max =
    Math.max(...points);

  const range =
    max - min || 1;


  const coordinates =
    points.map(
      (value, index) => {

        const x =
          padding +
          (index /
            (points.length - 1)) *
          (width - padding * 2);

        const y =
          height -
          padding -
          ((value - min) / range) *
          (height - padding * 2);

        return {
          x,
          y,
        };
      }
    );


  const linePath =
    coordinates
      .map(
        (point, index) =>
          `${index === 0 ? "M" : "L"} ${
            point.x
          } ${
            point.y
          }`
      )
      .join(" ");


  const areaPath =
    `${linePath} L ${
      coordinates[
        coordinates.length - 1
      ].x
    } ${height - padding} L ${
      coordinates[0].x
    } ${height - padding} Z`;


  return (

    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[320px] w-full"
        preserveAspectRatio="none"
      >

        <defs>

          <linearGradient
            id="stockAreaGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >

            <stop
              offset="0%"
              stopOpacity="0.25"
            />

            <stop
              offset="100%"
              stopOpacity="0"
            />

          </linearGradient>

        </defs>


        {/* GRID */}

        {[0, 1, 2, 3, 4].map(
          (index) => {

            const y =
              padding +
              (index / 4) *
              (height - padding * 2);

            return (

              <line
                key={index}
                x1={padding}
                x2={width - padding}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />

            );
          }
        )}


        {/* AREA */}

        <path
          d={areaPath}
          fill="url(#stockAreaGradient)"
        />


        {/* LINE */}

        <path
          d={linePath}
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* CURRENT PRICE */}

        <line
          x1={padding}
          x2={width - padding}
          y1={
            coordinates[
              coordinates.length - 1
            ].y
          }
          y2={
            coordinates[
              coordinates.length - 1
            ].y
          }
          stroke="#16a34a"
          strokeDasharray="6 6"
          strokeWidth="2"
        />


        <circle
          cx={
            coordinates[
              coordinates.length - 1
            ].x
          }
          cy={
            coordinates[
              coordinates.length - 1
            ].y
          }
          r="7"
          fill="#16a34a"
        />

      </svg>

    </div>
  );
}