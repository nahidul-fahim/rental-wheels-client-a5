import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoLogOutOutline } from "react-icons/io5";
import DashboardOverview from './DashboardOverview';
import ManageCars from './ManageCars';
import ManageBookings from './ManageBookings';
import ManageReturnCars from './ManageReturnCars';
import UserManagement from './UserManagement';
import useLogout from '@/hooks/useLogout';

const AdminDashboard: React.FC = () => {
    const handleLogout = useLogout();

    return (
        <div className="container mx-auto px-4 sm:px-6 py-6 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary">Admin Dashboard</h1>
                <Button onClick={() => handleLogout()}>
                    <IoLogOutOutline className="mr-2 text-xl" /> Logout
                </Button>
            </div>
            <Card className="w-full">
                <CardContent className="p-4 sm:p-6">
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList className="flex flex-wrap gap-2 sm:gap-4">
                            <TabsTrigger value="overview" className="flex-1 min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm">Overview</TabsTrigger>
                            <TabsTrigger value="cars" className="flex-1 min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm">Manage Cars</TabsTrigger>
                            <TabsTrigger value="bookings" className="flex-1 min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm">Manage Bookings</TabsTrigger>
                            <TabsTrigger value="returns" className="flex-1 min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm">Manage Returns</TabsTrigger>
                            <TabsTrigger value="users" className="flex-1 min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm">User Management</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview"><DashboardOverview /></TabsContent>
                        <TabsContent value="cars"><ManageCars /></TabsContent>
                        <TabsContent value="bookings"><ManageBookings /></TabsContent>
                        <TabsContent value="returns"><ManageReturnCars /></TabsContent>
                        <TabsContent value="users"><UserManagement /></TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;