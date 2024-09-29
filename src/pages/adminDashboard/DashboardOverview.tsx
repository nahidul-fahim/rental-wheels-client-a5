import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardOverview: React.FC = () => {
    // In a real application, you would fetch this data from an API
    const stats = {
        totalBookings: 156,
        availableCars: 24,
        revenue: 15600,
        activeUsers: 89
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Total Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{stats.totalBookings}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Available Cars</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{stats.availableCars}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">${stats.revenue}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{stats.activeUsers}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardOverview;