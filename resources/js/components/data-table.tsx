import { Base } from "@/types/base";
import { useEffect, useState } from "react";
import { Button, Pagination, Table } from "./ui";
import { IconLoader2, IconSortAsc, IconSortDesc } from "justd-icons";
import type { Selection, SelectionMode } from "react-aria-components"

export interface Column<T> {
    id: string;
    header: string;
    cell: (item: T) => React.ReactNode;
    sortable?: boolean;
    isRowHeader?: boolean;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    fetchData: (params: Record<string, any>) => Promise<Base<T[]>>;
    filters: Record<string, any>;
    onSort?: (field: string, direction: 'asc' | 'desc' | null) => void;
    onSuccess?: (data: Base<T[]>) => void;
    onError?: (error: any) => void;
    selected?: Selection;
    onSelectionChange?: (keys: Selection) => void;
    selectionMode?: SelectionMode;
}

export const DataTable = <T extends Record<string, any>>({
    columns,
    fetchData,
    filters,
    onSort,
    onSuccess,
    onError,
    selected,
    onSelectionChange,
    selectionMode,
}: DataTableProps<T>) => {
    const [data, setData] = useState<Base<T[]>>({ items: [] });
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const loadData = async () => {
        setLoading(true);
        try {
            const params: Record<string, any> = {
                page: currentPage,
                ...(filters && typeof filters === 'object'
                    ? Object.entries(filters).reduce((acc, [key, value]) => {
                        if (value !== undefined && value !== '') {
                            acc[`filter[${key}]`] = value;
                        }
                        return acc;
                    }, {} as Record<string, any>)
                    : {}),
                ...(sort && {
                    'sort': sort.direction === 'desc' ? `-${sort.field}` : sort.field
                })
            };

            const response = await fetchData(params);
            setData(response);
            onSuccess?.(response);
        } catch (error) {
            onError?.(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [currentPage, sort, filters]);

    const handleSort = (columnId: string) => {
        setSort(current => {
            const newSort = current?.field !== columnId
                ? { field: columnId, direction: 'asc' as const }
                : current.direction === 'asc'
                    ? { field: columnId, direction: 'desc' as const }
                    : null;

            if (onSort) {
                onSort(columnId, newSort?.direction || null);
            }

            return newSort;
        });
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="space-y-4 bg-white min-w-full overflow-hidden">
            {/* Table Wrapper */}
            <div className="overflow-x-auto w-full">
                <Table
                    selectedKeys={selected}
                    onSelectionChange={onSelectionChange}
                    selectionMode={selectionMode}
                    className="min-w-full"
                    
                >
                    <Table.Header>
                        {columns.map(column => (
                            <Table.Column
                                key={column.id}
                                isRowHeader={column.isRowHeader}
                            >
                                <div className="flex items-center gap-2">
                                    {column.header}
                                    {column.sortable && (
                                        <Button
                                            intent="plain"
                                            size="small"
                                            className="h-8 w-8 p-0"
                                            onPress={() => handleSort(column.id)}
                                        >
                                            {sort?.direction == 'asc' ? <IconSortDesc /> : <IconSortAsc />}
                                        </Button>
                                    )}
                                </div>
                            </Table.Column>
                        ))}
                    </Table.Header>

                    <Table.Body
                        items={data.items || []}
                        renderEmptyState={() => (
                            <div className="flex flex-col items-center justify-center p-4">
                                {loading ? (
                                    <IconLoader2 className="h-6 w-6 animate-spin mx-auto" />
                                ) : (
                                    'No data found'
                                )}
                            </div>
                        )}
                    >
                        {(item) => (
                            <Table.Row key={item.id}>
                                {columns.map(column => (
                                    <Table.Cell key={column.id}>
                                        {column.cell(item)}
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
            <Pagination className="my-3" >
                <Pagination.List>
                    <Pagination.Item isDisabled={!data.prev_page || loading} segment="previous" onAction={() => handlePageChange(currentPage - 1)} />
                    <Pagination.Item intent="outline">
                        Page {currentPage}
                    </Pagination.Item>
                    <Pagination.Item isDisabled={!data.next_page || loading} segment="next" onAction={() => handlePageChange(currentPage + 1)} />
                </Pagination.List>
            </Pagination>
        </div>
    );
};
