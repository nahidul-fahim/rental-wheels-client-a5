/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAllBookingsQuery, useUpdateBookingStatusMutation } from '@/redux/features/bookings/bookingsApi';
import useToken from '@/hooks/useToken';
import { toast } from 'sonner';
import Loading from '@/components/loading/Loading';

const ManageBookings: React.FC = () => {
    const token = useToken();
    const { data, isLoading, refetch } = useAllBookingsQuery({ token: token as string });
    const [updateBookingStatus, { isLoading: isUpdating }] = useUpdateBookingStatusMutation();

    if (isLoading) {
        return <Loading />;
    }

    const bookings = data?.data;

    const handleApprove = async (id: string) => {
        const toastId = toast.loading('Approving booking...');
        const updatedStatus = {
            status: 'approved'
        };
        const res = await updateBookingStatus({ token: token as string, bookingId: id, updatedInfo: updatedStatus }).unwrap();
        if (res.success) {
            refetch();
            toast.success('Booking approved', { id: toastId, duration: 2000 });
        } else {
            toast.error('Failed to approve booking', { id: toastId, duration: 2000 });
        }
    };

    const handleCancel = async (id: string) => {
        const toastId = toast.loading('Cancelling booking...');
        const updatedStatus = {
            status: 'cancelled'
        };
        const res = await updateBookingStatus({ token: token as string, bookingId: id, updatedInfo: updatedStatus }).unwrap();
        if (res.success) {
            refetch();
            toast.success('Booking cancelled', { id: toastId, duration: 2000 });
        } else {
            toast.error('Failed to cancel booking', { id: toastId, duration: 2000 });
        }
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
                            <TableHead>Date</TableHead>
                            <TableHead>Start Time</TableHead>
                            <TableHead>End Time</TableHead>
                            <TableHead>Price per hour</TableHead>
                            <TableHead>Total Cost</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings?.map((booking: any) => (
                            <TableRow key={booking._id}>
                                <TableCell>{booking?.car?.name}</TableCell>
                                <TableCell>{booking?.user?.name}</TableCell>
                                <TableCell>{booking?.date}</TableCell>
                                <TableCell>{booking?.startTime}</TableCell>
                                <TableCell>{booking?.endTime}</TableCell>
                                <TableCell>${booking?.car?.pricePerHour}</TableCell>
                                <TableCell>${booking?.totalCost}</TableCell>
                                <TableCell>
                                    <Badge className='capitalize' variant={booking?.status === 'approved' ? 'success' : 'warning'}>{booking.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    {booking.status.toLowerCase() === 'pending' && (
                                        <>
                                            <Button
                                                onClick={() => handleApprove(booking._id)}
                                                variant="outline"
                                                size="sm"
                                                className="mr-2"
                                                disabled={isUpdating}
                                            >
                                                Approve
                                            </Button>

                                            <Button
                                                onClick={() => handleCancel(booking._id)}
                                                variant="destructive"
                                                size="sm"
                                                disabled={isUpdating}
                                            >
                                                Cancel
                                            </Button>
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