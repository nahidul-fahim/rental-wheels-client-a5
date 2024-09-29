import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    isActive: boolean;
}

const UserManagement: React.FC = () => {
    const users: User[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', isActive: true },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', isActive: true },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', isActive: false },
    ];

    const handleToggleActive = (id: string) => {
        console.log('Toggle active for user', id);
    };

    const handleChangeRole = (id: string) => {
        console.log('Change role for user', id);
    };

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
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={user.isActive}
                                        onCheckedChange={() => handleToggleActive(user.id)}
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