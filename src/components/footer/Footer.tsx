import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';
import { IoCarSportOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link to={"/"}>
              <div className="flex items-center">
                <IoCarSportOutline className='text-white text-3xl mr-2' />
                <span className="text-xl font-bold text-white">RentalWheels</span>
              </div>
            </Link>
            <p className="text-sm mt-2">Providing quality car rentals since 2010.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li><a href="/about" className="hover:text-white/50">About</a></li>
              <li><a href="/privacy-policy" className="hover:text-white/50">Privacy Policy</a></li>
              <li><a href="/terms-services" className="hover:text-white/50">Terms of Service</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 space-y-2">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm flex items-center mb-1"><Phone className="w-4 h-4 mr-2" /> +1 (555) 123-4567</p>
            <p className="text-sm flex items-center"><Mail className="w-4 h-4 mr-2" /> info@rentalwheels.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-orange-600 flex flex-wrap justify-between items-center">
          <p className="text-sm">&copy; 2024 Renal Wheels. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white/50 hover:text-white"><Facebook /></a>
            <a href="#" className="text-white/50 hover:text-white"><Twitter /></a>
            <a href="#" className="text-white/50 hover:text-white"><Instagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;