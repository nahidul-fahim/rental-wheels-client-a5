/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RHFormProvider from '@/components/form/RHFormProvider';
import RHInput from '@/components/form/RHInput';
import RHFileSelect from '@/components/form/RHFileSelect';
import RHTextArea from '@/components/form/RHTextarea';
import { useAddCarMutation, useGetAllCarsQuery, useUpdateCarMutation } from '@/redux/features/car/carApi';
import { toast } from 'sonner';
import RHRadio from '@/components/form/RHRadio';
import useToken from '@/hooks/useToken';
import Loading from '@/components/loading/Loading';

interface Car {
    _id: string;
    name: string;
    description: string;
    color: string;
    isElectric: boolean | string;
    features: string[];
    pricePerHour: number;
    status: string;
    carType: string;
    image: string;
}

const ManageCars: React.FC = () => {
    const token = useToken();
    const { isLoading, data, refetch } = useGetAllCarsQuery({ carType: '' });
    const [addCar] = useAddCarMutation();
    const [updateCar] = useUpdateCarMutation();
    const [isAddingCar, setIsAddingCar] = useState(false);
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [carImage, setCarImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            setCarImage(file);
        }
    };

    const onSubmit = async (data: any) => {
        const toastId = toast.loading(editingCar ? "Updating car..." : "Adding car...");
        try {
            const formData = new FormData();
            if (carImage) {
                formData.append("file", carImage);
            }
            const carData = {
                name: data.name,
                description: data.description,
                color: data.color,
                isElectric: data.isElectric === 'true',
                features: data.features.split(',').map((feature: string) => feature.trim()),
                pricePerHour: parseFloat(data.pricePerHour),
                carType: data.carType,
            };
            formData.append("data", JSON.stringify(carData));

            if (editingCar) {
                await updateCar({ id: editingCar._id, carData: formData, token: token as string }).unwrap();
                refetch();
                toast.success("Car updated successfully", { id: toastId });
            } else {
                await addCar({ carData: formData, token: token as string }).unwrap();
                refetch();
                toast.success("Car added successfully", { id: toastId });
            }
            setIsAddingCar(false);
            setEditingCar(null);
            setCarImage(null);
        } catch (error: any) {
            const errorMessage = error.data?.message || "Something went wrong";
            toast.error(errorMessage, { id: toastId });
        }
    };

    const handleEdit = (car: Car) => {
        setEditingCar({
            ...car,
            isElectric: car.isElectric.toString(),
            // features: car.features?.join(', ')
            features: car.features || []
        });
        setIsAddingCar(true);
        setCarImage(null);
    };

    if (isLoading) return <Loading />;
    const cars = data?.data?.allCars || [];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Manage Cars</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={() => { setIsAddingCar(true); setEditingCar(null); setCarImage(null); }} className="mb-4">Add New Car</Button>
                {isAddingCar && (
                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle>{editingCar ? 'Edit Car' : 'Add New Car'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RHFormProvider
                                onSubmit={onSubmit}
                                defaultValues={editingCar ? {
                                    ...editingCar,
                                    image: undefined // Remove image from default values
                                } : {
                                    name: '',
                                    description: '',
                                    color: '',
                                    isElectric: 'false',
                                    features: '',
                                    pricePerHour: '',
                                    carType: ''
                                }}
                            >
                                <div className="space-y-4">
                                    <RHInput type="text" name="name" label="Car Name" />
                                    <RHTextArea name="description" label="Description" placeholder="Enter car description..." />
                                    <RHInput type="text" name="color" label="Color" />
                                    <RHRadio
                                        name="isElectric"
                                        label="Is Electric?"
                                        options={[
                                            { label: 'Yes', value: 'true' },
                                            { label: 'No', value: 'false' },
                                        ]}
                                    />
                                    <RHTextArea name="features" label="Features" placeholder="Enter car features, separated by commas..." />
                                    <RHInput type="number" name="pricePerHour" label="Price Per Hour" step={0.01} />
                                    <RHInput type="text" name="carType" label="Car Type" />
                                    <RHFileSelect name="image" label="Car Image" onChange={handleImageChange} />
                                    {editingCar && editingCar.image && (
                                        <div>
                                            <p>Current image:</p>
                                            <img src={editingCar.image} alt="Current car" style={{ maxWidth: '200px' }} />
                                        </div>
                                    )}
                                    <Button type="submit">{editingCar ? 'Update Car' : 'Add Car'}</Button>
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
                        {cars.map((car: Car) => (
                            <TableRow key={car._id}>
                                <TableCell>{car?.name}</TableCell>
                                <TableCell className='capitalize'>{car?.status}</TableCell>
                                <TableCell>{car?.carType}</TableCell>
                                <TableCell>${car?.pricePerHour}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(car)}>Edit</Button>
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