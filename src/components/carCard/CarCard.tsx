import { IoCarSport } from "react-icons/io5";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { TSingleCar } from "@/types/allTypes";


const CarCard = ({ car }: { car: TSingleCar }) => {
    return (
        <Card key={car._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
            <img src={car.image} alt={car.name} className="w-full h-56 object-cover" />
            <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{car.name}</h3>
                <p className="text-gray-600 mb-4">Type: {car.carType}</p>
                <p className="text-2xl font-bold text-primary">${car.pricePerHour} <span className="text-sm text-gray-500">per hour</span></p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-6">
                <Button className="w-full">
                    <IoCarSport className="mr-2 text-xl" /> View Details
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CarCard;