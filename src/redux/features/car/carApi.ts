import { baseApi } from "@/redux/api/baseApi";

const carApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all cars
        getAllCars: builder.query({
            query: ({ carType = '' }) => ({
                url: `/cars?carType=${carType === "all" ? "" : carType}`,
                method: "GET"
            })
        }),

        // get single car
        getSingleCar: builder.query({
            query: (id) => ({
                url: `/cars/${id}`,
                method: "GET"
            })
        })
    })
});

export const {
    useGetAllCarsQuery,
    useGetSingleCarQuery
} = carApi;