import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Plus, Power, PowerOff } from "lucide-react";
import { useAdminCoupons, useManageCoupons } from "./useAdminContent";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import styles from "./Content.module.css";
import Loader from "@/components/ui/Loader";

export default function CouponManager() {
  const { coupons, isLoading } = useAdminCoupons();
  const { addCoupon, toggleStatus, isCreating, isToggling } = useManageCoupons();
  
  const [showForm, setShowForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount_percent: 10,
    max_uses: 100,
    valid_until: ""
  });

  const columns = useMemo(
    () => [
      {
        header: "Code",
        accessorKey: "code",
        cell: (info) => <span className={styles.couponCode}>{info.getValue()}</span>
      },
      {
        header: "Discount",
        accessorKey: "discount_percent",
        cell: (info) => <span className={styles.discount}>{info.getValue()}% OFF</span>
      },
      {
        header: "Usage",
        accessorFn: (row) => `${row.current_uses} / ${row.max_uses}`,
        cell: (info) => <span>{info.getValue()}</span>
      },
      {
        header: "Valid Until",
        accessorKey: "valid_until",
        cell: (info) => (
          <span>{info.getValue() ? format(new Date(info.getValue()), "MMM dd, yyyy") : "Never"}</span>
        )
      },
      {
        header: "Status",
        accessorKey: "is_active",
        cell: (info) => (
          <StatusBadge status={info.getValue() ? "active" : "inactive"} />
        )
      },
      {
        header: "Actions",
        id: "actions",
        cell: (info) => {
          const coupon = info.row.original;
          return (
            <div className={styles.actions}>
              <button 
                className={styles.actionBtn}
                onClick={() => toggleStatus({ couponId: coupon.id, isActive: !coupon.is_active })}
                disabled={isToggling}
                title={coupon.is_active ? "Deactivate" : "Activate"}
              >
                {coupon.is_active ? <PowerOff size={16} /> : <Power size={16} />}
              </button>
            </div>
          );
        }
      }
    ],
    [toggleStatus, isToggling]
  );

  const handleCreate = (e) => {
    e.preventDefault();
    addCoupon(newCoupon, {
      onSuccess: () => {
        setShowForm(false);
        setNewCoupon({ code: "", discount_percent: 10, max_uses: 100, valid_until: "" });
      }
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Coupons</h1>
          <p className={styles.subtitle}>Manage discount codes and promotional campaigns.</p>
        </div>
        <button className={styles.primaryBtn} onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> {showForm ? "Cancel" : "Create Coupon"}
        </button>
      </div>

      {showForm && (
        <form className={styles.formCard} onSubmit={handleCreate}>
          <div className={styles.inputGroup}>
            <label>Coupon Code (e.g. SUMMER20)</label>
            <input 
              required 
              className={styles.input} 
              value={newCoupon.code} 
              onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Discount Percentage</label>
            <input 
              type="number" required min="1" max="100" 
              className={styles.input} 
              value={newCoupon.discount_percent} 
              onChange={e => setNewCoupon({...newCoupon, discount_percent: Number(e.target.value)})}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Max Uses</label>
            <input 
              type="number" required min="1" 
              className={styles.input} 
              value={newCoupon.max_uses} 
              onChange={e => setNewCoupon({...newCoupon, max_uses: Number(e.target.value)})}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Valid Until</label>
            <input 
              type="date" required 
              className={styles.input} 
              value={newCoupon.valid_until} 
              onChange={e => setNewCoupon({...newCoupon, valid_until: e.target.value})}
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={isCreating}>
            Save Coupon
          </button>
        </form>
      )}

      <div className={styles.tableWrapper}>
        <DataTable data={coupons || []} columns={columns} loading={isLoading} />
      </div>
    </div>
  );
}
