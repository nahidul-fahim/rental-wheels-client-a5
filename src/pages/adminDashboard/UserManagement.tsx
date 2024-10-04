/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useToken from '@/hooks/useToken';
import { useGetAllUsersQuery, useUpdateUserStatusMutation } from '@/redux/features/user/userApi';
import { toast } from 'sonner';

const UserManagement: React.FC = () => {
    const token = useToken();
    const { data, isLoading, refetch } = useGetAllUsersQuery({ token: token as string });
    const [updateUserStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();

    // toggle user status
    const handleToggleActive = async (id: string, isActive: boolean) => {
        const toastId = toast.loading('Updating user status...');
        const res = await updateUserStatus({ id, updatedData: { isActive: !isActive }, token: token as string });
        if (res?.data?.success) {
            refetch();
            toast.success('User status updated successfully', { id: toastId, duration: 2000 });
        } else {
            toast.error('Failed to update user status', { id: toastId, duration: 2000 });
        }
    };

    // handle change role
    const handleChangeRole = async (id: string, role: string) => {
        const toastId = toast.loading('Updating user role...');
        const res = await updateUserStatus({ id, updatedData: { role: role === 'user' ? 'admin' : 'user' }, token: token as string });
        if (res?.data?.success) {
            refetch();
            toast.success('User role updated successfully', { id: toastId, duration: 2000 });
        } else {
            toast.error('Failed to update user role', { id: toastId, duration: 2000 });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const users = data?.data;

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
                        {users.map((user: any) => (
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
                                        disabled={isUpdating}
                                        checked={user.isActive}
                                        onCheckedChange={() => handleToggleActive(user._id, user.isActive)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleChangeRole(user._id, user.role)}
                                        variant="outline"
                                        size="sm"
                                        disabled={isUpdating}
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