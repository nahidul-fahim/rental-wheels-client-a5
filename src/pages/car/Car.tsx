import { useGetAllCarsQuery } from "@/redux/features/car/carApi";


const Car = () => {

    const { isLoading, data } = useGetAllCarsQuery();

    console.log("All cars data =>", data);


    return (
        <div>
            <h1 className="text-3xl font-semibold text-orange-500">All cars are here</h1>
        </div>
    );
};

export default Car;