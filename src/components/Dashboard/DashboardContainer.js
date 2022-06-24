import React from "react";
import { useQuery, useMutation } from "react-query";
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

  const createConversation = async (user) => {
    try {
      const response = await ApiResponse("post", "/v1/conversations/create", {
        participants: [
          {
            userId: user._id,
            name: user.name,
            email: user.email,
          },
          {
            userId: localStorage.getItem("userId"),
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
          },
        ],
      });

      return response;
    } catch (err) {
      console.log(err.data.message);
    }
  };

  const { data: dataUsers } = useQuery("users", getAllUsers);
  const { mutate, data: dataConversation } = useMutation(createConversation);

  console.log(dataConversation, 'check on created conversation');

  const _props = {
    platformUsers: dataUsers ? dataUsers.data : [],
    createConversation: mutate,
    dataConversation
  };

  return <Dashboard {..._props} />;
};

export default DashboardContainer;
