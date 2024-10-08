import { IoSearch, IoStar, IoShieldCheckmarkOutline, IoCarOutline, IoDocumentTextOutline, IoCardOutline, IoInformationCircleOutline, IoCheckmarkSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { useGetAllCarsQuery } from '@/redux/features/car/carApi';
import CarCard from '@/components/carCard/CarCard';
import { TSingleCar } from '@/types/allTypes';
import { Skeleton } from '@/components/ui/skeleton';
import { AllTestimonials } from "@/static/allTestimonials";

const Home = () => {
  const carType = "";
  const { isLoading, data } = useGetAllCarsQuery({ carType });
  const carLoadingSkeletonNumber = [1, 2, 3, 4, 5, 6];


  return (
    <div className="min-h-screen font-sans leading-relaxed bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/bg/aboutBg.webp")' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center justify-center">
          <div className="text-center space-y-6 max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-wide drop-shadow-lg">
              Find Your Perfect Ride
            </h1>
            <p className="lg:text-lg text-white mb-8">
              Discover the perfect vehicle for every adventure. Unbeatable prices, unmatched service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={"/booking"}>
                <Button size="lg" className="text-lg bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary/90 transition duration-300">
                  Book Now
                </Button>
              </Link>
              <Link to={"/cars"}>
                <Button size="lg" variant="outline" className="text-lg bg-transparent text-white border-white font-semibold rounded-full shadow-lg hover:bg-white hover:text-primary transition duration-300">
                  All Cars
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white py-10 shadow-lg rounded-lg -mt-20 mx-4 md:mx-auto max-w-6xl relative z-10">
        <Card className="p-6 rounded-lg">
          <CardContent className="flex flex-wrap items-center justify-center gap-4">
            <Input type="text" placeholder="Enter Location" className="flex-grow md:flex-1 p-4 border rounded-md shadow-sm" />
            <Input type="date" placeholder="Pick-up Date" className="flex-grow md:flex-1 p-4 border rounded-md shadow-sm" />
            <Input type="date" placeholder="Return Date" className="flex-grow md:flex-1 p-4 border rounded-md shadow-sm" />
            <Button className="w-full md:w-auto bg-primary text-white px-6 py-3 rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-all">
              {/* <Search className="w-5 h-5 mr-2" /> */}
              <IoSearch className='text-xl mr-1' />
              Search Cars
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Featured Cars */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Featured Cars</h2>
          {
            isLoading ?
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                  carLoadingSkeletonNumber?.map((skeleton: number) => (
                    <div key={skeleton} className="flex flex-col space-y-3">
                      <Skeleton className="h-[200px] w-[90%] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  )
                  )
                }
              </div>
              :
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.data?.allCars?.slice(0, 6)?.map((car: TSingleCar) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
          }

        </div>
      </section >

      {/* Why Choose Us */}
      <section className="py-16 bg-primary text-primary-foreground" >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaRegClock, title: '24/7 Support', description: 'Round-the-clock assistance for your peace of mind.' },
              { icon: IoShieldCheckmarkOutline, title: 'Fully Insured', description: 'Comprehensive coverage for worry-free travels.' },
              { icon: IoCarOutline, title: 'Latest Models', description: 'Access to a fleet of new and well-maintained vehicles.' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
                <item.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16" >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">What Our Customers Say</h2>
          <Carousel className="max-w-4xl mx-auto overflow-x-hidden">
            <CarouselContent>
              {AllTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial?.id}>
                  <Card className="bg-white p-8 shadow-lg rounded-lg">
                    <CardContent>
                      <div className="flex items-center mb-6">
                        <img src={testimonial.img} alt="Customer" className="w-12 h-12 rounded-full mr-4" />
                        <div>
                          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <IoStar key={i} className='text-lg text-primary mr-0.5' />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg">{testimonial.text}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100" >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Car Rental Tips & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">Rental Guide</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How to Choose the Right Car</AccordionTrigger>
                  <AccordionContent>
                    Consider your needs: number of passengers, luggage space, fuel efficiency, and planned activities. For city driving, compact cars are ideal, while SUVs are better for rough terrain or family trips.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Understanding Rental Insurance</AccordionTrigger>
                  <AccordionContent>
                    Rental companies offer various insurance options. Collision Damage Waiver (CDW) covers damage to the rental car. Personal Accident Insurance (PAI) covers medical costs. Check if your personal auto insurance or credit card provides coverage to avoid duplicate protection.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Saving Money on Your Rental</AccordionTrigger>
                  <AccordionContent>
                    Book in advance, compare prices, look for package deals, and join loyalty programs. Avoid airport rentals if possible, as they often have higher fees. Return the car with a full tank to avoid refueling charges.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Helpful Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: IoDocumentTextOutline, title: 'Rental Policies', description: 'Learn about our policies and procedures.' },
                  { icon: IoCardOutline, title: 'Payment Options', description: 'Explore our flexible payment methods.' },
                  { icon: IoInformationCircleOutline, title: 'FAQ', description: 'Find answers to common questions.' },
                  { icon: IoCheckmarkSharp, title: 'Booking Checklist', description: 'Ensure a smooth rental experience.' },
                ].map((resource, index) => (
                  <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 flex items-start space-x-4">
                      <resource.icon className="w-8 h-8 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6">
                <Button className="w-full bg-primary text-white rounded-full px-6 py-3 shadow-md hover:bg-primary/90 transition-all">
                  Download Complete Rental Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
};

export default Home;