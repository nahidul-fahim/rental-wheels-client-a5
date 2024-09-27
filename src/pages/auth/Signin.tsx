import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { IoAlertCircleOutline, IoMailOutline, IoLockClosedOutline, IoCarSportSharp   } from "react-icons/io5";


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        // Here you would typically handle the sign-in process
        console.log('Sign in with', email, password);
        // Redirect to dashboard (simulated)
        alert('Sign in successful! Redirecting to your Rental Wheels dashboard...');
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-white to-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md bg-white p-6">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center">
                        <IoCarSportSharp className="h-12 w-12 text-primary" />
                        <CardTitle className="text-primary text-3xl font-semibold text-center ml-2">Rental Wheels</CardTitle>
                    </div>
                    <CardDescription className="text-center text-lg text-body">
                        Sign in to start your journey
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <Input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                        {error && (
                            <Alert variant="destructive">
                                <IoAlertCircleOutline className="size-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-sm text-center">
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Forgot password?
                        </a>
                    </div>
                    <div className="text-sm text-center">
                        <span>Don't have an account? </span>
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up for Rental Wheels
                        </a>
                    </div>
                </CardFooter>
                <div className="text-xs text-center text-gray-500 mt-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    {' · '}
                    <a href="#" className="hover:underline">Terms of Service</a>
                </div>
            </Card>
        </div>
    );
};

export default Signin;