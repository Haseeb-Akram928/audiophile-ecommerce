import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import styles from './AdminDashboard.module.css';

function RevenueChart({ data }) {
  if (!data || data.length === 0) {
    return <div className={styles.emptyChart}>No revenue data available</div>;
  }

  // Format date to short format (e.g. "Apr 12")
  const formattedData = data.map(item => ({
    ...item,
    formattedDay: new Date(item.day).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }));

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.chartTitle}>Revenue Over Time (30 Days)</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--admin-accent)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--admin-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--admin-border)" />
            <XAxis 
              dataKey="formattedDay" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--admin-text-tertiary)', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--admin-text-tertiary)', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
              width={60}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--admin-bg-secondary)', 
                border: '1px solid var(--admin-border)',
                borderRadius: '8px',
                color: 'var(--admin-text-primary)'
              }}
              itemStyle={{ color: 'var(--admin-accent)' }}
              formatter={(value) => [`$${value}`, 'Revenue']}
              labelStyle={{ color: 'var(--admin-text-tertiary)', marginBottom: '8px' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="var(--admin-accent)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;
