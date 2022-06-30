import React from "react";
import Admin from "./Admin";
import { useQuery } from "react-query";
import { ApiResponse } from "../../utils/ApiResponse";

const AdminContainer = () => {
  const [page, setPage] = React.useState(1);

  const generalDataUsers = async (page) => {
    try {
      const response = await ApiResponse(
        "get",
        "/v1/users/general-data-users",
        {
          params: { page: page },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading } = useQuery(
    ["generalDataUsers", page],
    () => generalDataUsers(page),
    { keepPreviousData: true }
  );

  console.log(data);

  const _props = {
    data: data && data.data ? data.data.docs : [],
    isLoading: isLoading,
    setPage: setPage,
  };

  return <Admin {..._props} />;
};

export default AdminContainer;
