import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function TopProductsBarChart({ data, dataKey = "total_revenue" }) {
  const formatYAxis = (value) => {
    if (dataKey === "total_revenue") {
      return `$${value >= 1000 ? (value / 1000).toFixed(1) + "k" : value}`;
    }
    return value;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      return (
        <div style={{
          backgroundColor: "var(--admin-bg-primary)",
          border: "1px solid var(--border-color)",
          padding: "10px",
          borderRadius: "6px"
        }}>
          <p style={{ margin: 0, fontWeight: "bold", color: "#fff" }}>{label}</p>
          <p style={{ margin: "4px 0 0", color: "var(--primary-color)" }}>
            {dataKey === "total_revenue" ? `Revenue: $${val.toLocaleString()}` : `Sold: ${val} units`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
        <XAxis type="number" tickFormatter={formatYAxis} stroke="#a1a1aa" fontSize={12} />
        <YAxis type="category" dataKey="product_name" stroke="#a1a1aa" fontSize={12} width={120} tick={{fill: '#e4e4e7'}} />
        <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
        <Bar dataKey={dataKey} radius={[0, 4, 4, 0]}>
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill="var(--primary-color, #d87d4a)" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TopProductsBarChart;
