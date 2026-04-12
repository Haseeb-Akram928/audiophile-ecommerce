import { useMemo } from "react";
import { useAdminProducts, useDeleteProduct } from "./useAdminProducts";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import styles from "./ProductList.module.css";
import { Link } from "react-router-dom";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { getImageUrl } from "@/utils/helper";

function ProductList() {
  const { isLoading, products } = useAdminProducts();
  const { deleteProduct, isDeleting } = useDeleteProduct();

  const columns = useMemo(
    () => [
      {
        header: "Image",
        accessorKey: "image",
        cell: (info) => {
          const product = info.row.original;
          const imgSrc = product.categoryImage?.desktop 
            ? getImageUrl(product.categoryImage.desktop) 
            : null;
            
          return (
            <div className={styles.imageCell}>
              {imgSrc ? (
                <img src={imgSrc} alt={product.name} className={styles.productImg} />
              ) : (
                <div className={styles.placeholderImg}>No Img</div>
              )}
            </div>
          );
        },
      },
      {
        header: "Name",
        accessorKey: "name",
        cell: (info) => <span className={styles.productName}>{info.getValue()}</span>,
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: (info) => <span className={styles.category}>{info.getValue()}</span>,
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: (info) => (
          <span>${info.getValue()?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        ),
      },
      {
        header: "Stock",
        accessorKey: "stock",
        cell: (info) => {
          const stock = info.getValue() || 0;
          return (
            <span className={stock > 10 ? styles.stockGood : styles.stockLow}>
              {stock}
            </span>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "is_active",
        cell: (info) => (
          <StatusBadge status={info.getValue() ? "Active" : "Inactive"} />
        ),
      },
      {
        header: "Actions",
        id: "actions",
        cell: (info) => (
          <div className={styles.actionsCell}>
            <Link to={`/admin/products/${info.row.original.id}/edit`} className={styles.actionBtn}>
              <Edit2 size={16} />
            </Link>
            <button 
              className={`${styles.actionBtn} ${styles.actionDelete}`}
              onClick={() => {
                if(window.confirm("Are you sure you want to deactivate this product?")) {
                  deleteProduct(info.row.original.id);
                }
              }}
              disabled={isDeleting}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    [deleteProduct, isDeleting]
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>Manage your store's inventory and catalog.</p>
        </div>
        <Link to="/admin/products/new" className={styles.addButton}>
          <Plus size={18} />
          <span>Add Product</span>
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <DataTable data={products || []} columns={columns} loading={isLoading} />
      </div>
    </div>
  );
}

export default ProductList;
