import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BookingConfirmation = ({ bookingDetails, carDetails, onConfirm, onEdit }) => {
    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">Car Details</h3>
                        <p>Model: {carDetails.name}</p>
                        <p>Price per Hour: ${carDetails.pricePerHour}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Personal Information</h3>
                        <p>Name: {bookingDetails.name}</p>
                        <p>Email: {bookingDetails.email}</p>
                        <p>Phone: {bookingDetails.phone}</p>
                        <p>NID/Passport: {bookingDetails.nidPassport}</p>
                        <p>Driving License: {bookingDetails.drivingLicense}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Payment Information</h3>
                        <p>Payment Method: {bookingDetails.paymentMethod}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Additional Options</h3>
                        <p>GPS Navigation: {bookingDetails.additionalOptions.includes('gps') ? 'Yes' : 'No'}</p>
                        <p>Child Seat: {bookingDetails.additionalOptions.includes('childSeat') ? 'Yes' : 'No'}</p>
                    </div>
                    {bookingDetails.drivingLicenseImage && (
                        <div>
                            <h3 className="text-lg font-semibold">Driving License Image</h3>
                            <p>File uploaded: {bookingDetails.drivingLicenseImage.name}</p>
                        </div>
                    )}
                </div>
                <div className="mt-6 space-x-4">
                    <Button onClick={onConfirm}>Confirm Booking</Button>
                    <Button variant="outline" onClick={onEdit}>Edit Booking</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BookingConfirmation;