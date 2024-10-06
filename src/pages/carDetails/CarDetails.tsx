/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetSingleCarQuery } from '@/redux/features/car/carApi';
import BookingForm from '@/components/bookingForm/BookingForm';
import BookingConfirmation from '@/components/bookingForm/BookingConfirmation';
import OverviewTab from './OverviewTab';
import FeaturesTab from './FeaturesTab';
import SpecsTab from './SpecsTab';
import ReviewsTab from './ReviewsTab';
import DetailsTab from './DetailsTab';
import CarDetailsBreadcrumb from './CarDetailsBreadcrumb';
import { useCreateBookingMutation } from '@/redux/features/bookings/bookingsApi';
import useToken from '@/hooks/useToken';
import { toast } from 'sonner';

interface IBookingDetails {
    name: string;
    email: string;
    phone: string;
    date: string;
    startTime: string;
    nidPassport: string;
    drivingLicense: string;
    paymentMethod: string;
    gpsNavigation?: boolean;
    childSeat?: boolean;
    additionalDriver?: boolean;
}

const CarDetails = () => {
    const { id } = useParams();
    const token = useToken();
    const { data, isLoading } = useGetSingleCarQuery(id);
    const [bookingStep, setBookingStep] = useState('form');
    const [bookingDetails, setBookingDetails] = useState<IBookingDetails | null>(null);
    const [createBooking, { isLoading: isBookingLoading }] = useCreateBookingMutation();

    if (isLoading) return <div>Loading...</div>;
    const carDetails = data?.data;

    // submit the booking
    const handleBookingSubmit = (formData: any) => {
        setBookingDetails(formData);
        setBookingStep('confirmation');
    };

    // confirm the booking in the server
    const handleBookingConfirm = async () => {
        if (!bookingDetails) return;
        const toastId = toast.loading("Booking the car!",)

        const bookingData = {
            carId: carDetails._id,
            name: bookingDetails?.name,
            email: bookingDetails?.email,
            phone: bookingDetails?.phone,
            date: bookingDetails?.date,
            nidPassport: bookingDetails?.nidPassport,
            drivingLicense: bookingDetails?.drivingLicense,
            startTime: bookingDetails?.startTime,
            paymentMethod: bookingDetails?.paymentMethod,
            additionalOptions: {
                gpsNavigation: bookingDetails?.gpsNavigation,
                childSeat: bookingDetails?.childSeat,
                additionalDriver: bookingDetails?.additionalDriver,
            },
        };
        const res = await createBooking({ token: token as string, bookingData });
        if (res?.data?.success) {
            toast.success("Booked the car successfully!", { id: toastId, duration: 2000 })
            setBookingStep('form');
            setBookingDetails(null);
        }
        else {
            toast.error("Failed to book the car!", { id: toastId, duration: 2000 })
        }

    };

    const handleBookingEdit = () => {
        setBookingStep('form');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: `url(${carDetails.image})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white text-center">{carDetails.name}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <CarDetailsBreadcrumb carDetails={carDetails} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="mb-8">
                            <CardContent className="p-6">
                                <img src={carDetails.image} alt={carDetails.name} className="w-full h-96 object-cover rounded-lg" />
                            </CardContent>
                        </Card>

                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-5">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="features">Features</TabsTrigger>
                                <TabsTrigger value="specs">Specs</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                <TabsTrigger value="details">Details</TabsTrigger>
                            </TabsList>
                            <OverviewTab carDetails={carDetails} />
                            <FeaturesTab carDetails={carDetails} />
                            <SpecsTab carDetails={carDetails} />
                            <ReviewsTab carDetails={carDetails} />
                            <DetailsTab carDetails={carDetails} />
                        </Tabs>
                    </div>

                    <div>
                        <Card className="sticky top-8">
                            <CardContent className="p-6">
                                {bookingStep === 'form' ? (
                                    <>
                                        <h3 className="text-3xl font-bold text-primary mb-4">${carDetails.pricePerHour} <span className="text-sm text-gray-500">per hour</span></h3>
                                        <p className="text-gray-600 mb-6">Experience luxury and performance with our {carDetails.name}.</p>
                                        <BookingForm
                                            carDetails={carDetails}
                                            onSubmit={handleBookingSubmit}
                                            initialData={bookingDetails}
                                        />
                                    </>
                                ) : (
                                    <BookingConfirmation
                                        bookingDetails={bookingDetails}
                                        carDetails={carDetails}
                                        onConfirm={handleBookingConfirm}
                                        onEdit={handleBookingEdit}
                                        isBookingLoading={isBookingLoading}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;