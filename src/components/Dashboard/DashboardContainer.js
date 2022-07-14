import React from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import Dashboard from "./Dashboard";
import { ApiResponse } from "../../utils/ApiResponse";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { update } from './redux/dashboard';

const LIMIT = 20;

const DashboardContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const getAllUsers = async ({ pageParam = 1 }) => {
    try {
      const response = await ApiResponse("get", "/v1/users/all-users", {
        params: { page: pageParam, limit: LIMIT },
      });
      
      dispatch(update(response?.data?.docs));
      return response;
    } catch (err) {
      if (err.data.message === "Please authenticate") {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
      console.log(err.data.message);
    }
  };

  const searchUsers = async (data) => {
    try {
      const response = await ApiResponse("post", "/v1/users/search-users", data);
      return response;
    } catch (err) {
      console.log(err.data.message);
    }
  }

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
    data: dataUsers,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery("users", getAllUsers, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage && lastPage.data ? lastPage.data.nextPage : undefined;
    },
  });

  const { mutate, data: dataConversation } = useMutation(createConversation);

  const { mutate: searchUsersMutate, data: dataSearchUsers } = useMutation(searchUsers);

  const _props = {
    platformUsers: dataUsers ? dataUsers.pages : [],
    createConversation: mutate,
    dataConversation: dataConversation ? dataConversation.data : null,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    searchUsers: searchUsersMutate,
    searchedUsers: dataSearchUsers ? dataSearchUsers.data : [],
  };

  return <Dashboard {..._props} />;
};

export default DashboardContainer;
