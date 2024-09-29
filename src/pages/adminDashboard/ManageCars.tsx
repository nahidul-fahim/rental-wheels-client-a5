import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RHFormProvider from '@/components/form/RHFormProvider';
import RHInput from '@/components/form/RHInput';
import RHFileSelect from '@/components/form/RHFileSelect';
import RHTextArea from '@/components/form/RHTextarea';
import { useGetAllCarsQuery } from '@/redux/features/car/carApi';

interface Car {
    id: string;
    name: string;
    model: string;
    year: number;
    features: string;
    pricePerHour: number;
    image: string;
}

const ManageCars: React.FC = () => {
    const carType = "all";
    const { isLoading, data } = useGetAllCarsQuery({ carType });
    const [isAddingCar, setIsAddingCar] = useState(false);

    const onSubmit = (data: any) => {
        const newCar: Car = {
            id: Date.now().toString(),
            ...data,
            image: URL.createObjectURL(data.image[0])
        };
        setCars([...cars, newCar]);
        setIsAddingCar(false);
    };

    if (isLoading) return <div>Loading...</div>
    const cars = data?.data?.allCars;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Manage Cars</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={() => setIsAddingCar(true)} className="mb-4">Add New Car</Button>
                {isAddingCar && (
                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle>Add New Car</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RHFormProvider onSubmit={onSubmit}>
                                <div className="space-y-4">
                                    <RHInput type="text" name="name" label="Car Name" />
                                    <RHInput type="text" name="model" label="Model" />
                                    <RHInput type="number" name="year" label="Year" />
                                    <RHTextArea name="features" label="Features" placeholder="Enter car features..." />
                                    <RHInput type="number" name="pricePerHour" label="Price Per Hour" step={0.01} />
                                    <RHFileSelect name="image" label="Car Image" />
                                    <Button type="submit">Add Car</Button>
                                </div>
                            </RHFormProvider>
                        </CardContent>
                    </Card>
                )}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Car Type</TableHead>
                            <TableHead>Price Per Hour</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cars.map((car) => (
                            <TableRow key={car.id}>
                                <TableCell>{car?.name}</TableCell>
                                <TableCell className='capitalize'>{car?.status}</TableCell>
                                <TableCell>{car?.carType}</TableCell>
                                <TableCell>${car?.pricePerHour}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                    <Button variant="destructive" size="sm">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ManageCars;