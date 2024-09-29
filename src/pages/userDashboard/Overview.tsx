/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, User2Icon, MailIcon, PhoneIcon, MapPinIcon, HeartIcon, PencilIcon } from 'lucide-react';
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import useToken from '@/hooks/useToken';
import RHFormProvider from '@/components/form/RHFormProvider';
import RHInput from '@/components/form/RHInput';
import { toast } from 'sonner';

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  preferences: string;
  avatarUrl?: string;
}

const Overview: React.FC = () => {
  const token = useToken();
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading, refetch } = useGetUserQuery({ id: user?.userId as string, token: token as string });
  const [updateUser] = useUpdateUserMutation();

  const [bookingHistory] = useState([
    { id: 1, carName: 'Tesla Model 3', startDate: '2024-08-01', endDate: '2024-08-05', status: 'Completed' },
    { id: 2, carName: 'BMW X5', startDate: '2024-09-15', endDate: '2024-09-18', status: 'Completed' },
    { id: 3, carName: 'Audi A6', startDate: '2024-10-10', endDate: '2024-10-15', status: 'Upcoming' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (data?.data) {
      setUserData(data.data);
    }
  }, [data]);

  const onSubmit = async (formData: FieldValues) => {
    const toastId = toast.loading('Updating...');
    try {
      await updateUser({ id: user?.userId as string, updatedData: formData, token: token as string }).unwrap();
      refetch();
      setIsEditing(false);
      setUserData(formData as UserData);
      toast.success('User updated successfully', { id: toastId });
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'An error occurred';
      toast.error(errorMessage, { id: toastId });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const InfoItem: React.FC<{
    icon: React.ElementType;
    label: string;
    name: keyof UserData;
    type: string;
  }> = ({ icon: Icon, label, name, type }) => (
    <div className="flex items-center space-x-4 py-3">
      <Icon className="text-gray-400 w-5 h-5" />
      <div className="flex-grow">
        {isEditing ? (
          <RHInput
            type={type}
            name={name}
            label={label}
            defaultValue={userData?.[name]}
            className="mt-1"
          />
        ) : (
          <>
            <Label htmlFor={name} className="text-sm font-medium text-gray-500">{label}</Label>
            <p className="mt-1 text-sm font-medium">{userData?.[name]}</p>
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
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <RHFormProvider onSubmit={onSubmit}>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userData?.avatarUrl} alt={userData?.name} />
                <AvatarFallback className='uppercase font-semibold text-xl'>{userData?.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold text-body-dark">{userData?.name}</h2>
                <p className="text-body">Member since 2023</p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-1">
              <InfoItem icon={User2Icon} label="Full Name" name="name" type="text" />
              <Separator />
              <InfoItem icon={MailIcon} label="Email Address" name="email" type="email" />
              <Separator />
              <InfoItem icon={PhoneIcon} label="Phone Number" name="phone" type="tel" />
              <Separator />
              <InfoItem icon={MapPinIcon} label="Address" name="address" type="text" />
              <Separator />
              <InfoItem icon={HeartIcon} label="Preferences" name="preferences" type="text" />
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
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingHistory.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.carName}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-body" />
                      <span>{booking.startDate} - {booking.endDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={booking.status === 'Completed' ? 'secondary' : 'default'}>
                      {booking.status}
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