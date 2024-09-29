import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookedCar {
    id: string;
    carName: string;
    userName: string;
    startDate: string;
    endDate: string;
    status: 'In Use' | 'Overdue';
}

const ManageReturnCars: React.FC = () => {
    const bookedCars: BookedCar[] = [
        { id: '1', carName: 'Tesla Model 3', userName: 'John Doe', startDate: '2024-10-01', endDate: '2024-10-05', status: 'In Use' },
        { id: '2', carName: 'BMW X5', userName: 'Jane Smith', startDate: '2024-09-28', endDate: '2024-10-02', status: 'Overdue' },
    ];

    const handleReturn = (id: string) => {
        console.log('Return car', id);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Manage Returns</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Car</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookedCars.map((car) => (
                            <TableRow key={car.id}>
                                <TableCell>{car.carName}</TableCell>
                                <TableCell>{car.userName}</TableCell>
                                <TableCell>{car.startDate}</TableCell>
                                <TableCell>{car.endDate}</TableCell>
                                <TableCell>
                                    <Badge variant={car.status === 'In Use' ? 'success' : 'destructive'}>{car.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleReturn(car.id)} variant="outline" size="sm">Return Car</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ManageReturnCars;