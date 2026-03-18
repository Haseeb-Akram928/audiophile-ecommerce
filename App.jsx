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

const router = createBrowserRouter([
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
        ],
      },
    ],
  },

  // Public Auth Routes (Moved outside of ProtectedRoute)
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
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
