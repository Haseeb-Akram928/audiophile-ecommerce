import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import styles from './DataTable.module.css';

function DataTable({ data, columns, loading }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <div className={styles.loading}>Loading data...</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
