import { IoCarSport } from "react-icons/io5";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { TSingleCar } from "@/types/allTypes";
import { Link } from "react-router-dom";


const CarCard = ({ car }: { car: TSingleCar }) => {

    return (
        <Card key={car._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
            <img src={car.image} alt={car.name} className="w-full h-56 object-cover" />
            <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-secondary">{car.name}</h3>
                <p className="bg-secondary/10 px-2 py-1/2 rounded-lg text-sm text-body w-fit mb-3">{car.carType}</p>
                <p className="text-2xl font-bold text-primary">${car.pricePerHour} <span className="text-sm text-body">per hour</span></p>
            </CardContent>
            <CardFooter className="bg-gray-100 p-6">
                <Link to={`/cars/${car._id}`}>
                    <Button className="w-full">
                        <IoCarSport className="mr-2 text-xl" /> View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default CarCard;