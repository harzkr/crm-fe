import React from "react";
import Admin from "./Admin";
import { useQuery } from "react-query";
import { ApiResponse } from "../../utils/ApiResponse";

const AdminContainer = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const generalDataUsers = async ({ page, rowsPerPage }) => {
    try {
      const response = await ApiResponse(
        "get",
        "/v1/users/general-data-users",
        {
          params: { page: page + 1, limit: rowsPerPage },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading } = useQuery(
    ["generalDataUsers", { page, rowsPerPage }],
    () => generalDataUsers({ page, rowsPerPage }),
    { keepPreviousData: true }
  );

  const _props = {
    data: data && data.data ? data.data.docs : [],
    isLoading: isLoading,
    totalCount: data && data.data ? data.data.totalDocs : 0,
    setPage,
    setRowsPerPage,
    rowsPerPage,
    currentPage: page,
  };

  return <Admin {..._props} />;
};

export default AdminContainer;
