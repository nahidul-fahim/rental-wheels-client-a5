import { IoCarSport } from "react-icons/io5";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { TSingleCar } from "@/types/allTypes";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

const CarCard = ({ car }: { car: TSingleCar }) => {
    return (
        <Card key={car._id} className="flex flex-col shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={car.image} alt={car.name} className="w-full h-64 object-cover" />
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{car.name}</span>
                    <Badge variant="secondary">{car.carType}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 mb-4">{(car.description).substring(0, 130)}...</p>
                <div className="flex flex-wrap gap-x-3 gap-y-2 mb-2">
                    {car?.features?.map((feature: string, index: number) => (
                        <Badge key={index} variant="outline">{feature}</Badge>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-primary">
                        <span className="text-xl font-bold">${car.pricePerHour}</span>
                        <span className="text-sm ml-1">/ hour</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Link to={`/cars/${car._id}`} className="w-full">
                    <Button className="w-full">
                        <IoCarSport className="mr-2 text-xl" /> Book Now
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default CarCard;