import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([
    { id: 1, carName: 'Toyota Camry', startDate: '2024-10-01', endDate: '2024-10-05', status: 'Upcoming' },
    { id: 2, carName: 'Honda Civic', startDate: '2024-09-15', endDate: '2024-09-18', status: 'Completed' },
    { id: 3, carName: 'Ford Mustang', startDate: '2024-10-10', endDate: '2024-10-15', status: 'Upcoming' },
  ]);

  const handleModifyBooking = (id: string) => {
    // Implement modify booking logic
    console.log('Modify booking', id);
  };

  const handleCancelBooking = (id: string) => {
    // Implement cancel booking logic
    console.log('Cancel booking', id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
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
                <TableCell>{booking.startDate}</TableCell>
                <TableCell>{booking.endDate}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  {booking.status === 'Upcoming' && (
                    <>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleModifyBooking(booking.id)}>
                        Modify
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)}>
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

export default BookingManagement;