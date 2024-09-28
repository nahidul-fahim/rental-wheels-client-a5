import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IoFilter, IoHome, IoChevronForward } from "react-icons/io5";
import { useGetAllCarsQuery } from '@/redux/features/car/carApi';
import { TSingleCar } from '@/types/allTypes';
import CarCard from '@/components/carCard/CarCard';

const Car = () => {
    const [carType, setCarType] = useState('');

    const { isLoading, data } = useGetAllCarsQuery({ carType });

    if (isLoading) return <div>Loading...</div>
    const allCars = data?.data?.allCars;
    const uniqueCarTypes = data?.data?.uniqueCarTypes;

    return (

        <div className="min-h-screen bg-gray-50">
            {/* Header Image Section */}
            <div
                className="relative h-80 bg-cover bg-center"
                style={{ backgroundImage: "url('/bg/carBg.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white text-center">Discover Your Perfect Ride</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center text-gray-500 mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <a href="/" className="hover:text-primary flex items-center">
                                <IoHome className="flex-shrink-0 h-5 w-5" />
                                <span className="sr-only">Home</span>
                            </a>
                        </li>
                        <li className="flex items-center">
                            <IoChevronForward className="flex-shrink-0 h-5 w-5" />
                            <span className="ml-2 text-gray-700 font-medium">Cars</span>
                        </li>
                    </ol>
                </nav>

                {/* Filter Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                            <IoFilter className="mr-2 text-primary" /> Filter by Car Type
                        </h2>
                        <Select onValueChange={setCarType} value={carType}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                {
                                    uniqueCarTypes?.map((type: string, idx: number) => (
                                        <SelectItem key={idx} value={type}>{type}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Car Listings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allCars?.map((car: TSingleCar) => (
                        <CarCard key={car._id} car={car} />
                    ))}
                </div>
                {allCars?.length === 0 && (
                    <p className="text-center text-gray-600 mt-8 text-xl">No cars available for the selected type.</p>
                )}
            </div>
        </div>
    );
};

export default Car;