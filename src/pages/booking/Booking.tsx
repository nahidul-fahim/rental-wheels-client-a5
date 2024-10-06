/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IoCarSport, IoChevronForward, IoHome, IoSearch } from "react-icons/io5";
import { useGetAllCarsQuery } from '@/redux/features/car/carApi';
import { Link } from 'react-router-dom';

const Booking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [carType, setCarType] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { isLoading, data } = useGetAllCarsQuery({ carType, searchTerm, minPricePerHour: minPrice, maxPricePerHour: maxPrice });

  if (isLoading) return <div>Loading...</div>;

  const allCars = data?.data?.allCars;
  const uniqueCarTypes = data?.data?.uniqueCarTypes;
  const availableMaxPrice = data?.data?.maxPricePerHour;

  const handleSearchClick = () => {
    setShowResults(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-primary">Find Your Ideal Ride</h1>
      {/* breadcrumb */}
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
            <span className="ml-2 text-gray-700 font-medium">Booking</span>
          </li>
        </ol>
      </nav>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className='flex items-center justify-start gap-2'>
              <IoSearch className='text-2xl' />
              Advanced Search
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="carName" className="text-sm font-medium">Car Name</label>
              <Input
                id="carName"
                placeholder="e.g., Tesla Model 3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="carType" className="text-sm font-medium">Car Type</label>
              <Select value={carType} onValueChange={(value) => setCarType(value)}>
                <SelectTrigger id="carType">
                  <SelectValue placeholder="Select car type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {
                    uniqueCarTypes.map((type: string) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="minPrice" className="text-sm font-medium">Minimum Price ($)</label>
              <Input
                id="minPrice"
                type="number"
                placeholder="Min price"
                // value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                className="w-full"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="maxPrice" className="text-sm font-medium">Maximum Price ($)</label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="Max price"
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full"
                min={0}
                max={availableMaxPrice}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {/* Button to trigger search */}
          <Button className="w-full bg-primary text-white hover:bg-primary-dark transition-colors duration-300" onClick={handleSearchClick}>
            Search Cars
          </Button>
        </CardFooter>
      </Card>

      {/* Show search results */}
      {showResults && (
        <>
          {
            allCars.length === 0 ?
              <div className='w-full text-center'>No cars found</div>
              :
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                  allCars.map((car: any) => (
                    <Card key={car.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <img src={car.image} alt={car.name} className="w-full h-64 object-cover" />
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <span>{car.name}</span>
                          <Badge variant="secondary">{car.type}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-gray-600 mb-4">{(car.description).substring(0, 130)}...</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-2 mb-2">
                          {car.features.map((feature: string[], index: number) => (
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
                  ))
                }
              </div>
          }
        </>
      )}
    </div>
  );
};

export default Booking;
