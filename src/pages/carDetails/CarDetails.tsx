/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { IoHome, IoChevronForward, IoCarSport, IoSpeedometer, IoPeople, IoCalendarNumber, IoShieldCheckmark, IoStar, IoInformationCircle } from "react-icons/io5";
import { useGetSingleCarQuery } from '@/redux/features/car/carApi';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSingleCarQuery(id);

    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

    const handleExtraToggle = (value: any) => {
        setSelectedExtras(prev =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    if (isLoading) return <div>Loading...</div>;
    const carDetails = data?.data;

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
                <nav className="flex items-center text-gray-500 mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <a href="/" className="hover:text-primary flex items-center">
                                <IoHome className="flex-shrink-0 h-5 w-5" />
                                <span className="sr-only">Home</span>
                            </a>
                        </li>
                        <li className="flex items-center">
                            <IoChevronForward className="flex-shrink-0 h-5 w-5" />
                            <a href="/cars" className="ml-2 hover:text-primary">Cars</a>
                        </li>
                        <li className="flex items-center">
                            <IoChevronForward className="flex-shrink-0 h-5 w-5" />
                            <span className="ml-2 text-body font-medium">{carDetails.name}</span>
                        </li>
                    </ol>
                </nav>

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
                            <TabsContent value="overview" className="mt-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-2xl font-semibold mb-4">Overview</h3>
                                        <p className="text-gray-600">{carDetails.description}</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="features" className="mt-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-2xl font-semibold mb-4">Features</h3>
                                        <ul className="list-disc pl-5">
                                            {carDetails?.features?.map((feature: string, index: number) => (
                                                <li key={index} className="text-gray-600 mb-2">{feature}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="specs" className="mt-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-2xl font-semibold mb-4">Specifications</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center">
                                                <IoCarSport className="text-primary mr-2" />
                                                <span className="text-gray-600">Type: {carDetails.carType}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <IoSpeedometer className="text-primary mr-2" />
                                                <span className="text-gray-600">Color: {carDetails.color}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <IoPeople className="text-primary mr-2" />
                                                <span className="text-gray-600">Electric: {carDetails.isElectric ? 'Yes' : 'No'}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <IoCalendarNumber className="text-primary mr-2" />
                                                <span className="text-gray-600">Status: {carDetails.status}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="reviews" className="mt-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
                                        {carDetails.reviews && carDetails.reviews.length > 0 ? (
                                            carDetails.reviews.map((review: any) => (
                                                <div key={review.id} className="mb-4 pb-4 border-b last:border-b-0">
                                                    <div className="flex items-center mb-2">
                                                        <span className="font-semibold mr-2">{review.user}</span>
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <IoStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600">{review.comment}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600">No reviews yet.</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="details" className="mt-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-2xl font-semibold mb-4">Car Details</h3>
                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="text-xl font-semibold mb-2">Features</h4>
                                                <ul className="list-disc pl-5">
                                                    {carDetails?.features?.map((feature: string, index: number) => (
                                                        <li key={index} className="text-gray-600 mb-2">{feature}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-semibold mb-2">Insurance Options</h4>
                                                <p className="text-gray-600">We offer comprehensive insurance coverage for your peace of mind. Options include:</p>
                                                <ul className="list-disc pl-5 mt-2">
                                                    <li className="text-gray-600">Basic Coverage: Included in the rental price</li>
                                                    <li className="text-gray-600">Premium Coverage: Additional $20/day for extra protection</li>
                                                    <li className="text-gray-600">Full Coverage: Additional $35/day for complete peace of mind</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-semibold mb-2">Cancellation Policy</h4>
                                                <p className="text-gray-600">We understand that plans can change. Our cancellation policy is as follows:</p>
                                                <ul className="list-disc pl-5 mt-2">
                                                    <li className="text-gray-600">Free cancellation up to 48 hours before pickup</li>
                                                    <li className="text-gray-600">50% refund for cancellations between 48 and 24 hours before pickup</li>
                                                    <li className="text-gray-600">No refund for cancellations less than 24 hours before pickup</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right Column: Pricing and Booking */}
                    <div>
                        <Card className="sticky top-8">
                            <CardContent className="p-6">
                                <h3 className="text-3xl font-bold text-primary mb-4">${carDetails.pricePerHour} <span className="text-sm text-gray-500">per hour</span></h3>
                                <p className="text-gray-600 mb-6">Experience luxury and performance with our {carDetails.name}.</p>

                                <h4 className="text-xl font-semibold mb-4">Additional Features</h4>
                                <div className="space-y-4 mb-6">
                                    {['Insurance', 'GPS Navigation', 'Child Seat', 'Additional Driver'].map((extra) => (
                                        <div key={extra} className="flex items-center">
                                            <Checkbox
                                                id={extra}
                                                checked={selectedExtras.includes(extra)}
                                                onCheckedChange={() => handleExtraToggle(extra)}
                                            />
                                            <label htmlFor={extra} className="ml-2 text-gray-700">{extra}</label>
                                        </div>
                                    ))}
                                </div>

                                <Button className="w-full mb-4">
                                    <IoShieldCheckmark className="mr-2 text-lg" /> Book Now
                                </Button>

                                <div className="text-sm text-gray-500 flex items-center">
                                    <IoInformationCircle className="mr-1" />
                                    <span>Free cancellation up to 48 hours before pickup</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;