import { baseApi } from "@/redux/api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // create a booking
        createBooking: builder.mutation({
            query: ({ token, bookingData }: { token: string, bookingData: Record<string, unknown> }) => ({
                url: '/bookings',
                method: 'POST',
                body: bookingData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),

        // get dashboard info
        dashboardInfo: builder.query({
            query: ({ token }: { token: string }) => ({
                url: '/bookings/dashboard-info',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),

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

        // get user bookings
        userBookings: builder.query({
            query: ({ token }: { token: string }) => ({
                url: '/bookings/my-bookings',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),

        // update a booking status
        updateBookingStatus: builder.mutation({
            query: ({ token, bookingId, updatedInfo }: { token: string, bookingId: string, updatedInfo: Record<string, unknown> }) => ({
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
    useCreateBookingMutation,
    useDashboardInfoQuery,
    useAllBookingsQuery,
    useUserBookingsQuery,
    useUpdateBookingStatusMutation
} = bookingsApi;