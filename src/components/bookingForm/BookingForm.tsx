/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RHFormProvider from '../form/RHFormProvider';
import RHInput from '../form/RHInput';
import RHRadio from '../form/RHRadio';
import RHCheckbox from '../form/RHCheckbox';
import RHDatePicker from '../form/RHDatePicker';

const BookingForm = ({ carDetails, onSubmit, initialData }: any) => {
    const handleSubmit = (data: any) => {
        onSubmit(data);
    };


    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Book Your {carDetails.name}</h2>
                <RHFormProvider onSubmit={handleSubmit} defaultValues={initialData}>
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

                        <RHDatePicker
                            name="date"
                            label="Date of Booking"
                            minDate={new Date().toISOString().split('T')[0]}
                            required
                        />

                        <RHInput
                            type="time"
                            name="startTime"
                            label="Start Time"
                            placeholder="HH:MM"
                            maxLength={5}
                            step={60}
                            required
                        />

                        <RHRadio
                            name="paymentMethod"
                            label="Payment Method"
                            options={[
                                { label: 'Credit Card', value: 'card' },
                                { label: 'Cash', value: 'cash' },
                                { label: 'Bank Transfer', value: 'bankTransfer' },
                            ]}
                        />
                        <div className='space-y-2'>
                            <h4 className="text-sm font-medium mb-2">Additional Options</h4>
                            <RHCheckbox name="gpsNavigation" label="GPS Navigation" />
                            <RHCheckbox name="childSeat" label="Child Seat" />
                            <RHCheckbox name="additionalDriver" label="Additional Driver" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-6">Complete Booking</Button>
                </RHFormProvider>
            </CardContent>
        </Card>
    );
};

export default BookingForm;