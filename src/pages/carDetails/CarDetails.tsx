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

const CarDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSingleCarQuery(id);
    const [bookingStep, setBookingStep] = useState('form');
    const [bookingDetails, setBookingDetails] = useState(null);

    if (isLoading) return <div>Loading...</div>;
    const carDetails = data?.data;
    console.log("car details", carDetails)

    const handleBookingSubmit = (formData: any) => {
        setBookingDetails(formData);
        setBookingStep('confirmation');
    };

    const handleBookingConfirm = () => {
        // Here you would typically send the booking data to your backend
        console.log('Booking confirmed:', bookingDetails);
        // Reset the booking process
        setBookingStep('form');
        setBookingDetails(null);
    };

    const handleBookingEdit = () => {
        setBookingStep('form');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Image Section */}
            <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: `url(${carDetails.image})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white text-center">{carDetails.name}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumb Navigation */}
                <CarDetailsBreadcrumb carDetails={carDetails} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Image and Details */}
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

                    {/* Right Column: Pricing and Booking */}
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
                                        />
                                    </>
                                ) : (
                                    <BookingConfirmation
                                        bookingDetails={bookingDetails}
                                        carDetails={carDetails}
                                        onConfirm={handleBookingConfirm}
                                        onEdit={handleBookingEdit}
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