import { Link } from 'react-router-dom';
import { Car, User, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button"

const Header = () => {
    return (
        <header className="bg-white text-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Car className="w-8 h-8 mr-2 text-primary" />
                    <span className="text-xl font-bold text-primary">CarRental Co.</span>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="hover:text-primary">Home</Link></li>
                        <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                        <li><Link to="/booking" className="hover:text-primary">Booking</Link></li>
                        <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                    </ul>
                </nav>
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                        <User className="w-4 h-4 mr-1" />
                        Login
                    </Button>
                    <Button size="sm">
                        <UserPlus className="w-4 h-4 mr-1" />
                        Sign Up
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;