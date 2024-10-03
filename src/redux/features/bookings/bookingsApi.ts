import { baseApi } from "@/redux/api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all bookings
        allBookings: builder.query({
            query: ({ token }: { token: string }) => ({
                url: '/bookings',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),
    }),
});

export const {
    useAllBookingsQuery
} = bookingsApi;