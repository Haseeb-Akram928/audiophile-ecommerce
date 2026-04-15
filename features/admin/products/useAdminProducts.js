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

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProductFn, isPending: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product successfully created");
      queryClient.invalidateQueries({ queryKey: ["admin_products"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createProduct: createProductFn };
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { mutate: updateProductFn, isPending: isUpdating } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success("Product successfully updated");
      queryClient.invalidateQueries({ queryKey: ["admin_products"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateProduct: updateProductFn };
}
