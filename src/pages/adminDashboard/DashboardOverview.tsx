import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useToken from '@/hooks/useToken';
import { useDashboardInfoQuery } from '@/redux/features/bookings/bookingsApi';
import Loading from '@/components/loading/Loading';

const DashboardOverview: React.FC = () => {
    const token = useToken();
    const { data, isLoading } = useDashboardInfoQuery({ token: token as string });

    if (isLoading) return <Loading />
    const dashboardInfo = data?.data;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Total Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{dashboardInfo?.totalBookings}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Available Cars</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{dashboardInfo?.availableCars}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">${dashboardInfo?.paidAmount}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{dashboardInfo?.activeUser}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardOverview;