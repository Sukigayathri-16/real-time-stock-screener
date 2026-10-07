"use client";

import { useEffect, useRef } from "react";
import { useStockStore } from "../store/stockStore";

export function useWebSocket() {
  const updateStock = useStockStore((state) => state.updateStock);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    console.log("🟢 Simulated WebSocket Connected");

    timerRef.current = setInterval(() => {
      const store = useStockStore.getState();
      const stocks = store.stocks;

      if (!stocks.length) {
        return;
      }

      // Update only a small batch each cycle
      const updateCount = Math.min(50, stocks.length);

      for (let i = 0; i < updateCount; i++) {
        const randomIndex = Math.floor(Math.random() * stocks.length);
        const stock = stocks[randomIndex];

        if (!stock) {
          continue;
        }

        // Small random price movement
        const movement =
          (Math.random() - 0.5) * Math.max(stock.price * 0.01, 0.5);

        const newPrice = Math.max(
          0.01,
          Number((stock.price + movement).toFixed(2))
        );

        // Calculate percentage change
        const newChange =
          stock.price === 0
            ? 0
            : Number(
                (((newPrice - stock.price) / stock.price) * 100).toFixed(2)
              );

        updateStock(stock.symbol, {
          price: newPrice,
          change: newChange,
        });
      }
    }, 2000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      console.log("🔴 Simulated WebSocket Disconnected");
    };
  }, [updateStock]);
}