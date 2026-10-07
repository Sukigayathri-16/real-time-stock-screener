import { create } from "zustand";

export type Stock = {
  symbol: string;
  company: string;
  country: "India" | "USA";
  sector: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  pe: number;
  eps: number;
};

export type ExtendedStock = Stock & {
  dividendYield: number;
  beta: number;
  roe: number;
  roa: number;
  debtToEquity: number;
  currentRatio: number;
  profitMargin: number;
  revenueGrowth: number;
  earningsGrowth: number;
  volatility: number;
  rsi: number;
  sma: number;
  ema: number;
  macd: number;
  dayHigh: number;
  dayLow: number;
  week52High: number;
  week52Low: number;
  averageVolume: number;
  bookValue: number;
  pegRatio: number;
  freeCashFlow: number;
  revenue: number;
  netIncome: number;
  grossMargin: number;
  operatingMargin: number;
};

type StockStore = {
  stocks: ExtendedStock[];
  selectedStock: ExtendedStock | null;

  setStocks: (stocks: ExtendedStock[]) => void;

  updateStock: (
    symbol: string,
    updatedStock: Partial<ExtendedStock>
  ) => void;

  selectStock: (stock: ExtendedStock | null) => void;

  startLiveUpdates: () => void;
  stopLiveUpdates: () => void;
};

let liveUpdateTimer: ReturnType<typeof setInterval> | null = null;

export const useStockStore = create<StockStore>((set, get) => ({
  stocks: [],

  selectedStock: null,

  setStocks: (stocks) => {
    set({
      stocks,
    });
  },

  updateStock: (symbol, updatedStock) => {
    set((state) => {
      const updatedStocks = state.stocks.map((stock) =>
        stock.symbol === symbol
          ? {
              ...stock,
              ...updatedStock,
            }
          : stock
      );

      const selectedSymbol = state.selectedStock?.symbol;

      const updatedSelected =
        selectedSymbol === symbol
          ? updatedStocks.find(
              (stock) => stock.symbol === selectedSymbol
            ) ?? state.selectedStock
          : state.selectedStock;

      return {
        stocks: updatedStocks,
        selectedStock: updatedSelected,
      };
    });
  },

  selectStock: (stock) => {
    set({
      selectedStock: stock,
    });
  },

  startLiveUpdates: () => {
    if (liveUpdateTimer !== null) {
      return;
    }

    console.log("🟢 WebSocket simulation started");

    liveUpdateTimer = setInterval(() => {
      const currentStocks = get().stocks;

      if (currentStocks.length === 0) {
        return;
      }

      /*
       * Simulated WebSocket:
       * Only 50 stocks receive live updates
       * every 2 seconds.
       */

      const updateCount = Math.min(50, currentStocks.length);

      const indexes = new Set<number>();

      while (indexes.size < updateCount) {
        indexes.add(
          Math.floor(Math.random() * currentStocks.length)
        );
      }

      set((state) => {
        const updatedStocks = [...state.stocks];

        indexes.forEach((index) => {
          const stock = updatedStocks[index];

          const priceMovement =
            (Math.random() - 0.5) * 2;

          const newPrice = Math.max(
            1,
            stock.price + priceMovement
          );

          const newChange =
            stock.change +
            (Math.random() - 0.5) * 0.5;

          const newVolume = Math.max(
            1000,
            stock.volume +
              Math.floor(
                (Math.random() - 0.5) * 100000
              )
          );

          const newDayHigh = Math.max(
            stock.dayHigh,
            newPrice
          );

          const newDayLow = Math.min(
            stock.dayLow,
            newPrice
          );

          updatedStocks[index] = {
            ...stock,

            price: Number(
              newPrice.toFixed(2)
            ),

            change: Number(
              newChange.toFixed(2)
            ),

            volume: newVolume,

            dayHigh: Number(
              newDayHigh.toFixed(2)
            ),

            dayLow: Number(
              newDayLow.toFixed(2)
            ),

            rsi: Number(
              Math.max(
                0,
                Math.min(
                  100,
                  stock.rsi +
                    (Math.random() - 0.5) * 2
                )
              ).toFixed(2)
            ),

            sma: Number(
              (
                stock.sma +
                (newPrice - stock.sma) * 0.05
              ).toFixed(2)
            ),

            ema: Number(
              (
                stock.ema +
                (newPrice - stock.ema) * 0.1
              ).toFixed(2)
            ),

            macd: Number(
              (
                stock.macd +
                (Math.random() - 0.5) * 0.1
              ).toFixed(2)
            ),
          };
        });

        const selectedSymbol =
          state.selectedStock?.symbol;

        const updatedSelectedStock =
          selectedSymbol
            ? updatedStocks.find(
                (stock) =>
                  stock.symbol === selectedSymbol
              ) ?? state.selectedStock
            : null;

        return {
          stocks: updatedStocks,

          selectedStock:
            updatedSelectedStock,
        };
      });
    }, 2000);
  },

  stopLiveUpdates: () => {
    if (liveUpdateTimer !== null) {
      clearInterval(liveUpdateTimer);

      liveUpdateTimer = null;

      console.log(
        "🔴 WebSocket simulation stopped"
      );
    }
  },
}));