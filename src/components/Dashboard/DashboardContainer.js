import React from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import Dashboard from "./Dashboard";
import { ApiResponse } from "../../utils/ApiResponse";
import { useNavigate } from "react-router-dom";

const DashboardContainer = () => {
  const navigate = useNavigate();
  const getAllUsers = async ({ pageParam = 1 }) => {
    try {
      const response = await ApiResponse("get", "/v1/users/all-users", {
        params: { page: pageParam },
      });
      return response;
    } catch (err) {
      if (err.data.message === "Please authenticate") {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
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

  const {
    isLoading,
    isError,
    error,
    data: dataUsers,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("users", getAllUsers, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });
  const { mutate, data: dataConversation } = useMutation(createConversation);

  console.log(dataUsers);
  const _props = {
    platformUsers: dataUsers ? dataUsers.pages : [],
    createConversation: mutate,
    dataConversation: dataConversation ? dataConversation.data : null,
  };

  return <Dashboard {..._props} />;
};

export default DashboardContainer;
