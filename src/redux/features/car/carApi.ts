/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const carApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // add a car
        addCar: builder.mutation({
            query: ({ carData, token }: { carData: any, token: string }) => ({
                url: `/cars`,
                method: "POST",
                body: carData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        // update a car
        updateCar: builder.mutation({
            query: ({ id, carData, token }: { id: string, carData: any, token: string }) => ({
                url: `/cars/${id}`,
                method: "PUT",
                body: carData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        // return a car
        returnCar: builder.mutation({
            query: ({ token, returnData }: { token: string, returnData: Record<string, any> }) => ({
                url: `/cars/return`,
                method: "PUT",
                body: returnData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        // get all cars
        getAllCars: builder.query({
            query: ({ carType = '', searchTerm = '', minPricePerHour = 0, maxPricePerHour = 0 }) => {
                let queryString = `/cars?minPricePerHour=${minPricePerHour}`;
                if (searchTerm !== '') {
                    queryString += `&searchTerm=${searchTerm}`;
                }
                if (maxPricePerHour > 0) {
                    queryString += `&maxPricePerHour=${maxPricePerHour}`;
                }
                if (carType !== 'all' && carType !== '') {
                    queryString += `&carType=${carType}`;
                }
                return {
                    url: queryString,
                    method: "GET"
                }
            }
        }),
        // get single car
        getSingleCar: builder.query({
            query: (id) => ({
                url: `/cars/${id}`,
                method: "GET"
            })
        }),
    })
});

export const {
    useGetAllCarsQuery,
    useGetSingleCarQuery,
    useReturnCarMutation,
    useAddCarMutation,
    useUpdateCarMutation
} = carApi;