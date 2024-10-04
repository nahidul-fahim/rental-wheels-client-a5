import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useToken from '@/hooks/useToken';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    isActive: boolean;
}

const UserManagement: React.FC = () => {
    const token = useToken();
    const { data, isLoading } = useGetAllUsersQuery({ token: token as string });

    const handleToggleActive = (id: string) => {
        console.log('Toggle active for user', id);
    };

    const handleChangeRole = (id: string) => {
        console.log('Change role for user', id);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const users = data?.data;
    console.log("All users", users);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">User Management</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge className='capitalize' variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={user.isActive}
                                        onCheckedChange={() => handleToggleActive(user._id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        onClick={() => handleChangeRole(user.id)} 
                                        variant="outline" 
                                        size="sm"
                                    >
                                        Change to {user.role === 'user' ? 'Admin' : 'User'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default UserManagement;