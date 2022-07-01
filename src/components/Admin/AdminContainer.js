import React from "react";
import Admin from "./Admin";
import { useQuery } from "react-query";
import { ApiResponse } from "../../utils/ApiResponse";

const AdminContainer = () => {
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  }

  const generalDataUsers = async ({
    pageIndex,
    pageSize,
  }) => {
    try {
      const response = await ApiResponse(
        "get",
        "/v1/users/general-data-users",
        {
          params: { page: pageIndex+1, limit: pageSize },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const { data, isLoading } = useQuery(
    ["generalDataUsers", fetchDataOptions],
    () => generalDataUsers(fetchDataOptions),
    { keepPreviousData: true }
  );

  console.log(data);

  const _props = {
    data: data && data.data ? data.data.docs : [],
    isLoading: isLoading,
    setPage: setPagination,
    pageCount: data && data.data ? data.data.totalPages : 0,
    pagination
  };

  return <Admin {..._props} />;
};

export default AdminContainer;
