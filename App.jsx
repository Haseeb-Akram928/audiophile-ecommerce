import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "@/pages/Home";
import CategoryPage from "@/pages/CategoryPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import RootLayout from "@/components/layout/RootLayout";
import CheckoutPage from "@/pages/CheckoutPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "@/pages/NotFound";

import AdminProtectedRoute from "@/features/admin/auth/AdminProtectedRoute";
import AdminLayout from "@/features/admin/components/AdminLayout";
import AdminDashboard from "@/features/admin/dashboard/AdminDashboard";
import ProductList from "@/features/admin/products/ProductList";
import ProductForm from "@/features/admin/products/ProductForm";
import OrderList from "@/features/admin/orders/OrderList";
import OrderDetail from "@/features/admin/orders/OrderDetail";
import AnalyticsLayout from "@/features/admin/analytics/AnalyticsLayout";
import AnalyticsDashboard from "@/features/admin/analytics/AnalyticsDashboard";
import ProductAnalytics from "@/features/admin/analytics/ProductAnalytics";
import CustomerAnalytics from "@/features/admin/analytics/CustomerAnalytics";
import UserList from "@/features/admin/users/UserList";
import ReviewModeration from "@/features/admin/content/ReviewModeration";
import CouponManager from "@/features/admin/content/CouponManager";
import SiteSettings from "@/features/admin/content/SiteSettings";
import AdminSettings from "@/features/admin/settings/AdminSettings";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "products",
            element: <ProductList />,
          },
          {
            path: "products/new",
            element: <ProductForm />,
          },
          {
            path: "products/:id/edit",
            element: <ProductForm />,
          },
          {
            path: "orders",
            element: <OrderList />,
          },
          {
            path: "orders/:id",
            element: <OrderDetail />,
          },
          {
            path: "analytics",
            element: <AnalyticsLayout />,
            children: [
              { index: true, element: <AnalyticsDashboard /> },
              { path: "products", element: <ProductAnalytics /> },
              { path: "customers", element: <CustomerAnalytics /> },
            ],
          },
          {
            path: "users",
            element: <UserList />,
          },
          {
            path: "reviews",
            element: <ReviewModeration />,
          },
          {
            path: "coupons",
            element: <CouponManager />,
          },
          {
            path: "content",
            element: <SiteSettings />,
          },
          {
            path: "settings",
            element: <AdminSettings />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/product/:slug",
        element: <ProductDetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/checkout",
            element: <CheckoutPage />,
          },
          {
            path: "/orders",
            element: <OrderPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
      // Catch-all route
      {
        path: "*",
        element: <NotFound />
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#000",
          },
        }}
      />
    </>
  );
}

export default App;
