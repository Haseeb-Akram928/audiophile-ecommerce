import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import styles from "./ProductForm.module.css";
import { useAdminProducts } from "./useAdminProducts";
// import ProductImageUploader from "./ProductImageUploader";
// import RichTextEditor from "../components/RichTextEditor";
import Loader from "@/components/ui/Loader";

function ProductForm() {
  const { id } = useParams();
  const isEditSession = Boolean(id);
  const navigate = useNavigate();
  
  const { products, isLoading: isLoadingProducts } = useAdminProducts();
  const productToEdit = isEditSession ? products?.find((p) => p.id === Number(id)) : null;

  const { register, handleSubmit, formState, reset, control } = useForm({
    defaultValues: isEditSession ? productToEdit : {
      is_active: true,
      new: false,
      stock: 0,
    }
  });

  const { errors } = formState;

  useEffect(() => {
    if (isEditSession && productToEdit) {
      reset(productToEdit);
    }
  }, [productToEdit, reset, isEditSession]);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // TODO: Connect to useCreateProduct / useUpdateProduct mutations
    alert("Form submission logic will be connected in next iteration!");
    navigate("/admin/products");
  };

  if (isEditSession && isLoadingProducts) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{isEditSession ? "Edit Product" : "Add New Product"}</h1>
        <button onClick={() => navigate("/admin/products")} className={styles.cancelBtn}>
          Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.formMain}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Basic Details</h2>
            
            <div className={styles.inputGroup}>
              <label>Product Name</label>
              <input 
                type="text" 
                {...register("name", { required: "Name is required" })} 
                className={styles.input}
                placeholder="e.g. XX99 Mark II Headphones"
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Slug</label>
                <input 
                  type="text" 
                  {...register("slug", { required: "Slug is required" })} 
                  className={styles.input}
                  placeholder="e.g. xx99-mark-two-headphones"
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label>SKU</label>
                <input 
                  type="text" 
                  {...register("sku")} 
                  className={styles.input}
                  placeholder="e.g. XX99-MK2"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Category</label>
              <select {...register("category", { required: "Category is required" })} className={styles.input}>
                <option value="">Select Category</option>
                <option value="headphones">Headphones</option>
                <option value="speakers">Speakers</option>
                <option value="earphones">Earphones</option>
              </select>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Pricing & Inventory</h2>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Price ($)</label>
                <input 
                  type="number" 
                  {...register("price", { required: "Price is required", min: 0 })} 
                  className={styles.input}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label>Cost Price ($)</label>
                <input 
                  type="number" 
                  {...register("cost_price", { min: 0 })} 
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Stock</label>
                <input 
                  type="number" 
                  {...register("stock", { required: "Stock is required", min: 0 })} 
                  className={styles.input}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Images & Content</h2>
            <p className={styles.note}>Image uploader and RichText editor will be added in the next push.</p>
          </div>
        </div>

        <div className={styles.formSidebar}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Status</h2>
            
            <div className={styles.toggleGroup}>
              <label>Active Product</label>
              <input type="checkbox" {...register("is_active")} />
            </div>
            
            <div className={styles.toggleGroup}>
              <label>"New" Badge</label>
              <input type="checkbox" {...register("new")} />
            </div>

            <button type="submit" className={styles.submitBtn}>
              {isEditSession ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
