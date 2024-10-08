/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IoCalendarClearOutline, IoPersonOutline, IoMailOutline, IoCallOutline, IoLocationOutline, IoHeartOutline, IoPencil } from "react-icons/io5";
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import useToken from '@/hooks/useToken';
import RHFormProvider from '@/components/form/RHFormProvider';
import RHInput from '@/components/form/RHInput';
import { toast } from 'sonner';
import { useUserBookingsQuery } from '@/redux/features/bookings/bookingsApi';
import { TUser } from '@/types/allTypes';
import Loading from '@/components/loading/Loading';

const Overview: React.FC = () => {
  const token = useToken();
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading, refetch } = useGetUserQuery({ id: user?.userId as string, token: token as string });
  const [updateUser] = useUpdateUserMutation();
  const { isLoading: userBookingLoading, data: userBookingData } = useUserBookingsQuery({ token: token as string });
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<TUser | null>(null);

  useEffect(() => {
    if (data?.data) {
      setUserData(data.data);
    }
  }, [data]);

  const onSubmit: SubmitHandler<FieldValues> = async (formData: FieldValues) => {
    const toastId = toast.loading('Updating...');
    try {
      const updatedData = { ...userData, ...formData } as TUser;
      await updateUser({ id: user?.userId as string, updatedData, token: token as string }).unwrap();
      refetch();
      setIsEditing(false);
      setUserData(updatedData);
      toast.success('User updated successfully', { id: toastId, duration: 2000 });
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'An error occurred';
      toast.error(errorMessage, { id: toastId, duration: 2000 });
    }
  };

  if (isLoading || userBookingLoading) return <Loading />;
  const userBookings = userBookingData?.data;

  const InfoItem: React.FC<{
    icon: React.ElementType;
    label: string;
    name: keyof TUser;
    type: string;
  }> = ({ icon: Icon, label, name, type }) => (
    <div className="flex items-center space-x-4 py-3">
      <Icon className="text-gray-400 w-5 h-5" />
      <div className="flex-grow">
        {isEditing ? (
          <RHInput
            type={type}
            name={name as string}
            label={label}
            defaultValue={userData?.[name] as string}
            className="mt-1"
          />
        ) : (
          <>
            <Label htmlFor={name as string} className="text-sm font-medium text-gray-500">{label}</Label>
            <p className="mt-1 text-sm font-medium">{userData?.[name] as string}</p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-body-dark">Personal Information</CardTitle>
          {!isEditing && (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <IoPencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <RHFormProvider 
            onSubmit={onSubmit}
            defaultValues={userData as FieldValues}
          >
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className='uppercase font-semibold text-xl'>{userData?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold text-body-dark">{userData?.name}</h2>
                <p className="text-body">Member since {(userData?.createdAt)?.split("-")[0]}</p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-1">
              <InfoItem icon={IoPersonOutline} label="Full Name" name="name" type="text" />
              <Separator />
              <InfoItem icon={IoMailOutline} label="Email Address" name="email" type="email" />
              <Separator />
              <InfoItem icon={IoCallOutline} label="Phone Number" name="phone" type="tel" />
              <Separator />
              <InfoItem icon={IoLocationOutline} label="Address" name="address" type="text" />
              <Separator />
              <InfoItem icon={IoHeartOutline} label="Preferences" name="preferences" type="text" />
            </div>
            {isEditing && (
              <div className="mt-6 flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </div>
            )}
          </RHFormProvider>
        </CardContent>
      </Card>

      {/* Booking History */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Car</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userBookings?.map((booking: any) => (
                <TableRow key={booking._id}>
                  <TableCell className="font-medium">{booking?.car?.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-start">
                      <IoCalendarClearOutline className="mr-2 h-4 w-4 text-body text-xl" />
                      <span>{booking?.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={!booking?.endTime ? 'secondary' : 'default'}>
                      {!booking?.endTime ? "Upcoming" : "Completed"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;