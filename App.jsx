import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import CategoryPage from "@/pages/CategoryPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import RootLayout from "@/components/layout/RootLayout";
import CheckoutPage from "@/pages/CheckoutPage";
// Import Page components instead of raw Forms for better layout
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
            path: "/order/:id",
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
  return <RouterProvider router={router} />;
}

export default App;
