import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RHFormProvider from '@/components/form/RHFormProvider';
import RHInput from '@/components/form/RHInput';
import RHRadio from '@/components/form/RHRadio';

const BookingForm = ({ carDetails, onSubmit }) => {

    const handleSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Book Your {carDetails.name}</h2>
                <RHFormProvider onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <RHInput
                            type="text"
                            name="name"
                            label="Full Name"
                            placeholder="Enter your full name"
                            required
                        />
                        <RHInput
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            required
                        />
                        <RHInput
                            type="tel"
                            name="phone"
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            required
                        />
                        <RHInput
                            type="text"
                            name="nidPassport"
                            label="NID/Passport Number"
                            placeholder="Enter your NID or Passport number"
                            required
                        />
                        <RHInput
                            type="text"
                            name="drivingLicense"
                            label="Driving License Number"
                            placeholder="Enter your driving license number"
                            required
                        />
                        <RHRadio
                            name="paymentMethod"
                            label="Payment Method"
                            options={[
                                { label: 'Credit Card', value: 'creditCard' },
                                { label: 'PayPal', value: 'paypal' },
                                { label: 'Bank Transfer', value: 'bankTransfer' },
                            ]}
                        />
                        <RHRadio
                            name="additionalOptions"
                            label="Additional Options"
                            options={[
                                { label: 'GPS Navigation', value: 'gps' },
                                { label: 'Child Seat', value: 'childSeat' },
                            ]}
                        />
                    </div>
                    <Button type="submit" className="w-full mt-6">Complete Booking</Button>
                </RHFormProvider>
            </CardContent>
        </Card>
    );
};

export default BookingForm;