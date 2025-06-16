import { Base } from '@/types/base';
import { per_page } from '@/utils/constant';
import { ColumnDef, flexRender, getCoreRowModel, RowSelectionState, useReactTable } from '@tanstack/react-table';
import { IconDotsVertical, IconEye, IconEyeOff, IconLoader2, IconSortAsc, IconSortDesc } from 'justd-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import CustomCheckbox from './custom-checkbox';
import { Button, Checkbox, Pagination, Popover, Select, Table as TablePrimivite } from './ui';

type NextTableProps<T> = {
  columns: ColumnDef<T>[];
  fetchData: (params: Record<string, any>) => Promise<Base<T[]>>;
  onSuccess?: (data: Base<T[]>) => void;
  onError?: (error: any) => void;
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  rowHeader: any;
  onRowSelectionChange?: (selectedRowIds: string[]) => void;
  enableRowSelection?: boolean;
};

export const NextTable = <T extends any>({
  columns,
  fetchData,
  onError,
  onSuccess,
  filters,
  setFilters,
  rowHeader = 'id',
  onRowSelectionChange,
  enableRowSelection = true
}: NextTableProps<T>) => {
  const [data, setData] = useState<Base<any[]>>({ items: [] });
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' } | null>(null);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const first = useRef(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = {
        ...(filters && typeof filters === 'object'
          ? Object.entries(filters).reduce(
              (acc, [key, value]) => {
                if (key == 'page' || key == 'per_page') {
                  acc[key] = value;
                }

                if (value !== undefined && value !== '' && key !== 'page' && key !== 'per_page') {
                  acc[`filter[${key}]`] = value;
                }
                return acc;
              },
              {} as Record<string, any>
            )
          : {}),
        ...(sort && {
          sort: sort.direction === 'desc' ? `-${sort.field}` : sort.field
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

  // TODO: it will load in the first render twice, idk why?
  useEffect(() => {
    loadData();
  }, [filters, sort]);

  const display = useMemo(() => {
    const payload = [];

    if (enableRowSelection) {
      payload.push({
        id: 'select',
        header: ({ table }) => {
          const allSelected = Object.keys(rowSelection).length === table.getRowModel().rows.length;
          const someSelected = Object.keys(rowSelection).length > 0 && !allSelected;

          return (
            <CustomCheckbox
              type="checkbox"
              checked={allSelected}
              indeterminate={someSelected}
              onChange={(e) => {
                if (e.target.checked) {
                  const newSelection = table.getRowModel().rows.reduce((acc, row) => {
                    acc[row.original[rowHeader]] = true;
                    return acc;
                  }, {} as RowSelectionState);
                  setRowSelection(newSelection);
                  onRowSelectionChange?.(Object.keys(newSelection).filter((id) => newSelection[id]));
                } else {
                  setRowSelection({});
                  onRowSelectionChange?.([]);
                }
              }}
            />
          );
        },
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={!!rowSelection[row.original[rowHeader]]}
            onChange={() => {
              const newSelection = { ...rowSelection };
              const rowId = row.original[rowHeader];

              if (newSelection[rowId]) {
                delete newSelection[rowId];
              } else {
                newSelection[rowId] = true;
              }

              setRowSelection(newSelection);
              onRowSelectionChange?.(Object.keys(newSelection).filter((id) => newSelection[id]));
            }}
          />
        )
      });
    }

    payload.push(...columns);

    return payload;
  }, [rowSelection, columns, enableRowSelection, rowHeader]);

  const table = useReactTable({
    data: data?.items ?? [],
    columns: display,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    manualExpanding: true,
    manualGrouping: true,
    enableRowSelection: true,
    state: {
      rowSelection
    }
  });

  return (
    <div className="bg-white min-w-full overflow-hidden has-[table]:p-0 **:data-[slot=table-cell]:px-6 **:data-[slot=table-column]:px-6 [&:has(table)+[data-slot=card-footer]]:py-5">
      <div className="flex flex-row gap-4 mb-2">
        <Popover>
          <Button intent="outline" size="small">
            <IconEye />
            Display Table
          </Button>
          <Popover.Content>
            <Popover.Body>
              {table.getAllColumns().map((column) => (
                <Checkbox
                  isDisabled={!column.getCanHide()}
                  defaultSelected={column.getIsVisible()}
                  onChange={(selected) => {
                    column.toggleVisibility(selected);
                  }}
                >
                  {<>{column.columnDef.header}</>}
                </Checkbox>
              ))}
            </Popover.Body>
          </Popover.Content>
        </Popover>
      </div>
      <div aria-label="table" className="overflow-x-auto w-full">
        <TablePrimivite className="min-w-full">
          <TablePrimivite.Header>
            {table.getHeaderGroups().map((group) => (
              <>
                {group.headers.map((header) => {
                  return (
                    <TablePrimivite.Column key={header.id} isRowHeader={true}>
                      <div className="w-full flex flex-row justify-between items-center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.id != 'action' && header.id != 'select' && (
                          <Popover>
                            <Button intent="plain" size="small" className="size-8 p-0">
                              <IconDotsVertical />
                            </Button>
                            <Popover.Content>
                              <Popover.Body>
                                <Button
                                  size="small"
                                  intent="plain"
                                  className="flex flex-row items-center justify-start border-b"
                                  onPress={() => {
                                    header.column.toggleVisibility(false);
                                  }}
                                >
                                  <IconEyeOff />
                                  Hide Column
                                </Button>
                                <Button
                                  size="small"
                                  intent="plain"
                                  className="flex flex-row items-center justify-start border-b"
                                  onPress={() => {
                                    setSort({
                                      field: header.column.id,
                                      direction: 'asc' as const
                                    });
                                  }}
                                >
                                  <IconSortAsc />
                                  Sort By ASC
                                </Button>
                                <Button
                                  size="small"
                                  intent="plain"
                                  className="flex flex-row items-center justify-start border-b"
                                  onPress={() => {
                                    setSort({
                                      field: header.column.id,
                                      direction: 'desc' as const
                                    });
                                  }}
                                >
                                  <IconSortDesc />
                                  Sort By DESC
                                </Button>
                                {/* {header.column.getCanSort() && (

                                )} */}
                              </Popover.Body>
                            </Popover.Content>
                          </Popover>
                        )}
                      </div>
                    </TablePrimivite.Column>
                  );
                })}
              </>
            ))}
          </TablePrimivite.Header>
          <TablePrimivite.Body
            items={data?.items ?? []}
            renderEmptyState={() => (
              <div className="flex flex-col items-center justify-center p-4">
                {loading ? <IconLoader2 className="h-6 w-6 animate-spin mx-auto" /> : 'No data found'}
              </div>
            )}
          >
            {table.getRowModel().rows.map((row) => {
              return (
                <TablePrimivite.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TablePrimivite.Cell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TablePrimivite.Cell>
                    );
                  })}
                </TablePrimivite.Row>
              );
            })}
          </TablePrimivite.Body>
        </TablePrimivite>
      </div>
      <div className="flex flex-row justify-between items-center m-4" aria-label="pagination">
        <Pagination className="mx-0 w-44">
          <Pagination.List>
            <Pagination.Item
              isDisabled={!data?.prev_page || loading}
              segment="previous"
              onAction={() => {
                setFilters({
                  ...filters,
                  page: data?.prev_page
                });
              }}
            />
            <Pagination.Item intent="outline">Page {data?.current_page ?? 1}</Pagination.Item>
            <Pagination.Item
              isDisabled={!data?.next_page || loading}
              segment="next"
              onAction={() => {
                setFilters({
                  ...filters,
                  page: data?.next_page
                });
              }}
            />
          </Pagination.List>
        </Pagination>
        <div>
          <Select
            selectedKey={filters.per_page ?? '10'}
            onSelectionChange={(key) => {
              setFilters({
                ...filters,
                per_page: Number(key)
              });
            }}
          >
            <Select.Trigger />
            <Select.List items={per_page}>
              {(item) => (
                <Select.Option key={item.value} id={item.value} textValue={item.value}>
                  {item.label}
                </Select.Option>
              )}
            </Select.List>
          </Select>
        </div>
      </div>
    </div>
  );
};
