import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

function CustomerAcquisitionChart({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: "var(--admin-bg-primary, #111827)",
          border: "1px solid var(--border-color, #374151)",
          padding: "10px",
          borderRadius: "6px"
        }}>
          <p style={{ margin: 0, fontWeight: "bold", color: "#fff" }}>
            {format(parseISO(label), "MMM dd, yyyy")}
          </p>
          <p style={{ margin: "4px 0 0", color: "#3b82f6" }}>
            New Customers: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis 
            dataKey="day" 
            tickFormatter={(str) => {
              try {
                return format(parseISO(str), "MMM dd");
              } catch (e) {
                return str;
              }
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
          <Area 
            type="monotone" 
            dataKey="users" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorUsers)" 
            dot={false}
            activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomerAcquisitionChart;
