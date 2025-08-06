"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { utils } from "@/lib/utils";

interface TotalUsersChartProps {
  loading?: boolean;
  data: {
    time: string;
    product_sales: number;
    session_sales: number;
    total_sales: number;
  }[];
}
export default function SubscriptionSalesChart({
  loading,
  data,
}: TotalUsersChartProps) {
  data = [
    {
      time: "2025-08-06T22:59:00.000Z", // 10:59 PM
      product_sales: 2900,
      session_sales: 2100,
      total_sales: 5000,
    },
    {
      time: "2025-08-06T23:59:00.000Z",
      product_sales: 1100,
      session_sales: 5000,
      total_sales: 6100,
    },
    {
      time: "2025-08-07T00:59:00.000Z",
      product_sales: 2400,
      session_sales: 3250,
      total_sales: 3650,
    },
    {
      time: "2025-08-07T01:59:00.000Z",
      product_sales: 3600,
      session_sales: 5700,
      total_sales: 7300,
    },
    {
      time: "2025-08-07T02:59:00.000Z",
      product_sales: 4200,
      session_sales: 3400,
      total_sales: 7600,
    },
    {
      time: "2025-08-07T03:59:00.000Z",
      product_sales: 6100, // Matches $7,357 tooltip
      session_sales: 5500, // Matches $6,987 tooltip
      total_sales: 11600,
    },
    {
      time: "2025-08-07T04:59:00.000Z",
      product_sales: 4800,
      session_sales: 5000,
      total_sales: 9800,
    },
    {
      time: "2025-08-07T05:59:00.000Z",
      product_sales: 5200,
      session_sales: 4700,
      total_sales: 9900,
    },
    {
      time: "2025-08-07T06:59:00.000Z",
      product_sales: 5400,
      session_sales: 4900,
      total_sales: 10300,
    },
    {
      time: "2025-08-07T07:59:00.000Z",
      product_sales: 5800,
      session_sales: 5100,
      total_sales: 10900,
    },
  ];

  // Colors for each line
  const COLORS = {
    product: "#FFD600", // yellow
    session: "#00BFFF", // blue
    total: "#FFA500", // orange
  };

  // SVG filters for glow effect
  const GLOW_FILTERS = (
    <defs>
      <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );

  return (
    <div className="space-y-4">
      <div className="w-full flex justify-between items-center pb-3 border-b border-[#2121211C]">
        <h2 className="text-dark text-2xl font-general-semibold">Sales</h2>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{
              background: COLORS.product,
              boxShadow: "0 0 12px 2px #FFD60088",
            }}
          ></div>
          <span className="text-sm" style={{ color: COLORS.product }}>
            Product Sales
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{
              background: COLORS.session,
              boxShadow: "0 0 12px 2px #00BFFF88",
            }}
          ></div>
          <span className="text-sm" style={{ color: COLORS.session }}>
            Session Sales
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{
              background: COLORS.total,
              boxShadow: "0 0 12px 2px #FFA50088",
            }}
          ></div>
          <span className="text-sm" style={{ color: COLORS.total }}>
            Total Sales
          </span>
        </div>
      </div>

      <div className="h-[320px] w-full bg-[#232329] rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            {GLOW_FILTERS}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#444"
            />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#fff" }}
              tickFormatter={utils.formatTimeTo12Hour}
            />
            <YAxis
              domain={[0, "auto"]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#fff" }}
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `${(value / 1000000).toFixed(1)}M`;
                } else if (value >= 1000) {
                  return `${(value / 1000).toFixed(0)}K`;
                }
                return value;
              }}
            />
            <Tooltip
              contentStyle={{
                background: "#232329",
                border: "none",
                color: "#fff",
              }}
              labelFormatter={utils.formatTimeTo12Hour}
              formatter={(value) => {
                const val = Number(value);
                if (val >= 1_000_000) {
                  return [`${(val / 1_000_000).toFixed(1)}M`, ""];
                } else if (val >= 1000) {
                  return [`${(val / 1000).toFixed(0)}K`, ""];
                }
                return [val, ""];
              }}
            />
            {/* <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              formatter={(value) => {
                if (value === "product_sales") return <span style={{ color: COLORS.product }}>Product Sales</span>;
                if (value === "session_sales") return <span style={{ color: COLORS.session }}>Session Sales</span>;
                if (value === "total_sales") return <span style={{ color: COLORS.total }}>Total Sales</span>;
                return value;
              }}
            /> */}
            <Line
              type="monotone"
              dataKey="product_sales"
              stroke={COLORS.product}
              strokeWidth={3}
              dot={false}
              filter="url(#glow-yellow)"
              activeDot={{
                r: 7,
                fill: COLORS.product,
                filter: "url(#glow-yellow)",
              }}
            />
            <Line
              type="monotone"
              dataKey="session_sales"
              stroke={COLORS.session}
              strokeWidth={3}
              dot={false}
              filter="url(#glow-blue)"
              activeDot={{
                r: 7,
                fill: COLORS.session,
                filter: "url(#glow-blue)",
              }}
            />
            <Line
              type="monotone"
              dataKey="total_sales"
              stroke={COLORS.total}
              strokeWidth={3}
              dot={false}
              filter="url(#glow-orange)"
              activeDot={{
                r: 7,
                fill: COLORS.total,
                filter: "url(#glow-orange)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
