"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import React, { PureComponent } from "react";

const RandomChart = () => {
  return (
    <ResponsiveContainer
      width={630}
      height={350}
      className="items-center"
    >
      <BarChart
        data={[
          { created_at: "Jan", cost: 0.03 },
          { created_at: "Feb", cost: 0.1 },
          { created_at: "Mar", cost: 0.34 },
          { created_at: "Apr", cost: 0.2 },
          { created_at: "May", cost: 0.23 },
          { created_at: "Jun", cost: 0.2 },
          { created_at: "Jul", cost: 0.53 },
          { created_at: "Aug", cost: 0.21 },
          { created_at: "Sep", cost: 0.12 },
          { created_at: "Oct", cost: 0.56 },
          { created_at: "Nov", cost: 0.35 },
          { created_at: "Dec", cost: 0.34 },
        ]}
        title="Monthly Usage"
      >
        <XAxis
          dataKey="created_at"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="cost" fill="#333333" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RandomChart;
