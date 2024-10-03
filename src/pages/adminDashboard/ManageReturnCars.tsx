/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import useToken from '@/hooks/useToken';
import { useAllBookingsQuery } from '@/redux/features/bookings/bookingsApi';
import { useReturnCarMutation } from '@/redux/features/car/carApi';
import { toast } from 'sonner';

const ManageReturnCars: React.FC = () => {
    const token = useToken();
    const { data, isLoading, refetch } = useAllBookingsQuery({ token: token as string });
    const [returnCar, { isLoading: isReturnCarLoading }] = useReturnCarMutation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [endTime, setEndTime] = useState('');
    const [bookingId, setBookingId] = useState('');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const bookings = data?.data;

    // open the dialog
    const handleReturnClick = (id: string) => {
        setIsDialogOpen(true);
        setBookingId(id);
    };

    // save the end time
    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEndTime(value);
    }

    // return the car
    const handleReturn = async () => {
        const toastId = toast.loading("Returning car...");
        if (endTime) {
            const returnData = {
                bookingId,
                endTime
            }
            const res = await returnCar({ token: token as string, returnData: returnData });
            if (res?.data?.success) {
                toast.success("Car returned successfully", { id: toastId, duration: 3000 });
                refetch();
                setIsDialogOpen(false);
            }
            else {
                toast.error("Failed to return car", { id: toastId, duration: 3000 });
            }
        }
        else {
            toast.error("Please select a valid end time", { id: toastId, duration: 3000 });
        }
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
                            <TableHead>Date</TableHead>
                            <TableHead>Start Time</TableHead>
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
                                <TableCell>
                                    <Badge className='capitalize' variant={booking?.status === 'approved' ? 'success' : 'warning'}>{booking.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    {
                                        (booking?.status === "approved" && booking?.endTime === null) &&
                                        <Button
                                            onClick={() => handleReturnClick(booking?._id)}
                                            variant="outline"
                                            size="sm"
                                            disabled={isReturnCarLoading}
                                        >
                                            Return Car
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Return Car</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="endTime" className="text-right">
                                End Time <span className="text-sm text-gray-500">(24-hour)</span>
                            </label>
                            <Input
                                id="endTime"
                                type="time"
                                placeholder="HH:MM"
                                maxLength={5}
                                className="col-span-3"
                                onChange={handleEndTimeChange}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleReturn} disabled={isReturnCarLoading}>Confirm Return</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default ManageReturnCars;