import { TSingleCar } from "@/types/allTypes";
import { IoChevronForward, IoHome } from "react-icons/io5";


const CarDetailsBreadcrumb = ({ carDetails }: { carDetails: TSingleCar }) => {
    return (
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
    );
};

export default CarDetailsBreadcrumb;