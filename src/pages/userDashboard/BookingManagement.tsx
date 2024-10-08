/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUpdateBookingStatusMutation, useUserBookingsQuery } from '@/redux/features/bookings/bookingsApi';
import useToken from '@/hooks/useToken';
import { toast } from 'sonner';
import RHFormProvider from '@/components/form/RHFormProvider';
import RHInput from '@/components/form/RHInput';
import RHDatePicker from '@/components/form/RHDatePicker';
import RHCheckbox from '@/components/form/RHCheckbox';
import RHRadio from '@/components/form/RHRadio';
import Loading from '@/components/loading/Loading';

const BookingManagement = () => {
  const token = useToken();
  const { isLoading: userBookingLoading, data: userBookingData, refetch } = useUserBookingsQuery({ token: token as string });
  const [modifyingBooking, setModifyingBooking] = useState<any>(null);
  const [updateBookingStatus, { isLoading: isUpdating }] = useUpdateBookingStatusMutation();

  const handleModifyBooking = (booking: any) => {
    setModifyingBooking(booking);
  };

  const handleCancelBooking = async (id: string) => {
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
  const handleCancelModification = () => {
    setModifyingBooking(null); // Clear the modification state
  };

  const onSubmit = async (data: any) => {
    try {
      // await updateBooking({ id: modifyingBooking._id, ...data }).unwrap();
      console.log("updated data", data)
      toast.success('Booking updated successfully!');
      setModifyingBooking(null); // Clear the form after successful update
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to update booking. Please try again.';
      toast.error(errorMessage);
    }
  };

  if (userBookingLoading) {
    return <Loading />;
  }

  const userBookings = userBookingData?.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Management</CardTitle>
      </CardHeader>
      <CardContent>
        {modifyingBooking ? (
          <div>
            <RHFormProvider className='space-y-4' onSubmit={onSubmit}>
              <RHInput
                name="car"
                label="Car"
                defaultValue={modifyingBooking.car.name}
                type="text"
                required
              />
              <RHInput
                name="name"
                label="Name"
                defaultValue={modifyingBooking.user.name}
                type="text"
                required
              />
              <RHInput
                name="email"
                label="Email"
                defaultValue={modifyingBooking.user.email}
                type="email"
                required
              />
              <RHInput
                name="phone"
                label="Phone"
                defaultValue={modifyingBooking.user.phone}
                type="tel"
                required
              />
              <RHInput
                name="nidPassport"
                label="NID/Passport"
                defaultValue={modifyingBooking.nidPassport}
                type="text"
                required
              />
              <RHInput
                name="drivingLicense"
                label="Driving License"
                defaultValue={modifyingBooking.drivingLicense}
                type="text"
                required
              />
              <RHDatePicker
                name="date"
                label="Date"
                defaultValue={modifyingBooking.date}
                required
              />
              <RHInput
                name="startTime"
                label="Start Time"
                defaultValue={modifyingBooking.startTime}
                type="time"
                step={60}
                required
              />
              <RHRadio
                name="paymentMethod"
                label="Payment Method"
                defaultValue={modifyingBooking.paymentMethod}
                options={[
                  { label: 'Credit Card', value: 'card' },
                  { label: 'Cash', value: 'cash' },
                  { label: 'Bank Transfer', value: 'bankTransfer' },
                ]}
                required
              />
              <h3>Additional Options</h3>
              <RHCheckbox
                name="childSeat"
                label="Child Seat"
                defaultChecked={modifyingBooking.additionalOptions.childSeat}
                className='mb-2'
              />
              <RHCheckbox
                name="gpsNavigation"
                label="GPS Navigation"
                defaultChecked={modifyingBooking.additionalOptions.gpsNavigation}
                className='mb-2'
              />
              <RHCheckbox
                name="additionalDriver"
                label="Additional Driver"
                defaultChecked={modifyingBooking.additionalOptions.additionalDriver}
                className='mb-2'
              />

              <Button type="submit">Update Booking</Button>
              <Button variant="outline" onClick={handleCancelModification} className="ml-2">Cancel</Button>
            </RHFormProvider>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Car</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userBookings?.map((booking: any) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking?.car?.name}</TableCell>
                  <TableCell>{booking?.date}</TableCell>
                  <TableCell>{booking?.startTime}</TableCell>
                  <TableCell className='capitalize'>{booking.status}</TableCell>
                  <TableCell>
                    {booking.status === 'pending' && (
                      <>
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => handleModifyBooking(booking)}>
                          Modify
                        </Button>
                        <Button variant="destructive" size="sm" disabled={isUpdating} onClick={() => handleCancelBooking(booking._id)}>
                          Cancel
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingManagement;
