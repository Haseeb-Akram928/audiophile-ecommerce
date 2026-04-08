import { supabase } from "@/lib/supabase";

export async function getProducts({ sort, search } = {}) {
  let query = supabase.from("products").select("*");

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (sort) {
    const [field, direction] = sort.split("-");
    const isAscending = direction === "asc";
    // Check if it's newness sort (which usually relies on a created_at or is_new column)
    if (field === "newness") {
      query = query.order("new", { ascending: false });
    } else {
      query = query.order(field, { ascending: isAscending });
    }
  } else {
    // Default sort or maybe sort by id? Let's just leave it neutral
  }

  let { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

export async function getProduct(slug) {
  let { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Product not found");
  }

  return data;
}
