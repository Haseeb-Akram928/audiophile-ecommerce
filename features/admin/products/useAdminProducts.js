import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminProducts, deleteProduct, createProduct, updateProduct } from "@/services/apiAdminProducts";
import toast from "react-hot-toast";

export function useAdminProducts() {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["admin_products"],
    queryFn: getAdminProducts,
  });

  return { isLoading, products, error };
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate: deleteProductFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product successfully deactivated");
      queryClient.invalidateQueries({ queryKey: ["admin_products"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteProduct: deleteProductFn };
}

// Will add useCreateProduct and useUpdateProduct when forms are ready
