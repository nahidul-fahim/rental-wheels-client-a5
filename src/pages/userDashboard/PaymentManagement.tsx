/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useToken from '@/hooks/useToken';
import { useUpdateBookingStatusMutation, useUserBookingsQuery } from '@/redux/features/bookings/bookingsApi';
import { toast } from "sonner";
import { FaDollarSign } from "react-icons/fa6";

const PaymentManagement = () => {
  const token = useToken();
  const { isLoading: userBookingLoading, data: userBookingData, refetch } = useUserBookingsQuery({ token: token as string });
  const [updateBookingStatus, { isLoading: isUpdating }] = useUpdateBookingStatusMutation();

  const handlePayment = async (id: string, amount: number) => {

    const toastId = toast.loading("Payment process going on...")
    const updatedData = {
      paidAmount: amount
    }
    const res = await updateBookingStatus({ token: token as string, bookingId: id, updatedInfo: updatedData }).unwrap();
    if (res.success) {
      refetch();
      toast.success('Payment successful!', { id: toastId, duration: 2000 });
    } else {
      toast.error('Failed to make payment!', { id: toastId, duration: 2000 });
    }
  };

  if (userBookingLoading) {
    return <div>Loading...</div>
  }
  const userBookings = userBookingData?.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>Booking ID</TableHead> */}
              <TableHead>Car Name</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Amount</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userBookings?.map((userBooking: any) => (
              <TableRow key={userBooking?._id}>
                {/* <TableCell>{userBooking?._id}</TableCell> */}
                <TableCell>{userBooking?.car?.name}</TableCell>
                <TableCell>{userBooking?.startTime}</TableCell>
                <TableCell>{userBooking?.endTime}</TableCell>
                <TableCell className='font-semibold'>${userBooking?.totalCost}</TableCell>
                {/* <TableCell className='capitalize'>{userBooking?.status}</TableCell> */}
                <TableCell>
                  {
                    userBooking?.paidAmount > 0 ? <p className="font-semibold text-green-600">Paid</p>
                      :
                      userBooking?.endTime && (
                        <Button
                          onClick={() => handlePayment(userBooking._id, userBooking?.totalCost)}
                          disabled={isUpdating}
                        >
                          <FaDollarSign className="text-base mr-1" />
                          Pay Now
                        </Button>
                      )
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaymentManagement;