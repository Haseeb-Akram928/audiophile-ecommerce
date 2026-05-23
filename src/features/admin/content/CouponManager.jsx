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
    description: "",
    discount_type: "percentage",
    discount_value: 10,
    max_uses: 100,
    expires_at: ""
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
        accessorKey: "discount_value",
        cell: (info) => (
          <span className={styles.discount}>
            {info.getValue()}{info.row.original.discount_type === 'percentage' ? '%' : '$'} OFF
          </span>
        )
      },
      {
        header: "Usage",
        accessorFn: (row) => `${row.current_uses} / ${row.max_uses}`,
        cell: (info) => <span>{info.getValue()}</span>
      },
      {
        header: "Expires",
        accessorKey: "expires_at",
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
    
    // Prepare data: convert empty date to null and set default status
    const couponData = {
      ...newCoupon,
      expires_at: newCoupon.expires_at || null,
      is_active: true,
      current_uses: 0
    };

    addCoupon(couponData, {
      onSuccess: () => {
        setShowForm(false);
        setNewCoupon({ 
          code: "", 
          description: "",
          discount_type: "percentage",
          discount_value: 10, 
          max_uses: 100, 
          expires_at: "" 
        });
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
          <h2 className={styles.formTitle}>Create New Coupon</h2>
          
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>Coupon Code</label>
              <input 
                required 
                placeholder="e.g. SUMMER50"
                className={styles.input} 
                value={newCoupon.code} 
                onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Discount Value</label>
              <div className={styles.inputRow}>
                <input 
                  type="number" required min="1" 
                  className={styles.input} 
                  value={newCoupon.discount_value} 
                  onChange={e => setNewCoupon({...newCoupon, discount_value: Number(e.target.value)})}
                />
                <select 
                  className={styles.input}
                  value={newCoupon.discount_type}
                  onChange={e => setNewCoupon({...newCoupon, discount_type: e.target.value})}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Description (Optional)</label>
              <input 
                className={styles.input} 
                value={newCoupon.description} 
                onChange={e => setNewCoupon({...newCoupon, description: e.target.value})}
                placeholder="e.g. Summer special discount on audio products"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label>Max Uses</label>
              <input 
                type="number" required min="1" 
                className={styles.input} 
                value={newCoupon.max_uses} 
                onChange={e => setNewCoupon({...newCoupon, max_uses: Number(e.target.value)})}
                placeholder="e.g. 100"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Expires At</label>
              <input 
                type="date" 
                className={styles.input} 
                value={newCoupon.expires_at} 
                onChange={e => setNewCoupon({...newCoupon, expires_at: e.target.value})}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button 
              type="button" 
              className={styles.cancelBtn} 
              onClick={() => {
                setShowForm(false);
                setNewCoupon({ 
                  code: "", 
                  description: "",
                  discount_type: "percentage",
                  discount_value: 10, 
                  max_uses: 100, 
                  expires_at: "" 
                });
              }}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={isCreating}>
              {isCreating ? "Saving..." : "Save Coupon"}
            </button>
          </div>
        </form>
      )}

      <div className={styles.tableWrapper}>
        <DataTable data={coupons || []} columns={columns} loading={isLoading} />
      </div>
    </div>
  );
}
