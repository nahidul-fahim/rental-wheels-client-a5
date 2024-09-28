import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // sign in user
        signin: builder.mutation({
            query: (signinInfo) => ({
                url: '/auth/signin',
                method: 'POST',
                body: signinInfo
            }),
        }),
    }),
});

export const {
    useSigninMutation
} = authApi;