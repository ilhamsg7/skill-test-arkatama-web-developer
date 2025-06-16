import { useState } from "react";

export const usePagination = ({ intitial = 10 }) => {
    const [pagination, setPagination] = useState({
        pageSize: intitial,
        pageIndex: 0,
    });
    const { pageSize, pageIndex } = pagination;

    return {
        // table state
        onPaginationChange: setPagination,
        pagination,
        // API
        limit: pageSize,
        skip: pageSize * pageIndex,
    };
}