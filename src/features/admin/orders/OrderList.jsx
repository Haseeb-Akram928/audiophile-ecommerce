import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { useAdminOrders } from "./useAdminOrders";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import styles from "./OrderList.module.css";
import { format } from "date-fns";

function OrderList() {
  const { isLoading, orders } = useAdminOrders();

  const columns = useMemo(
    () => [
      {
        header: "Order ID",
        accessorKey: "id",
        cell: (info) => <span className={styles.orderId}>{info.getValue().substring(0, 8)}</span>,
      },
      {
        header: "Date",
        accessorKey: "created_at",
        cell: (info) => (
          <span>{format(new Date(info.getValue()), "MMM dd, yyyy HH:mm")}</span>
        ),
      },
      {
        header: "Customer",
        accessorFn: (row) => row.profiles?.username || "Unknown Guest",
        cell: (info) => <span className={styles.customer}>{info.getValue()}</span>,
      },
      {
        header: "Total",
        accessorKey: "total_amount",
        cell: (info) => (
          <span className={styles.total}>
            ${info.getValue()?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        ),
      },
      {
        header: "Payment",
        accessorKey: "payment_method",
        cell: (info) => <span className={styles.payment}>{info.getValue()}</span>,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (info) => <StatusBadge status={info.getValue()} />,
      },
      {
        header: "Actions",
        id: "actions",
        cell: (info) => (
          <Link to={`/admin/orders/${info.row.original.id}`} className={styles.viewBtn}>
            <Eye size={16} /> View
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Orders</h1>
          <p className={styles.subtitle}>View and manage customer orders.</p>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <DataTable data={orders || []} columns={columns} loading={isLoading} />
      </div>
    </div>
  );
}

export default OrderList;
