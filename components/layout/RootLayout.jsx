import { useEffect } from "react";
import { Toaster } from "react-hot-toast"; // Import Toaster
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header/Header.jsx";
import Footer from "@/components/layout/Footer/Footer.jsx";

const RootLayout = () => {
  const { pathname } = useLocation();

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
      <Toaster /> {/* Add Toaster component */}
    </>
  );
};

export default RootLayout;
