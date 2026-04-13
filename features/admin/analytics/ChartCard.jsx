import React from "react";
import styles from "./ChartCard.module.css";
import { Download } from "lucide-react";

function ChartCard({ title, subtitle, action, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {action && (
          <button className={styles.actionBtn}>
            {action === "export" ? <Download size={16} /> : action}
          </button>
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default ChartCard;
