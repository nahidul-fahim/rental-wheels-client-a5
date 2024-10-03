import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAllBookingsQuery } from '@/redux/features/bookings/bookingsApi';
import useToken from '@/hooks/useToken';

interface Booking {
    id: string;
    carName: string;
    userName: string;
    startDate: string;
    endDate: string;
    status: 'Pending' | 'Approved' | 'Cancelled';
}

const ManageBookings: React.FC = () => {
    const token = useToken();
    const { data, isLoading } = useAllBookingsQuery({ token: token as string });

    console.log("All booking =>", data);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const bookings = data?.data;

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
                            <TableRow key={booking._id}>
                                <TableCell>{booking?.car?.name}</TableCell>
                                <TableCell>{booking?.user?.name}</TableCell>
                                <TableCell>{booking?.date}</TableCell>
                                <TableCell>{booking?.end}</TableCell>
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