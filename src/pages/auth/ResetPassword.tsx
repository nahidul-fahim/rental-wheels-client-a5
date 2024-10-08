/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { IoHome, IoChevronForward, IoLockClosedOutline } from "react-icons/io5";
import RHFormProvider from '@/components/form/RHFormProvider';
import RHInput from '@/components/form/RHInput';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useResetPasswordMutation } from '@/redux/features/auth/authApi';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Validate password match
    const validatePassword = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        return true;
    };

    const onSubmit = async (data: any) => {
        if (!validatePassword()) return;

        const toastId = toast.loading("Resetting password...");
        try {
            const token = searchParams.get('token');
            const resetInfo = {
                token: token && decodeURIComponent(token),
                password: data?.password
            }
            const res = await resetPassword(resetInfo);
            if (res?.data?.success) {
                navigate("/signin")
                toast.success("Password reset successfully!", { id: toastId, duration: 2000 });
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
                                <span className="ml-2 text-body/50 font-sm font-medium">Reset Password</span>
                            </li>
                        </ol>
                    </nav>
                    <div className="flex items-center justify-center">
                        <IoLockClosedOutline className="size-8 md:size-12 text-primary" />
                        <CardTitle className="text-primary text-xl md:text-3xl font-semibold text-center ml-2">Reset Password</CardTitle>
                    </div>
                    <CardDescription className="text-center text-body">
                        Enter your new password below
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <RHFormProvider onSubmit={onSubmit} className="space-y-4">
                        {/* New password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <RHInput
                                    type='password'
                                    name='password'
                                    placeholder='New password'
                                    className='pl-10'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Confirm password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <RHInput
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Confirm password'
                                    className='pl-10'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-600 font-medium text-sm text-center">{error}</p>}

                        {/* Submit button */}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            Reset Password
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

                {/* Privacy policy + terms of service */}
                <div className="text-xs text-center text-gray-500 mt-4">
                    <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                    {' · '}
                    <Link to="/terms-services" className="hover:underline">Terms of Service</Link>
                </div>
            </Card>
        </div>
    );
};

export default ResetPassword;
