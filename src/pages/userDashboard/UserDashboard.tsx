import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { IoHome, IoLogOutOutline  } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Overview from './Overview';
import BookingManagement from './BookingManagement';
import PaymentManagement from './PaymentManagement';

const UserDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement logout logic here
        navigate('/login');
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold text-primary">User Dashboard</h1>
                <Button variant="outline" onClick={handleLogout}>
                    <IoLogOutOutline  className="mr-2 text-xl" /> Logout
                </Button>
            </div>

            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">
                            <IoHome className=" hover:text-primary" />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <MdOutlineKeyboardArrowRight className="text-2xl" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>User Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardContent className="p-6">
                    <Tabs defaultValue="overview">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="bookings">Bookings</TabsTrigger>
                            <TabsTrigger value="payments">Payments</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                            <Overview />
                        </TabsContent>
                        <TabsContent value="bookings">
                            <BookingManagement />
                        </TabsContent>
                        <TabsContent value="payments">
                            <PaymentManagement />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserDashboard;