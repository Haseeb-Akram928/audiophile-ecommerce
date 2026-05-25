import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header/Header.jsx";
import Footer from "@/components/layout/Footer/Footer.jsx";
import { useWelcomeEmail } from "@/hooks/useWelcomeEmail";

const RootLayout = () => {
  const { pathname } = useLocation();

  // Listen for and trigger welcome email on new signups
  useWelcomeEmail();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
