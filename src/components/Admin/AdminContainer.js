import React from "react";
import Admin from "./Admin";
import { useQuery } from "react-query";
import { ApiResponse } from "../../utils/ApiResponse";

const AdminContainer = () => {
  const [page, setPage] = React.useState(1);

  const generalDataUsers = async (page) => {
    try {
      const response = await ApiResponse("get", "v1/users/general-data-users", {
        params: { page: page },
      });
      return response;
    } catch (err) {
      console.log(err.data.message);
    }
  };

  const { data, isLoading, error } = useQuery(
    ["generalDataUsers", page],
    () => generalDataUsers(page),
    { keepPreviousData: true }
  );

  const _props = {
    data: data,
    isLoading: isLoading,
    setPage: setPage,
  };

  return <Admin {..._props} />;
};

export default AdminContainer;
