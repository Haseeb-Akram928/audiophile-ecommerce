import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import styles from './AdminDashboard.module.css';

const COLORS = ['#D87D4A', '#FBAF85', '#101010', '#F1F1F1'];

function CategoryPieChart({ data }) {
  if (!data || data.length === 0) {
    return <div className={styles.emptyChart}>No category data available</div>;
  }

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.chartTitle}>Revenue by Category</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="revenue"
              nameKey="category"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--admin-bg-secondary)', 
                border: '1px solid var(--admin-border)',
                borderRadius: '8px',
                color: 'var(--admin-text-primary)'
              }}
              formatter={(value) => [`$${value}`, 'Revenue']}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CategoryPieChart;
