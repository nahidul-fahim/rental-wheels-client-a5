/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { IoMailOutline, IoCarSportSharp, IoHome, IoChevronForward } from "react-icons/io5";
import RHFormProvider from '@/components/form/RHFormProvider';
import { FieldValues } from 'react-hook-form';
import RHInput from '@/components/form/RHInput';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useForgetPasswordMutation } from '@/redux/features/auth/authApi';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

    // validate email
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const onSubmit = async (data: FieldValues) => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        const toastId = toast.loading("Sending reset link...");
        try {
            const res = await forgetPassword(data);
            if (res?.data?.success) {
                toast.success("Reset link sent to your email!", { id: toastId, duration: 2000 });
            }
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'An error occurred';
            toast.error(errorMessage, { id: toastId, duration: 2000 });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-white to-gray-200 flex items-center justify-center py-12 px-3 md:px-8">
            <Card className="w-full max-w-md bg-white p-2 lg:p-6">
                <CardHeader className="space-y-1 mb-2">
                    {/* Breadcrumb Navigation */}
                    <nav className="flex items-center text-body/50 mb-8" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <Link to="/" className="hover:text-primary flex items-center">
                                    <IoHome className="flex-shrink-0 size-4" />
                                    <span className="sr-only">Home</span>
                                </Link>
                            </li>
                            <li className="flex items-center">
                                <IoChevronForward className="flex-shrink-0 size-3" />
                                <span className="ml-2 text-body/50 font-sm font-medium">Forget Password</span>
                            </li>
                        </ol>
                    </nav>
                    <div className="flex items-center justify-center">
                        <IoCarSportSharp className="size-8 md:size-12 text-primary" />
                        <CardTitle className="text-primary text-xl md:text-3xl font-semibold text-center ml-2">Rental Wheels</CardTitle>
                    </div>
                    <CardDescription className="text-center text-body">
                        Enter your email to reset your password
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <RHFormProvider onSubmit={onSubmit} className="space-y-4">
                        {/* email */}
                        <div className="space-y-2">
                            <div className="relative">
                                <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <RHInput
                                    type='email'
                                    name='email'
                                    placeholder='johndoe@gmail.com'
                                    className='pl-10'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-600 font-medium text-sm text-center">{error}</p>}

                        {/* submit button */}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            Send Reset Link
                        </Button>
                    </RHFormProvider>
                </CardContent>

                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-sm text-center text-body">
                        <span>Remember your password? </span>
                        <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>

                {/* privacy policy  + terms of service */}
                <div className="text-xs text-center text-gray-500 mt-4">
                    <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                    {' · '}
                    <Link to="/terms-services" className="hover:underline">Terms of Service</Link>
                </div>
            </Card>
        </div>
    );
};

export default ForgetPassword;