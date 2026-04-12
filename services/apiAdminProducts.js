import { supabase } from "@/lib/supabase";

export async function getAdminProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching admin products", error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

export async function deleteProduct(id) {
  // Soft delete for admin interface (deactivate)
  const { data, error } = await supabase
    .from("products")
    .update({ is_active: false })
    .eq("id", id);

  if (error) {
    console.error("Error soft-deleting product", error);
    throw new Error("Product could not be deleted");
  }

  return data;
}

export async function createProduct(newProduct) {
  const { data, error } = await supabase
    .from("products")
    .insert([{ ...newProduct }])
    .select()
    .single();

  if (error) {
    console.error("Error creating product", error);
    throw new Error("Product could not be created");
  }

  return data;
}

export async function updateProduct({ id, ...updatedProduct }) {
  const { data, error } = await supabase
    .from("products")
    .update(updatedProduct)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating product", error);
    throw new Error("Product could not be updated");
  }

  return data;
}
