import { Search, Star, Phone, Mail, MapPin, Clock, Shield, CarFront, FileText, CreditCard, Info, Check } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredCars = [
    { name: 'Economy Sedan', price: '$30/day', image: '/api/placeholder/300/200', features: ['4 Seats', 'Automatic', 'AC'] },
    { name: 'Luxury SUV', price: '$80/day', image: '/api/placeholder/300/200', features: ['7 Seats', 'AWD', 'Premium Sound'] },
    { name: 'Sports Car', price: '$100/day', image: '/api/placeholder/300/200', features: ['2 Seats', 'Manual', 'High Performance'] },
    { name: 'Electric Hatchback', price: '$50/day', image: '/api/placeholder/300/200', features: ['5 Seats', 'Zero Emissions', 'Long Range'] },
    { name: 'Minivan', price: '$70/day', image: '/api/placeholder/300/200', features: ['8 Seats', 'Sliding Doors', 'Family Friendly'] },
    { name: 'Pickup Truck', price: '$90/day', image: '/api/placeholder/300/200', features: ['5 Seats', '4x4', 'Large Cargo Bed'] },
  ];

  return (
    <div className="min-h-screen font-sans leading-relaxed bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/public/bg/aboutBg.webp")' }}>
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
              <Search className="w-5 h-5 mr-2" />
              Search Cars
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Featured Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <Card key={index} className="rounded-lg shadow-md overflow-hidden bg-white transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                <CardHeader className="p-4">
                  <CardTitle className="text-2xl font-semibold text-gray-900">{car.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-600 text-lg mb-4">{car.price}</p>
                  <ul className="mb-4 space-y-2">
                    {car.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <CarFront className="w-4 h-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-primary text-white rounded-full px-6 py-2 shadow-md hover:bg-primary/90 transition-all">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: '24/7 Support', description: 'Round-the-clock assistance for your peace of mind.' },
              { icon: Shield, title: 'Fully Insured', description: 'Comprehensive coverage for worry-free travels.' },
              { icon: CarFront, title: 'Latest Models', description: 'Access to a fleet of new and well-maintained vehicles.' },
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">What Our Customers Say</h2>
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {[
                { name: 'John Doe', text: '"Exceptional service and a wide range of vehicles to choose from. My go-to car rental service!"' },
                { name: 'Jane Smith', text: '"The best car rental experience I\'ve ever had. The staff went above and beyond to ensure my satisfaction."' },
                { name: 'Mike Johnson', text: '"Seamless booking process and top-notch vehicles. I\'ll definitely be a returning customer!"' },
              ].map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-white p-8 shadow-lg rounded-lg">
                    <CardContent>
                      <div className="flex items-center mb-6">
                        <img src={`/api/placeholder/50/50?text=${testimonial.name.charAt(0)}`} alt="Customer" className="w-12 h-12 rounded-full mr-4" />
                        <div>
                          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-current" />
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
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Car Rental Tips & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
              <h3 className="text-2xl font-semibold mb-4">Helpful Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: FileText, title: 'Rental Policies', description: 'Learn about our policies and procedures.' },
                  { icon: CreditCard, title: 'Payment Options', description: 'Explore our flexible payment methods.' },
                  { icon: Info, title: 'FAQ', description: 'Find answers to common questions.' },
                  { icon: Check, title: 'Booking Checklist', description: 'Ensure a smooth rental experience.' },
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
    </div>
  );
};

export default Home;