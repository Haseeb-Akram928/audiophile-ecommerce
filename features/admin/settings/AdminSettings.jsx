import { format } from "date-fns";
import { Activity, Shield, Clock } from "lucide-react";
import { useActivityLogs } from "./useAdminSettings";
import { useAdminUser } from "../auth/useAdminUser";
import styles from "./Settings.module.css";
import Loader from "@/components/ui/Loader";

export default function AdminSettings() {
  const { logs, isLoading } = useActivityLogs();
  const { role, user } = useAdminUser();

  const ActionIcon = ({ action }) => {
    if (action.includes("promote") || action.includes("demote")) return <Shield size={16} />;
    if (action.includes("order")) return <Activity size={16} />;
    return <Clock size={16} />;
  };

  const formatMetadata = (action, meta) => {
    if (!meta) return null;
    if (action === "order.update_status") return `Status changed from ${meta.old_status} to ${meta.new_status}`;
    if (action === "user.promote") return `Promoted to ${meta.new_role}`;
    if (action === "review.moderate") return meta.is_approved ? "Approved review" : "Rejected/Hid review";
    return JSON.stringify(meta);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>System Settings & Logs</h1>
          <p className={styles.subtitle}>Audit logs and general panel configuration.</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.settingsCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Your Profile</h2>
            <div className={styles.profileBox}>
              <div className={styles.profileAvatar}>
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="Profile" />
                ) : (
                  user?.user_metadata?.username?.charAt(0).toUpperCase() || 'A'
                )}
              </div>
              <div className={styles.profileInfo}>
                <div className={styles.profileName}>{user?.user_metadata?.username || "Admin"}</div>
                <div className={styles.profileEmail}>{user?.email}</div>
                <div className={styles.profileRoleBadge}>{role?.replace('_', ' ')}</div>
              </div>
            </div>
            <p className={styles.note}>
              To update your email or password, please use the main storefront profile page.
            </p>
          </div>
        </div>

        <div className={styles.logsCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Activity Log</h2>
            <p className={styles.cardDesc}>Recent administrative actions taken across the platform.</p>
            
            {isLoading ? (
              <Loader />
            ) : (
              <div className={styles.logList}>
                {logs?.length > 0 ? logs.map((log) => (
                  <div key={log.id} className={styles.logItem}>
                    <div className={styles.logIcon}>
                      <ActionIcon action={log.action} />
                    </div>
                    <div className={styles.logContent}>
                      <div className={styles.logHeader}>
                        <span className={styles.logUser}>{log.profiles?.username || "Admin"}</span>
                        <span className={styles.logAction}>{log.action}</span>
                      </div>
                      <div className={styles.logMeta}>
                        Target: {log.entity_type} #{String(log.entity_id).substring(0, 8)}
                        {log.metadata && <span className={styles.logDetail}> • {formatMetadata(log.action, log.metadata)}</span>}
                      </div>
                    </div>
                    <div className={styles.logTime}>
                      {format(new Date(log.created_at), "MMM dd, HH:mm")}
                    </div>
                  </div>
                )) : (
                  <div className={styles.emptyLogs}>No activity recorded yet.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
