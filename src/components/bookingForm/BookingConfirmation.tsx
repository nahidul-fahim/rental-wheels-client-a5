/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BookingConfirmation = ({ bookingDetails, carDetails, onConfirm, onEdit, isBookingLoading }: any) => {
    return (
        <Card>
            <CardContent className="space-y-4">
                <h2 className="text-2xl font-bold">Booking Confirmation</h2>

                <div>
                    <h3 className="text-xl font-semibold">Car Details</h3>
                    <p>Model: {carDetails.name}</p>
                    <p>Price per Hour: ${carDetails.pricePerHour}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Personal Information</h3>
                    <p>Name: {bookingDetails.name}</p>
                    <p>Email: {bookingDetails.email}</p>
                    <p>Phone: {bookingDetails.phone}</p>
                    <p>NID/Passport: {bookingDetails.nidPassport}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Booking Details</h3>
                    <p>Date: {bookingDetails.bookingDate}</p>
                    <p>Start Time: {bookingDetails.startTime}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Payment Information</h3>
                    <p>Payment Method: {bookingDetails.paymentMethod}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Additional Options</h3>
                    <p>GPS Navigation: {bookingDetails.gpsNavigation ? 'Yes' : 'No'}</p>
                    <p>Child Seat: {bookingDetails.childSeat ? 'Yes' : 'No'}</p>
                    <p>Additional Driver: {bookingDetails.additionalDriver ? 'Yes' : 'No'}</p>
                </div>

                <div className="flex space-x-4">
                    <Button onClick={onConfirm} disabled={isBookingLoading}>Confirm Booking</Button>
                    <Button onClick={onEdit} variant="outline" disabled={isBookingLoading}>Edit Booking</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BookingConfirmation;