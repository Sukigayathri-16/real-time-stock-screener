"use client";

import type { ExtendedStock } from "../store/stockStore";

type StockChartProps = {
  stock: ExtendedStock | null;
};

export default function StockChart({ stock }: StockChartProps) {
  if (!stock) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          color: "#f8fafc",
          padding: "30px",
          borderRadius: "18px",
          marginBottom: "20px",
          border: "1px solid #334155",
        }}
      >
        <h2>📈 Price Chart</h2>
        <p style={{ color: "#94a3b8" }}>
          Select a stock to view the chart.
        </p>
      </div>
    );
  }

  const points = Array.from({ length: 30 }, (_, i) => {
    const wave = Math.sin(i * 0.65) * 35;
    const trend = i * 0.4;

    return {
      x: 60 + i * 48,
      y: 260 - wave - trend,
    };
  });

  const path = points
    .map((point, index) =>
      index === 0
        ? `M ${point.x} ${point.y}`
        : `L ${point.x} ${point.y}`
    )
    .join(" ");

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #020617 0%, #0f172a 55%, #172554 100%)",
        borderRadius: "20px",
        padding: "24px",
        marginBottom: "20px",
        border: "1px solid #334155",
        boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#f8fafc",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            📈 Price Chart
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#94a3b8",
              fontSize: "14px",
            }}
          >
            Simulated market movement for{" "}
            <strong style={{ color: "#60a5fa" }}>
              {stock.symbol}
            </strong>
          </p>
        </div>

        {/* Change */}
        <div
          style={{
            background:
              stock.change >= 0
                ? "rgba(34,197,94,0.15)"
                : "rgba(239,68,68,0.15)",
            border:
              stock.change >= 0
                ? "1px solid rgba(34,197,94,0.35)"
                : "1px solid rgba(239,68,68,0.35)",
            color: stock.change >= 0 ? "#4ade80" : "#f87171",
            padding: "9px 14px",
            borderRadius: "10px",
            fontWeight: 800,
            fontSize: "15px",
          }}
        >
          {stock.change >= 0 ? "+" : ""}
          {stock.change.toFixed(2)}%
        </div>
      </div>

      {/* Price Cards */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            background: "rgba(37,99,235,0.15)",
            border: "1px solid rgba(96,165,250,0.3)",
            padding: "10px 16px",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              color: "#94a3b8",
              fontSize: "11px",
            }}
          >
            CURRENT PRICE
          </div>

          <div
            style={{
              color: "#60a5fa",
              fontSize: "21px",
              fontWeight: 800,
            }}
          >
            ${stock.price.toFixed(2)}
          </div>
        </div>

        <div
          style={{
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(74,222,128,0.25)",
            padding: "10px 16px",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              color: "#94a3b8",
              fontSize: "11px",
            }}
          >
            STATUS
          </div>

          <div
            style={{
              color: "#4ade80",
              fontSize: "18px",
              fontWeight: 800,
            }}
          >
            ● LIVE
          </div>
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          borderRadius: "16px",
        }}
      >
        <svg
          viewBox="0 0 1500 420"
          width="100%"
          height="420"
          style={{
            display: "block",
            minWidth: "900px",
            background:
              "linear-gradient(180deg, #0f172a 0%, #020617 100%)",
            borderRadius: "16px",
          }}
        >
          {/* Glow definition */}
          <defs>
            <linearGradient
              id="areaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#3b82f6"
                stopOpacity="0.35"
              />

              <stop
                offset="100%"
                stopColor="#3b82f6"
                stopOpacity="0"
              />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur
                stdDeviation="4"
                result="coloredBlur"
              />

              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Horizontal Grid */}
          {[80, 150, 220, 290, 360].map((y) => (
            <line
              key={y}
              x1="60"
              x2="1440"
              y1={y}
              y2={y}
              stroke="#334155"
              strokeWidth="1"
              opacity="0.65"
            />
          ))}

          {/* Vertical Grid */}
          {[150, 350, 550, 750, 950, 1150, 1350].map(
            (x) => (
              <line
                key={x}
                x1={x}
                x2={x}
                y1="40"
                y2="380"
                stroke="#1e293b"
                strokeWidth="1"
              />
            )
          )}

          {/* Area */}
          <path
            d={`${path} L 1440 380 L 60 380 Z`}
            fill="url(#areaGradient)"
          />

          {/* Glow Line */}
          <path
            d={path}
            fill="none"
            stroke="#2563eb"
            strokeWidth="8"
            opacity="0.2"
            filter="url(#glow)"
          />

          {/* Main Line */}
          <path
            d={path}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="#2563eb"
                opacity="0.2"
              />

              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#60a5fa"
                stroke="#bfdbfe"
                strokeWidth="1"
              />
            </g>
          ))}

          {/* Current Price Line */}
          <line
            x1="60"
            x2="1440"
            y1={points[points.length - 1].y}
            y2={points[points.length - 1].y}
            stroke="#22c55e"
            strokeWidth="2"
            strokeDasharray="8 6"
            opacity="0.9"
          />

          {/* Current Price Label */}
          <rect
            x="1350"
            y={points[points.length - 1].y - 17}
            width="85"
            height="30"
            rx="7"
            fill="#16a34a"
          />

          <text
            x="1392"
            y={points[points.length - 1].y + 4}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="12"
            fontWeight="800"
          >
            ${stock.price.toFixed(2)}
          </text>

          {/* Y Axis Labels */}
          {[80, 150, 220, 290, 360].map((y, index) => (
            <text
              key={index}
              x="10"
              y={y + 4}
              fill="#64748b"
              fontSize="12"
            >
              {(stock.price + (2 - index) * 10).toFixed(0)}
            </text>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          marginTop: "16px",
          flexWrap: "wrap",
          fontSize: "13px",
        }}
      >
        <span style={{ color: "#60a5fa", fontWeight: 700 }}>
          🔵 Price Movement
        </span>

        <span style={{ color: "#4ade80", fontWeight: 700 }}>
          🟢 Current Price
        </span>

        <span style={{ color: "#94a3b8" }}>
          30 Data Points
        </span>
      </div>
    </div>
  );
}