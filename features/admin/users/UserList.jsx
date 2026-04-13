import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Shield, ShieldOff, MoreVertical } from "lucide-react";
import { useAdminUsers, useManageRole } from "./useAdminUsers";
import { useAdminUser as useCurrentAdmin } from "../auth/useAdminUser";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import styles from "./UserList.module.css";
import Loader from "@/components/ui/Loader";

function UserList() {
  const { users, isLoading } = useAdminUsers();
  const { promoteUser, revokeRole, isPromoting, isRevoking } = useManageRole();
  const { role: currentAdminRole, user: currentUser } = useCurrentAdmin();
  const isSuperAdmin = currentAdminRole === "super_admin";

  const columns = useMemo(
    () => [
      {
        header: "User",
        accessorKey: "username",
        cell: (info) => (
          <div className={styles.userCell}>
            <div className={styles.avatar}>
              {info.getValue()?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.username}>{info.getValue() || "Guest/Unknown"}</span>
              <span className={styles.email}>{info.row.original.email}</span>
            </div>
          </div>
        )
      },
      {
        header: "Joined",
        accessorKey: "created_at",
        cell: (info) => <span>{format(new Date(info.getValue()), "MMM dd, yyyy")}</span>
      },
      {
        header: "Last Sign In",
        accessorKey: "last_sign_in_at",
        cell: (info) => (
          <span className={styles.lastActive}>
            {info.getValue() ? format(new Date(info.getValue()), "MMM dd, yyyy") : "Never"}
          </span>
        )
      },
      {
        header: "Role",
        accessorKey: "admin_role",
        cell: (info) => {
          const roleVal = info.getValue();
          if (!roleVal) return <span className={styles.customerRole}>Customer</span>;
          return <StatusBadge status={roleVal.replace('_', ' ')} />;
        }
      },
      {
        header: "Actions",
        id: "actions",
        cell: (info) => {
          const targetUser = info.row.original;
          const isSelf = targetUser.id === currentUser?.id;
          const isTargetSuper = targetUser.admin_role === "super_admin";

          // Only super admins can manage roles, and they cannot demote themselves easily here to prevent lockout
          if (!isSuperAdmin || isSelf) return null;

          return (
            <div className={styles.actions}>
              {!targetUser.admin_role ? (
                <button 
                  className={styles.actionBtn}
                  onClick={() => {
                    if (window.confirm(`Make ${targetUser.email} an Admin?`)) {
                      promoteUser({ userId: targetUser.id, role: "admin" });
                    }
                  }}
                  disabled={isPromoting}
                  title="Promote to Admin"
                >
                  <Shield size={16} />
                </button>
              ) : (
                <button 
                  className={`${styles.actionBtn} ${styles.dangerBtn}`}
                  onClick={() => {
                    if (window.confirm(`Revoke admin access for ${targetUser.email}?`)) {
                      revokeRole(targetUser.id);
                    }
                  }}
                  disabled={isRevoking || isTargetSuper} // Cannot revoke other super admins easily via simple UI
                  title="Revoke Admin Access"
                >
                  <ShieldOff size={16} />
                </button>
              )}
            </div>
          );
        }
      }
    ],
    [isSuperAdmin, currentUser, promoteUser, revokeRole, isPromoting, isRevoking]
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>User Management</h1>
          <p className={styles.subtitle}>Promote administrators and view registered customers.</p>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <DataTable data={users || []} columns={columns} loading={isLoading} />
      </div>
    </div>
  );
}

export default UserList;
