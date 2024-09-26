import { baseApi } from "@/redux/api/baseApi";

const carApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all cars
        getAllCars: builder.query({
            query: () => ({
                url: "/cars",
                method: "GET"
            })
        })
    })
});

export const {
    useGetAllCarsQuery
} = carApi;