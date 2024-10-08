import { Link, NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { FaBars, FaCircleUser } from 'react-icons/fa6';
import { FiUser, FiUserPlus } from "react-icons/fi";
import useToken from '@/hooks/useToken';
import useLogout from '@/hooks/useLogout';
import { IoCarSportOutline, IoLogOutOutline } from 'react-icons/io5';
import { RxDashboard } from "react-icons/rx";

const Header = () => {
    const token = useToken();
    const handleLogout = useLogout();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navMenu = (
        <>
            <NavLink
                to={"/"}
                className={({ isActive }) =>
                    isActive
                        ? "active-menu-link"
                        : "menu-link"
                }
            >
                Home
            </NavLink>
            <NavLink
                to={"/cars"}
                className={({ isActive }) =>
                    isActive
                        ? "active-menu-link "
                        : "menu-link "
                }
            >
                Cars
            </NavLink>
            <NavLink
                to={"/booking"}
                className={({ isActive }) =>
                    isActive
                        ? "active-menu-link "
                        : "menu-link "
                }
            >
                Booking
            </NavLink>
            <NavLink
                to={"/about"}
                className={({ isActive }) =>
                    isActive
                        ? "active-menu-link "
                        : "menu-link "
                }
            >
                About
            </NavLink>
        </>
    );

    return (
        <header className="w-full flex justify-center items-center p-4 lg:px-5 lg:py-2 z-[99] bg-white relative h-[72px]">
            <div className="container mx-auto flex flex-wrap justify-between items-center z-[98] bg-white">
                {/* Logo */}
                <div className="flex items-center">
                    <Link to={"/"}>
                        <div className="flex items-center">
                            <IoCarSportOutline className='text-primary-dark text-3xl mr-2' />
                            <span className="text-xl font-bold text-primary">RentalWheels</span>
                        </div>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <FaBars className="text-2xl" />
                    </button>
                </div>

                {/* Nav links for desktop */}
                <div className="hidden md:flex justify-center items-center gap-8 font-medium">
                    {navMenu}
                </div>

                {/* Conditional rendering for cart, heart, and user dropdown for desktop */}
                <div className="hidden md:flex items-center gap-7">
                    {token ? (
                        <div className='flex justify-end items-center gap-3'>
                            <Link to={"/dashboard"}>
                                <Button variant={"outline"}>
                                    <RxDashboard className="mr-2 text-xl" /> Dashboard
                                </Button>
                            </Link>
                            <Button onClick={() => handleLogout()}>
                                <IoLogOutOutline className="mr-2 text-xl" /> Logout
                            </Button>
                        </div>
                    ) : (
                        <div className='flex justify-end items-center gap-3'>
                            <Link to="/signup">
                                <Button variant={"outline"}><FiUserPlus className="mr-2 text-xl" /> Sign up</Button>
                            </Link>
                            <Link to="/signin">
                                <Button><FiUser className="mr-2 text-xl" /> Signin</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="w-full md:hidden mt-4 absolute bg-white top-8 left-[50%] translate-x-[-50%] px-5 py-5">
                        <div className="flex flex-col gap-4">
                            {navMenu}
                            {token ? (
                                <div className='flex flex-col justify-center items-center w-full gap-3'>
                                    <Link to={"/dashboard"} className='w-full'>
                                        <Button variant={"outline"} className='w-full'>
                                            <RxDashboard className="mr-2 text-xl" /> Dashboard
                                        </Button>
                                    </Link>
                                    <Button onClick={() => handleLogout()} className='w-full'>
                                        <IoLogOutOutline className="mr-2 text-xl" /> Logout
                                    </Button>

                                </div>
                            ) : (
                                <Link to="/signin" className="flex items-center gap-2">
                                    <FaCircleUser className="text-bodyText text-xl" />
                                    <span>Signin</span>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;