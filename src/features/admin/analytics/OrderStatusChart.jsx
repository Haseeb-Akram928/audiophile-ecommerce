import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = {
  pending: "#f59e0b",     // Amber
  confirmed: "#3b82f6",   // Blue
  processing: "#8b5cf6",  // Purple
  shipped: "#06b6d4",     // Cyan
  delivered: "#10b981",   // Emerald
  cancelled: "#ef4444",   // Red
  refunded: "#64748b"     // Slate
};

function OrderStatusChart({ data }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: "var(--admin-bg-primary)",
          border: "1px solid var(--border-color)",
          padding: "10px",
          borderRadius: "6px"
        }}>
          <p style={{ margin: 0, fontWeight: "bold", color: "#fff", textTransform: 'capitalize' }}>
            {payload[0].name}
          </p>
          <p style={{ margin: "4px 0 0", color: "#a1a1aa" }}>
            Orders: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={5}
          dataKey="value"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#8884d8"} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', textTransform: 'capitalize' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default OrderStatusChart;
