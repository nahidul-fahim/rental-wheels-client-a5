/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";


const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get single user
        getUser: builder.query({
            query: ({ id, token }: { id: string, token: string }) => ({
                url: `/user/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),
        // get all users
        getAllUsers: builder.query({
            query: ({ token }: { token: string }) => ({
                url: `/users`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),
        // update user
        updateUser: builder.mutation({
            query: ({ id, updatedData, token }: { id: string, updatedData: Record<string, any>, token: string }) => ({
                url: `/user/${id}`,
                method: 'PUT',
                body: updatedData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetAllUsersQuery,
    useUpdateUserMutation,
} = userApi;
