"use client";

import { useEffect, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { ExtendedStock } from "../store/stockStore";

type StockTableProps = {
  stocks: ExtendedStock[];
  selectedStock: ExtendedStock | null;
  onSelectStock: (stock: ExtendedStock) => void;
};

const columnHelper = createColumnHelper<ExtendedStock>();

const columns = [
  columnHelper.accessor("symbol", {
    header: "Symbol",
    cell: (info) => (
      <div>
        <div className="font-bold text-slate-900">
          {info.getValue()}
        </div>
        <div className="truncate text-xs text-slate-500">
          {info.row.original.company}
        </div>
      </div>
    ),
  }),

  columnHelper.accessor("country", {
    header: "Country",
    cell: (info) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          info.getValue() === "India"
            ? "bg-orange-100 text-orange-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("sector", {
    header: "Sector",
    cell: (info) => (
      <span className="truncate text-slate-600">
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => (
      <span className="font-semibold text-slate-900">
        ₹{info.getValue().toFixed(2)}
      </span>
    ),
  }),

  columnHelper.accessor("change", {
    header: "Change",
    cell: (info) => {
      const value = info.getValue();

      return (
        <span
          className={`font-bold ${
            value >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {value >= 0 ? "+" : ""}
          {value.toFixed(2)}%
        </span>
      );
    },
  }),

  columnHelper.accessor("volume", {
    header: "Volume",
    cell: (info) => (
      <span className="text-slate-600">
        {info.getValue().toLocaleString()}
      </span>
    ),
  }),

  columnHelper.accessor("marketCap", {
    header: "Market Cap",
    cell: (info) => (
      <span className="text-slate-600">
        ₹{(info.getValue() / 10000000).toFixed(1)} Cr
      </span>
    ),
  }),

  columnHelper.accessor("pe", {
    header: "P/E",
    cell: (info) => (
      <span className="text-slate-600">
        {info.getValue().toFixed(2)}
      </span>
    ),
  }),

  columnHelper.accessor("rsi", {
    header: "RSI",
    cell: (info) => {
      const value = info.getValue();

      return (
        <span
          className={`font-semibold ${
            value > 70
              ? "text-red-600"
              : value < 30
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {value.toFixed(1)}
        </span>
      );
    },
  }),
];

export default function StockTable({
  stocks,
  selectedStock,
  onSelectStock,
}: StockTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const table = useReactTable<ExtendedStock>({
    data: stocks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 10,
  });

  useEffect(() => {
    rowVirtualizer.measure();
  }, [stocks, rowVirtualizer]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">

      {/* HEADER */}
      <div className="border-b border-slate-200 bg-white px-5 py-4">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              📊 Stock Market
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing {stocks.length.toLocaleString()} stocks
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

            <span className="text-xs font-semibold text-green-600">
              LIVE
            </span>
          </div>

        </div>
      </div>

      {/* COLUMN HEADER */}
      <div className="grid grid-cols-[1.3fr_0.8fr_1.1fr_0.8fr_0.8fr_1fr_1fr_0.7fr_0.7fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">

        {table.getHeaderGroups()[0].headers.map(
          (header) => (
            <div key={header.id}>
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
            </div>
          )
        )}

      </div>

      {/* VIRTUALIZED STOCK ROWS */}
      <div
        ref={parentRef}
        className="h-[620px] overflow-auto bg-white"
      >
        <div
          className="relative w-full"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >

          {rowVirtualizer.getVirtualItems().map(
            (virtualRow) => {
              const row = rows[virtualRow.index];
              const stock = row.original;

              const isSelected =
                selectedStock?.symbol === stock.symbol;

              return (
                <div
                  key={row.id}
                  onClick={() => onSelectStock(stock)}
                  className={`absolute left-0 top-0 grid w-full cursor-pointer grid-cols-[1.3fr_0.8fr_1.1fr_0.8fr_0.8fr_1fr_1fr_0.7fr_0.7fr] gap-4 border-b border-slate-100 px-5 py-4 transition-all duration-200 ${
                    isSelected
                      ? "bg-blue-50 ring-1 ring-inset ring-blue-200"
                      : "bg-white hover:bg-slate-50"
                  }`}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >

                  {row.getVisibleCells().map(
                    (cell) => (
                      <div
                        key={cell.id}
                        className="flex min-w-0 items-center"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    )
                  )}

                </div>
              );
            }
          )}

        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">

        <span className="text-xs text-slate-500">
          ⚡ Virtual scrolling enabled
        </span>

        <span className="text-xs font-semibold text-blue-600">
          {rows.length.toLocaleString()} records
        </span>

      </div>

    </div>
  );
}