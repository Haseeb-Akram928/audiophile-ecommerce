import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import styles from "./ProductForm.module.css";
import { useAdminProducts, useCreateProduct, useUpdateProduct } from "./useAdminProducts";
import ProductImageUploader from "./ProductImageUploader";
import RichTextEditor from "../components/RichTextEditor";
import Loader from "@/components/ui/Loader";
import { Plus, Trash2 } from "lucide-react";

function ProductForm() {
  const { id } = useParams();
  const isEditSession = Boolean(id);
  const navigate = useNavigate();
  
  const { products, isLoading: isLoadingProducts } = useAdminProducts();
  const { createProduct, isCreating } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();
  
  const productToEdit = isEditSession ? products?.find((p) => p.id === Number(id)) : null;

  const { register, handleSubmit, formState, reset, control } = useForm({
    defaultValues: {
      is_active: true,
      new: false,
      stock: 0,
      price: 0,
      includes: [{ item: "", quantity: 1 }],
      image: { mobile: "", tablet: "", desktop: "" },
      categoryImage: { mobile: "", tablet: "", desktop: "" },
      gallery: {
        first: { mobile: "", tablet: "", desktop: "" },
        second: { mobile: "", tablet: "", desktop: "" },
        third: { mobile: "", tablet: "", desktop: "" },
      }
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "includes"
  });

  const { errors } = formState;

  useEffect(() => {
    if (isEditSession && productToEdit) {
      reset(productToEdit);
    }
  }, [productToEdit, reset, isEditSession]);

  const onSubmit = (data) => {
    if (isEditSession) {
      updateProduct({ id: Number(id), ...data }, {
        onSuccess: () => navigate("/admin/products")
      });
    } else {
      createProduct(data, {
        onSuccess: () => navigate("/admin/products")
      });
    }
  };

  if (isEditSession && isLoadingProducts) return <Loader />;

  const isWorking = isCreating || isUpdating;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{isEditSession ? `Edit ${productToEdit?.name}` : "Add New Product"}</h1>
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

            <div className={styles.inputGroup}>
              <label>Description</label>
              <textarea 
                {...register("description", { required: "Description is required" })} 
                className={`${styles.input} ${styles.textarea}`}
                rows={4}
              />
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Features & Details</h2>
            <div className={styles.inputGroup}>
              <label>Product Features</label>
              <Controller
                name="features"
                control={control}
                rules={{ required: "Features are required" }}
                render={({ field }) => (
                  <RichTextEditor value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.features && <span className={styles.error}>{errors.features.message}</span>}
            </div>

            <div className={styles.boxEditor}>
              <label className={styles.label}>In the Box</label>
              {fields.map((field, index) => (
                <div key={field.id} className={styles.boxRow}>
                  <input 
                    type="number" 
                    {...register(`includes.${index}.quantity`, { required: true, min: 1 })} 
                    className={`${styles.input} ${styles.qtyInput}`}
                    placeholder="Qty"
                  />
                  <input 
                    type="text" 
                    {...register(`includes.${index}.item`, { required: true })} 
                    className={styles.input}
                    placeholder="Item name"
                  />
                  <button type="button" onClick={() => remove(index)} className={styles.removeBtn}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => append({ item: "", quantity: 1 })} 
                className={styles.addIncludeBtn}
              >
                <Plus size={16} /> Add Item
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Pricing & Inventory</h2>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Price ($)</label>
                <input 
                  type="number" 
                  {...register("price", { required: "Price is required", min: 0, valueAsNumber: true })} 
                  className={styles.input}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label>Cost Price ($)</label>
                <input 
                  type="number" 
                  {...register("cost_price", { min: 0, valueAsNumber: true })} 
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Stock</label>
                <input 
                  type="number" 
                  {...register("stock", { required: "Stock is required", min: 0, valueAsNumber: true })} 
                  className={styles.input}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Product Images</h2>
            <div className={styles.imageGrid}>
              <div className={styles.imageCol}>
                <h3 className={styles.imageTitle}>Main Images</h3>
                <Controller
                  name="image.desktop"
                  control={control}
                  render={({ field }) => (
                    <ProductImageUploader 
                      label="Desktop Detail" 
                      value={field.value} 
                      onChange={(val) => {
                        field.onChange(val);
                        // Auto-fill others if empty
                        const vals = control._formValues;
                        if (!vals.image.mobile) control.setValue("image.mobile", val);
                        if (!vals.image.tablet) control.setValue("image.tablet", val);
                      }} 
                      folder="products/detail"
                    />
                  )}
                />
                <Controller
                  name="categoryImage.desktop"
                  control={control}
                  render={({ field }) => (
                    <ProductImageUploader 
                      label="Category Preview" 
                      value={field.value} 
                      onChange={(val) => {
                        field.onChange(val);
                        const vals = control._formValues;
                        if (!vals.categoryImage.mobile) control.setValue("categoryImage.mobile", val);
                        if (!vals.categoryImage.tablet) control.setValue("categoryImage.tablet", val);
                      }} 
                      folder="products/category"
                    />
                  )}
                />
              </div>
              <div className={styles.imageCol}>
                <h3 className={styles.imageTitle}>Gallery</h3>
                <Controller
                  name="gallery.first.desktop"
                  control={control}
                  render={({ field }) => (
                    <ProductImageUploader 
                      label="Gallery 1" 
                      value={field.value} 
                      onChange={(val) => {
                        field.onChange(val);
                        control.setValue("gallery.first.mobile", val);
                        control.setValue("gallery.first.tablet", val);
                      }} 
                      folder="products/gallery"
                    />
                  )}
                />
                <Controller
                  name="gallery.second.desktop"
                  control={control}
                  render={({ field }) => (
                    <ProductImageUploader 
                      label="Gallery 2" 
                      value={field.value} 
                      onChange={(val) => {
                        field.onChange(val);
                        control.setValue("gallery.second.mobile", val);
                        control.setValue("gallery.second.tablet", val);
                      }} 
                      folder="products/gallery"
                    />
                  )}
                />
              </div>
            </div>
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

            <button type="submit" className={styles.submitBtn} disabled={isWorking}>
              {isWorking ? (
                <span className={styles.btnContent}>
                  <Loader2 className={styles.spinner} size={18} />
                  Saving...
                </span>
              ) : (
                isEditSession ? "Save Changes" : "Create Product"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Simple loader for the button
const Loader2 = ({ size, className }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={`${className} animate-spin`}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default ProductForm;
