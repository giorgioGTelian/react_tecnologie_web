import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: [
        "User",
        "Users",
    ],
    endpoints: (build) => ({
        getUser: build.query({
        query: (id) => `general/user/${id}`,
        providesTags: ["User"],
        }),
        //get all the users
        getAllUsers: build.query({
        query: () => "general/users",
        providesTags: ["Users"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetAllUsersQuery,
} = api;