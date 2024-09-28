import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // sign up user
        signup: builder.mutation({
            query: (signupInfo) => ({
                url: '/auth/signup',
                method: 'POST',
                body: signupInfo
            }),
        }),

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
    useSignupMutation,
    useSigninMutation
} = authApi;