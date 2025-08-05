"use client";

import React from "react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "rc-select/assets/index.css";
import { analyticsHooks } from "@/hooks/useAnalyticsRequests";
import { toast } from "react-toastify";

interface TotalUsersChartProps {
  loading?: boolean;
  data: { year: string; total_sales: number }[];
}

export default function TotalUsersChart({
  loading,
  data,
}: TotalUsersChartProps) {
  // Generate last 10 years including current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <div className="space-y-4">
      <div className="w-full flex justify-between items-center pb-3 border-b border-[#2121211C]"></div>
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-[4px] bg-[#CAFF8A]"></div>
          <span className="text-sm">Sales</span>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barCategoryGap={32}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={[0, "auto"]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
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
              formatter={(value) => {
                if (Number(value) >= 1000000) {
                  return [`${(Number(value) / 1000000).toFixed(1)}M`, "Sales"];
                }
                return [value, "Sales"];
              }}
            />
            <Bar dataKey="total_sales" fill="#C0F765" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
