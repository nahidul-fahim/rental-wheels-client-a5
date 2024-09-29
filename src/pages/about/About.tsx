import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoHome, IoChevronForward, IoMail, IoCall, IoLocation, IoCar, IoLeaf, IoRocket, IoHeart } from "react-icons/io5";
import { Link } from 'react-router-dom';

const About = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    const milestones = [
        { year: 2010, event: "Rental Wheels founded with a fleet of 10 luxury vehicles" },
        { year: 2013, event: "Expanded to 5 major cities across the country" },
        { year: 2015, event: "Introduced our first electric vehicles to the fleet" },
        { year: 2018, event: "Launched our mobile app for seamless bookings" },
        { year: 2020, event: "Celebrated serving our 1 millionth customer" },
        { year: 2023, event: "Introduced AI-powered personalized rental recommendations" }
    ];

    const teamMembers = [
        {
            name: "Ethan Parker",
            role: "CEO & Founder",
            image: "/person/ethan.jpg",
            bio: "Former F1 engineer with a passion for luxury cars and customer service. Sophia founded Rental Wheels to share her love of high-performance vehicles with the world."
        },
        {
            name: "Akira Tanaka",
            role: "Chief Innovation Officer",
            image: "/person/akira.jpg",
            bio: "Tech visionary who led the development of our AI-powered recommendation system. Akira is always looking for ways to blend cutting-edge technology with luxury experiences."
        },
        {
            name: "Olivia Chen",
            role: "Head of Sustainability",
            image: "/person/sopia.jpg",
            bio: "Environmental scientist turned business leader. Olivia ensures that Rental Wheels stays at the forefront of eco-friendly luxury travel."
        },
    ];

    const fleetCategories = [
        {
            name: "Luxury Sedans",
            description: "Experience unparalleled comfort with our range of high-end sedans from brands like Mercedes-Benz, BMW, and Audi.",
            popularModels: ["Mercedes-Benz S-Class", "BMW 7 Series", "Audi A8"]
        },
        {
            name: "Sports Cars",
            description: "Feel the thrill of the road with our collection of high-performance sports cars from Ferrari, Porsche, and Lamborghini.",
            popularModels: ["Ferrari 488", "Porsche 911", "Lamborghini Huracán"]
        },
        {
            name: "Electric Luxury",
            description: "Go green without compromising on luxury. Choose from our selection of top-tier electric vehicles.",
            popularModels: ["Tesla Model S", "Porsche Taycan", "Audi e-tron GT"]
        },
        {
            name: "Luxury SUVs",
            description: "Combine comfort, space, and style with our range of luxury SUVs perfect for any adventure.",
            popularModels: ["Range Rover Autobiography", "Bentley Bentayga", "Rolls-Royce Cullinan"]
        },
    ];

    const testimonials = [
        { name: "James H.", location: "New York", comment: "Rental Wheels made my wedding day unforgettable. The Rolls-Royce Phantom we rented was the perfect touch of elegance." },
        { name: "Emma S.", location: "Los Angeles", comment: "As a car enthusiast, I was blown away by the condition of the Ferrari I rented. It was like driving a brand new car off the lot!" },
        { name: "Michael T.", location: "Miami", comment: "The electric Tesla from Rental Wheels made my eco-friendly road trip a luxurious adventure. Their commitment to sustainability is commendable." }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Image Section */}
            <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: `url(/bg/aboutBg.webp)` }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white text-center">Our Rental Wheels Story</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center text-gray-500 mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <a href="/" className="hover:text-gray-700 flex items-center">
                                <IoHome className="flex-shrink-0 h-5 w-5" />
                                <span className="sr-only">Home</span>
                            </a>
                        </li>
                        <li className="flex items-center">
                            <IoChevronForward className="flex-shrink-0 h-5 w-5" />
                            <span className="ml-2 text-gray-700 font-medium">About Us</span>
                        </li>
                    </ol>
                </nav>

                {/* Company History */}
                <Card className="mb-12">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-bold text-primary mb-4">Our Journey to Redefine Luxury Travel</h2>
                        <p className="text-gray-600 mb-4">
                            Since our inception in 2010, Rental Wheels has been on a mission to transform the concept of luxury car rentals. What started as a dream to share our passion for high-performance vehicles has evolved into a revolution in personalized, premium travel experiences.
                        </p>
                        <p className="text-gray-600 mb-6">
                            Our journey is marked by a commitment to innovation, sustainability, and unparalleled customer service. We don't just rent cars; we craft unforgettable driving experiences tailored to each client's desires.
                        </p>
                        <div className="space-y-4">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="flex-shrink-0 w-24 font-bold text-primary">{milestone.year}</div>
                                    <div className="flex-grow">{milestone.event}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Our Team */}
                <Card className="mb-12">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-bold text-primary mb-6">Behind Rental Wheels</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="text-center">
                                    <img src={member.image} alt={member.name} className="w-48 h-48 bg-cover rounded-full mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold">{member.name}</h3>
                                    <p className="text-gray-600 mb-2">{member.role}</p>
                                    <p className="text-sm text-gray-500">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Our Fleet */}
                <Card className="mb-12">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-bold text-primary mb-6">Explore Our Exceptional Fleet</h2>
                        <Tabs defaultValue="luxury-sedans">
                            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
                                {fleetCategories.map((category) => (
                                    <TabsTrigger key={category.name} value={category.name.toLowerCase().replace(' ', '-')}>
                                        {category.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {fleetCategories.map((category) => (
                                <TabsContent key={category.name} value={category.name.toLowerCase().replace(' ', '-')}>
                                    <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                                    <p className="text-gray-600 mb-4">{category.description}</p>
                                    <h4 className="font-semibold mb-2">Popular Models:</h4>
                                    <ul className="list-disc pl-5 text-gray-600">
                                        {category.popularModels.map((model, index) => (
                                            <li key={index}>{model}</li>
                                        ))}
                                    </ul>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Values & Commitment */}
                <Card className="mb-12">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-bold text-primary mb-6">Our Core Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start">
                                <IoCar className="text-primary mr-3 text-3xl flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Uncompromising Quality</h3>
                                    <p className="text-gray-600">We maintain our vehicles to the highest standards, ensuring you experience luxury at its finest.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <IoLeaf className="text-primary mr-3 text-3xl flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Sustainable Luxury</h3>
                                    <p className="text-gray-600">We're committed to reducing our environmental impact without compromising on luxury.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <IoRocket className="text-primary mr-3 text-3xl flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Continuous Innovation</h3>
                                    <p className="text-gray-600">We leverage cutting-edge technology to enhance your rental experience at every touchpoint.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <IoHeart className="text-primary mr-3 text-3xl flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
                                    <p className="text-gray-600">We go above and beyond to tailor each rental to your unique preferences and needs.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Testimonials */}
                <Card className="mb-12">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-bold text-primary mb-6">What Our Clients Say</h2>
                        <div className="relative">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={`transition-opacity duration-500 ${index === activeTestimonial ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}
                                >
                                    <p className="text-gray-600 italic mb-4">"{testimonial.comment}"</p>
                                    <p className="font-semibold">{testimonial.name} - {testimonial.location}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-6">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full mx-1 ${index === activeTestimonial ? 'bg-primary' : 'bg-gray-300'}`}
                                    onClick={() => setActiveTestimonial(index)}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-bold text-primary mb-6">Get in Touch</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="flex items-center">
                                <IoCall className="text-primary mr-3 text-2xl" />
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <IoMail className="text-primary mr-3 text-2xl" />
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-gray-600">info@rentalwheels.com</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <IoLocation className="text-primary mr-3 text-2xl" />
                                <div>
                                    <h3 className="font-semibold">Headquarters</h3>
                                    <p className="text-gray-600">123 Luxury Lane, Beverly Hills, CA 90210</p>
                                </div>
                            </div>
                        </div>
                        <Link to="/cars">
                            <Button className="bg-primary">
                                Book Your Luxury Experience
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default About;