import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Booking {
    id: string;
    carName: string;
    userName: string;
    startDate: string;
    endDate: string;
    status: 'Pending' | 'Approved' | 'Cancelled';
}

const ManageBookings: React.FC = () => {
    const bookings: Booking[] = [
        { id: '1', carName: 'Tesla Model 3', userName: 'John Doe', startDate: '2024-10-01', endDate: '2024-10-05', status: 'Pending' },
        { id: '2', carName: 'BMW X5', userName: 'Jane Smith', startDate: '2024-10-10', endDate: '2024-10-15', status: 'Approved' },
    ];

    const handleApprove = (id: string) => {
        console.log('Approve booking', id);
    };

    const handleCancel = (id: string) => {
        console.log('Cancel booking', id);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Manage Bookings</CardTitle>
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
                        {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.carName}</TableCell>
                                <TableCell>{booking.userName}</TableCell>
                                <TableCell>{booking.startDate}</TableCell>
                                <TableCell>{booking.endDate}</TableCell>
                                <TableCell>
                                    <Badge variant={booking.status === 'Approved' ? 'success' : 'warning'}>{booking.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    {booking.status === 'Pending' && (
                                        <>
                                            <Button onClick={() => handleApprove(booking.id)} variant="outline" size="sm" className="mr-2">Approve</Button>
                                            <Button onClick={() => handleCancel(booking.id)} variant="destructive" size="sm">Cancel</Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ManageBookings;