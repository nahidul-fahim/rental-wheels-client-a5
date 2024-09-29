import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, User2Icon, MailIcon, PhoneIcon, MapPinIcon, HeartIcon, PencilIcon } from 'lucide-react';

const Overview = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
    preferences: 'No smoking, pet-friendly',
    avatarUrl: '/api/placeholder/64/64'
  });

  const [bookingHistory, setBookingHistory] = useState([
    { id: 1, carName: 'Tesla Model 3', startDate: '2024-08-01', endDate: '2024-08-05', status: 'Completed' },
    { id: 2, carName: 'BMW X5', startDate: '2024-09-15', endDate: '2024-09-18', status: 'Completed' },
    { id: 3, carName: 'Audi A6', startDate: '2024-10-10', endDate: '2024-10-15', status: 'Upcoming' },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement API call to update user information
    setIsEditing(false);
  };

  const InfoItem = ({ icon: Icon, label, value, name }) => (
    <div className="flex items-center space-x-4 py-3">
      <Icon className="text-gray-400 w-5 h-5" />
      <div className="flex-grow">
        <Label htmlFor={name} className="text-sm font-medium text-gray-500">{label}</Label>
        {isEditing ? (
          <Input
            id={name}
            name={name}
            value={value}
            onChange={handleInputChange}
            className="mt-1"
          />
        ) : (
          <p className="mt-1 text-sm font-medium">{value}</p>
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
          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold text-body-dark">{user.name}</h2>
                <p className="text-body">Member since 2023</p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-1">
              <InfoItem icon={User2Icon} label="Full Name" value={user.name} name="name" />
              <Separator />
              <InfoItem icon={MailIcon} label="Email Address" value={user.email} name="email" />
              <Separator />
              <InfoItem icon={PhoneIcon} label="Phone Number" value={user.phone} name="phone" />
              <Separator />
              <InfoItem icon={MapPinIcon} label="Address" value={user.address} name="address" />
              <Separator />
              <InfoItem icon={HeartIcon} label="Preferences" value={user.preferences} name="preferences" />
            </div>
            {isEditing && (
              <div className="mt-6 flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

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