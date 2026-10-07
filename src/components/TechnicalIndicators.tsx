"use client";

import type { ExtendedStock } from "../store/stockStore";

type TechnicalIndicatorsProps = {
  stock: ExtendedStock | null;
};

type Indicator = {
  name: string;
  value: string;
  description: string;
  color: string;
  background: string;
  icon: string;
};

export default function TechnicalIndicators({
  stock,
}: TechnicalIndicatorsProps) {
  if (!stock) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg,#0f172a,#111827)",
          border: "1px solid #334155",
          borderRadius: "18px",
          padding: "24px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#f8fafc",
            fontSize: "22px",
            fontWeight: 800,
          }}
        >
          📊 Technical Indicators
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "8px",
          }}
        >
          Select a stock to view technical indicators.
        </p>
      </div>
    );
  }

  const bollingerMiddle = stock.sma;

  const bollingerUpper =
    bollingerMiddle + stock.volatility;

  const bollingerLower =
    Math.max(0, bollingerMiddle - stock.volatility);

  const indicators: Indicator[] = [
    {
      name: "SMA",
      value: stock.sma.toFixed(2),
      description: "Simple Moving Average",
      color: "#38bdf8",
      background: "rgba(14,165,233,0.12)",
      icon: "📈",
    },
    {
      name: "EMA",
      value: stock.ema.toFixed(2),
      description: "Exponential Moving Average",
      color: "#a78bfa",
      background: "rgba(139,92,246,0.12)",
      icon: "📉",
    },
    {
      name: "RSI",
      value: stock.rsi.toFixed(2),
      description:
        stock.rsi >= 70
          ? "Overbought"
          : stock.rsi <= 30
            ? "Oversold"
            : "Neutral",
      color:
        stock.rsi >= 70
          ? "#f87171"
          : stock.rsi <= 30
            ? "#4ade80"
            : "#fbbf24",
      background:
        stock.rsi >= 70
          ? "rgba(239,68,68,0.12)"
          : stock.rsi <= 30
            ? "rgba(34,197,94,0.12)"
            : "rgba(245,158,11,0.12)",
      icon: "⚡",
    },
    {
      name: "MACD",
      value: stock.macd.toFixed(2),
      description:
        stock.macd >= 0
          ? "Bullish Momentum"
          : "Bearish Momentum",
      color:
        stock.macd >= 0 ? "#4ade80" : "#f87171",
      background:
        stock.macd >= 0
          ? "rgba(34,197,94,0.12)"
          : "rgba(239,68,68,0.12)",
      icon: "📊",
    },
    {
      name: "Bollinger Bands",
      value: `${bollingerLower.toFixed(2)} - ${bollingerUpper.toFixed(2)}`,
      description: "Lower - Upper Range",
      color: "#f472b6",
      background: "rgba(236,72,153,0.12)",
      icon: "🎯",
    },
  ];

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg,#0f172a 0%,#111827 55%,#172554 100%)",
        border: "1px solid #334155",
        borderRadius: "18px",
        padding: "24px",
        marginBottom: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#f8fafc",
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            📊 Technical Indicators
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#94a3b8",
              fontSize: "13px",
            }}
          >
            Technical analysis for{" "}
            <span style={{ color: "#60a5fa", fontWeight: 700 }}>
              {stock.symbol}
            </span>
          </p>
        </div>

        <div
          style={{
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(96,165,250,0.25)",
            color: "#60a5fa",
            padding: "8px 12px",
            borderRadius: "9px",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          5 Indicators
        </div>
      </div>

      {/* INDICATOR CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {indicators.map((indicator) => (
          <div
            key={indicator.name}
            style={{
              background:
                "linear-gradient(135deg,#111827,#020617)",
              border: "1px solid #334155",
              borderRadius: "14px",
              padding: "16px",
              transition: "transform 0.2s ease",
            }}
          >
            {/* ICON + NAME */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  color: "#cbd5e1",
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                {indicator.name}
              </div>

              <div
                style={{
                  background: indicator.background,
                  border: `1px solid ${indicator.color}40`,
                  borderRadius: "8px",
                  padding: "6px",
                  fontSize: "15px",
                }}
              >
                {indicator.icon}
              </div>
            </div>

            {/* VALUE */}
            <div
              style={{
                color: indicator.color,
                fontSize:
                  indicator.name === "Bollinger Bands"
                    ? "16px"
                    : "24px",
                fontWeight: 800,
                marginBottom: "7px",
              }}
            >
              {indicator.value}
            </div>

            {/* DESCRIPTION */}
            <div
              style={{
                color: "#64748b",
                fontSize: "11px",
                lineHeight: 1.4,
              }}
            >
              {indicator.description}
            </div>
          </div>
        ))}
      </div>

      {/* SIGNAL BAR */}
      <div
        style={{
          marginTop: "18px",
          background: "#020617",
          border: "1px solid #334155",
          borderRadius: "12px",
          padding: "14px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <span
            style={{
              color: "#94a3b8",
              fontSize: "13px",
            }}
          >
            Overall Signal
          </span>

          <span
            style={{
              color:
                stock.macd >= 0
                  ? "#4ade80"
                  : "#f87171",
              fontWeight: 800,
              fontSize: "14px",
            }}
          >
            {stock.macd >= 0
              ? "🟢 Bullish Momentum"
              : "🔴 Bearish Momentum"}
          </span>
        </div>
      </div>
    </div>
  );
}