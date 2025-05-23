import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import classNames from "classnames";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  ColumnSort,
  CellContext,
} from "@tanstack/react-table";
import Loading from "./loading";


export type FetchDataFn<T> = (
  pageIndex: number,
  pageSize: number,
  searchQuery?: string
) => Promise<{ items: T[]; total: number }>;

export type OnSortParam = { order: "asc" | "desc" | ""; key: string | number };
export type DataTableResetHandle = {
  resetSorting: () => void;
  resetSelected: () => void;
};

export type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  // For client-side mode, pass a data array; for server-side mode, provide fetchData.
  data?: T[];
  fetchData?: FetchDataFn<T>;
  onSearch?: (query: string) => void;
  loading?: boolean;
  selectable?: boolean;
  initialPageSize?: number;
};

function DataTableInternal<T>(
  props: DataTableProps<T>,
  ref: React.ForwardedRef<DataTableResetHandle>
) {
  const {
    columns,
    data = [],
    fetchData,
    onSearch,
    loading: loadingProp = false,
    selectable = false,
    initialPageSize = 10,
  } = props;

  // For server-side mode, maintain state for pagination, search, and total.
  const [serverData, setServerData] = useState<T[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(loadingProp);

  // For client-side mode, maintain pagination state so that changes cause a re-render.
  const [clientPagination, setClientPagination] = useState({ pageIndex: 0, pageSize: initialPageSize });

  // Decide which data to use.
  const tableData = fetchData ? serverData : data;

  // When in server-side mode, fetch data on pagination or search changes.
  const fetchServerData = useCallback(async () => {
    if (fetchData) {
      setLoading(true);
      try {
        const result = await fetchData(pageIndex, pageSize, searchQuery);
        setServerData(result.items);
        setTotal(result.total);
      } catch (error) {
        console.error("Error fetching table data:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [fetchData, pageIndex, pageSize, searchQuery]);

  useEffect(() => {
    if (fetchData) {
      fetchServerData();
    }
  }, [fetchServerData, fetchData]);

  // Handle search input.
  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setPageIndex(0);
      setClientPagination({ pageIndex: 0, pageSize: initialPageSize });
      onSearch?.(query);
    },
    [onSearch, initialPageSize]
  );

  // If selectable, add a checkbox column.
  const finalColumns: ColumnDef<T>[] = useMemo(() => {
    if (selectable) {
      const selectionColumn: ColumnDef<T> = {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }: CellContext<T, unknown>) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      };
      return [selectionColumn, ...columns];
    }
    return columns;
  }, [columns, selectable]);

  // Create the table instance.
  const table = useReactTable({
    data: tableData,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // For server-side mode, we control pagination; for client-side, we use clientPagination state.
    manualPagination: Boolean(fetchData),
    state: fetchData
      ? {
          pagination: { pageIndex, pageSize },
          sorting: [] as ColumnSort[],
        }
      : {
          pagination: clientPagination,
        },
    onPaginationChange: fetchData
      ? (updater) => {
          const newState =
            typeof updater === "function"
              ? updater({ pageIndex, pageSize })
              : updater;
          setPageIndex(newState.pageIndex);
          setPageSize(newState.pageSize);
        }
      : (updater) => {
          // Update clientPagination state to trigger re-render.
          const newState =
            typeof updater === "function"
              ? updater(clientPagination)
              : updater;
          setClientPagination(newState);
        },
    onSortingChange: (sorter) => {
      // Optionally handle sorting changes.
    },
  });

  // Expose imperative methods.
  const resetSorting = () => {
    table.resetSorting();
  };
  const resetSelected = () => {
    table.toggleAllRowsSelected(false);
  };
  useImperativeHandle(ref, () => ({
    resetSorting,
    resetSelected,
  }));

  // Numeric Pagination Component.
  const NumericPagination = () => {
    const currentPage = fetchData
      ? pageIndex
      : clientPagination.pageIndex;
    const totalPages = fetchData
      ? Math.ceil(total / pageSize)
      : table.getPageCount();
    const pages = [...Array(totalPages).keys()];

    return (
      <div className="flex flex-wrap items-center gap-2 justify-end mt-5 ">
        <button
          onClick={() =>
            fetchData
              ? setPageIndex((prev) => Math.max(prev - 1, 0))
              : table.previousPage()
          }
          disabled={fetchData ? pageIndex === 0 : !table.getCanPreviousPage()}
          className="text-gray-700 text-base font-bold "
        >
          &lt; Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() =>
              fetchData ? setPageIndex(page) : table.setPageIndex(page)
            }
            className={classNames(
              "px-3 rounded-lg text-lg font-semibold",
              page === currentPage
                ? "bg-transparent text-gray-600 border border-gray-950"
                : "text-emerald-950 hover:text-gray-600"
            )}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() =>
            fetchData
              ? setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))
              : table.nextPage()
          }
          disabled={
            fetchData ? pageIndex >= totalPages - 1 : !table.getCanNextPage()
          }
          className="text-gray-700 text-base font-bold "
        >
          Next &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Optional search input */}
      {onSearch && (
        <div className="p-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      {/* Table container for horizontal scrolling */}
      <div className=" w-full overflow-auto scrollbar-hide rounded-lg shadow-md">
      {/* <table className="w-full min-w-[900px] text-left border-collapse"> */}
      <table className="w-full min-w-fit border-collapse">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-lg text-zinc-600 min-w-[200px] whitespace-nowrap uppercase"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() &&
                      (header.column.getIsSorted()
                        ? header.column.getIsSorted() === "desc"
                          ? " "
                          : " "
                        : " ")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-base capitalize">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  <Loading overlay />
                </td>
              </tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50 text-center">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-2 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <NumericPagination />
    </div>
  );
}

const DataTable = forwardRef(DataTableInternal) as <T>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<DataTableResetHandle> }
) => ReturnType<typeof DataTableInternal>;

export type { ColumnDef };
export default DataTable;
