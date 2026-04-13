import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useAdminSettings, useUpdateSetting } from "./useAdminContent";
import styles from "./Content.module.css";
import Loader from "@/components/ui/Loader";

export default function SiteSettings() {
  const { settings, isLoading } = useAdminSettings();
  const { updateSetting, isPending } = useUpdateSetting();
  
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");

  useEffect(() => {
    if (settings) {
      const bannerSetting = settings.find(s => s.key === "hero_banner");
      if (bannerSetting?.value) {
        setHeroTitle(bannerSetting.value.title || "");
        setHeroSubtitle(bannerSetting.value.subtitle || "");
      }
    }
  }, [settings]);

  const handleSaveHero = (e) => {
    e.preventDefault();
    updateSetting({
      settingKey: "hero_banner",
      value: { title: heroTitle, subtitle: heroSubtitle }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Site Settings</h1>
          <p className={styles.subtitle}>Manage global configuration and storefront content.</p>
        </div>
      </div>

      <div className={styles.settingsGrid}>
        <div className={styles.settingsCard}>
          <h2 className={styles.cardTitle}>Storefront Hero Banner</h2>
          <p className={styles.cardDesc}>Update the main text displayed on the homepage banner.</p>
          
          <form onSubmit={handleSaveHero} className={styles.settingsForm}>
            <div className={styles.inputGroup}>
              <label>Hero Title (e.g. XX99 Mark II Headphones)</label>
              <input 
                type="text" 
                className={styles.input} 
                value={heroTitle}
                onChange={e => setHeroTitle(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Hero Subtitle / Description</label>
              <textarea 
                className={styles.textarea} 
                rows={3}
                value={heroSubtitle}
                onChange={e => setHeroSubtitle(e.target.value)}
              />
            </div>
            <button type="submit" className={styles.saveBtn} disabled={isPending}>
              <Save size={18} /> Save Banner Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
