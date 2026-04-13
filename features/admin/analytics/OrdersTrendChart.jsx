import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

function OrdersTrendChart({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: "var(--admin-bg-primary)",
          border: "1px solid var(--border-color)",
          padding: "10px",
          borderRadius: "6px"
        }}>
          <p style={{ margin: 0, fontWeight: "bold", color: "#fff" }}>
            {format(parseISO(label), "MMM dd, yyyy")}
          </p>
          <p style={{ margin: "4px 0 0", color: "#8b5cf6" }}>
            Orders: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis 
            dataKey="day" 
            tickFormatter={(str) => {
              const date = parseISO(str);
              return format(date, "MMM dd");
            }}
            stroke="#a1a1aa" 
            fontSize={12} 
            tickMargin={10}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#a1a1aa" 
            fontSize={12} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="order_count" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrdersTrendChart;
