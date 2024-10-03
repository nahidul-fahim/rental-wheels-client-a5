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

        // update a booking status
        updateBookingStatus: builder.mutation({
            query: ({ token, bookingId, updatedInfo }: { token: string, bookingId: string, updatedInfo: Record<string, string> }) => ({
                url: `/bookings/${bookingId}`,
                method: 'PUT',
                body: updatedInfo,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),
    }),
});

export const {
    useAllBookingsQuery,
    useUpdateBookingStatusMutation
} = bookingsApi;