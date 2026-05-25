import { useEffect } from "react";
import { useUser } from "@/features/auth/useUser";
import { sendWelcomeEmail } from "@/services/apiEmail";

export function useWelcomeEmail() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    // Detect if user registered within the last 15 seconds
    const lastSignIn = new Date(user.last_sign_in_at || user.updated_at);
    const createdAt = new Date(user.created_at);
    const isBrandNewSignup = lastSignIn - createdAt < 15000;

    const emailSentKey = `welcome_email_sent_${user.id}`;
    const isEmailAlreadySent = localStorage.getItem(emailSentKey) === "true";

    if (isBrandNewSignup && !isEmailAlreadySent) {
      // Mark as sent immediately to prevent double sends
      localStorage.setItem(emailSentKey, "true");

      const fullName = 
        user.user_metadata?.full_name || 
        user.user_metadata?.fullName || 
        user.email.split("@")[0];

      sendWelcomeEmail({
        fullName,
        email: user.email,
      });
    }
  }, [user]);
}
