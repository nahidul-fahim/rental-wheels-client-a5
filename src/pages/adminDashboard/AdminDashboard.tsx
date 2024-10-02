import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import DashboardOverview from './DashboardOverview';
import ManageCars from './ManageCars';
import ManageBookings from './ManageBookings';
import ManageReturnCars from './ManageReturnCars';
import UserManagement from './UserManagement';

const AdminDashboard: React.FC = () => {
    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-primary">Admin Dashboard</h1>
            <Card>
                <CardContent className="p-6">
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList className="flex flex-wrap gap-4 flex-row">
                            <TabsTrigger value="overview" className="flex-1 min-w-[120px]">Overview</TabsTrigger>
                            <TabsTrigger value="cars" className="flex-1 min-w-[120px]">Manage Cars</TabsTrigger>
                            <TabsTrigger value="bookings" className="flex-1 min-w-[120px]">Manage Bookings</TabsTrigger>
                            <TabsTrigger value="returns" className="flex-1 min-w-[120px]">Manage Returns</TabsTrigger>
                            <TabsTrigger value="users" className="flex-1 min-w-[120px]">User Management</TabsTrigger>
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
