import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([
    { id: 1, bookingId: 'B001', amount: 250, status: 'Pending' },
    { id: 2, bookingId: 'B002', amount: 180, status: 'Paid' },
    { id: 3, bookingId: 'B003', amount: 300, status: 'Pending' },
  ]);

  const handlePayment = (id) => {
    // Implement payment logic
    console.log('Process payment for', id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.bookingId}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>
                  {payment.status === 'Pending' && (
                    <Button onClick={() => handlePayment(payment.id)}>
                      Pay Now
                    </Button>
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

export default PaymentManagement;