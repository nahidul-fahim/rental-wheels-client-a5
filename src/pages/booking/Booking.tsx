import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, DollarSign } from 'lucide-react';

type CarType = 'Sedan' | 'SUV' | 'Sports Car' | 'Hatchback' | 'Van' | '';

interface Car {
  id: number;
  name: string;
  type: Exclude<CarType, ''>;
  description: string;
  features: string[];
  price: number;
  image: string;
}

const Booking: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<CarType>('');
  const [featureFilter, setFeatureFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simulated search results - replace with actual API call
    const results: Car[] = [
      { id: 1, name: "Tesla Model 3", type: "Sedan", description: "Luxurious electric sedan with cutting-edge technology and impressive range.", features: ["Electric", "Autopilot", "Premium Sound"], price: 300, image: "/api/placeholder/400/250" },
      { id: 2, name: "Toyota RAV4", type: "SUV", description: "Versatile and reliable SUV, perfect for family trips and outdoor adventures.", features: ["Hybrid", "AWD", "Lane Assist"], price: 200, image: "/api/placeholder/400/250" },
      { id: 3, name: "Porsche 911", type: "Sports Car", description: "Iconic sports car offering exhilarating performance and timeless design.", features: ["High Performance", "Leather Interior", "Sport Mode"], price: 500, image: "/api/placeholder/400/250" },
    ];
    setCars(results);
  };

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    (typeFilter === '' || car.type === typeFilter) &&
    (featureFilter === '' || car.features.some(f => f.toLowerCase().includes(featureFilter.toLowerCase()))) &&
    car.price >= priceRange[0] && car.price <= priceRange[1]
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-primary">Find Your Ideal Ride</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2" /> Advanced Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="carName" className="text-sm font-medium">Car Name</label>
                <Input
                  id="carName"
                  placeholder="e.g., Tesla Model 3"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="carType" className="text-sm font-medium">Car Type</label>
                <Select value={typeFilter} onValueChange={(value: CarType) => setTypeFilter(value)}>
                  <SelectTrigger id="carType">
                    <SelectValue placeholder="Select car type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Sports Car">Sports Car</SelectItem>
                    <SelectItem value="Hatchback">Hatchback</SelectItem>
                    <SelectItem value="Van">Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="features" className="text-sm font-medium">Features</label>
              <Input
                id="features"
                placeholder="e.g., Electric, AWD, Leather"
                value={featureFilter}
                onChange={(e) => setFeatureFilter(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
              <Slider
                min={0}
                max={1000}
                step={50}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-white">Search Cars</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <Card key={car.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{car.name}</span>
                <Badge variant="secondary">{car.type}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 mb-4">{car.description}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {car.features.map((feature, index) => (
                  <Badge key={index} variant="outline">{feature}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-primary">
                  <DollarSign className="w-5 h-5 mr-1" />
                  <span className="text-lg font-bold">{car.price}</span>
                  <span className="text-sm ml-1">/ day</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary text-white hover:bg-primary-dark transition-colors duration-300">Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Booking;