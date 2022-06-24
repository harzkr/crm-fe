import React from "react";
import { useQuery } from "react-query";
import Dashboard from "./Dashboard";
import { ApiResponse } from "../../utils/ApiResponse";

const DashboardContainer = () => {

  const getAllUsers = async () => {
    try {
      const response = await ApiResponse("get", "/v1/users/all-users");
      return response;
    } catch (err) {
      console.log(err.data.message);
    }
  };

  const {
    data: dataUsers
  } = useQuery("users", getAllUsers);

  console.log(dataUsers);

  const _props = {
    platformUsers: dataUsers ? dataUsers.data : [],
  };

  return <Dashboard {..._props} />;
};

export default DashboardContainer;