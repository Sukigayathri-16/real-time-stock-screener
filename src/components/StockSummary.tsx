"use client";

type StockSummaryProps = {
  totalStocks: number;
  filteredStocks: number;
  technicalIndicators: number;
  liveUpdates: string;
};

export default function StockSummary({
  totalStocks,
  filteredStocks,
  technicalIndicators,
  liveUpdates,
}: StockSummaryProps) {
  const cards = [
    {
      title: "Total Stocks",
      value: totalStocks.toLocaleString(),
      icon: "📊",
      color: "#38bdf8",
      background: "rgba(14,165,233,0.12)",
      border: "rgba(56,189,248,0.25)",
    },
    {
      title: "Filtered Stocks",
      value: filteredStocks.toLocaleString(),
      icon: "🔎",
      color: "#a78bfa",
      background: "rgba(139,92,246,0.12)",
      border: "rgba(167,139,250,0.25)",
    },
    {
      title: "Technical Indicators",
      value: technicalIndicators,
      icon: "📈",
      color: "#fbbf24",
      background: "rgba(245,158,11,0.12)",
      border: "rgba(251,191,36,0.25)",
    },
    {
      title: "Live Updates",
      value: liveUpdates,
      icon: "🟢",
      color: "#4ade80",
      background: "rgba(34,197,94,0.12)",
      border: "rgba(74,222,128,0.25)",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background:
              "linear-gradient(135deg,#111827 0%,#0f172a 100%)",
            border: `1px solid ${card.border}`,
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {card.title}
            </span>

            <span
              style={{
                background: card.background,
                border: `1px solid ${card.border}`,
                borderRadius: "10px",
                padding: "8px",
                fontSize: "18px",
              }}
            >
              {card.icon}
            </span>
          </div>

          <div
            style={{
              color: card.color,
              fontSize: "28px",
              fontWeight: "800",
            }}
          >
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}