/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { IoMailOutline, IoLockClosedOutline, IoCarSportSharp, IoEye, IoEyeOff } from "react-icons/io5";
import RHFormProvider from '@/components/form/RHFormProvider';
import { FieldValues } from 'react-hook-form';
import RHInput from '@/components/form/RHInput';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
import { useSigninMutation } from '@/redux/features/auth/authApi';
import { toast } from 'sonner';
import { setUser } from '@/redux/features/auth/authSlice';


const Signin = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // redux hooks
    const dispatch = useAppDispatch();
    const [signin, { isLoading }] = useSigninMutation();

    // validate email
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // show/hide password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data: FieldValues) => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        const toastId = toast.loading("Signing in...");
        try {
            const signinInfo = {
                email: data?.email,
                password: data?.password,
            };
            // send the formData to api
            const res = await signin(signinInfo).unwrap();

            if (res?.success) {
                toast.success("Signin successful!", { id: toastId, duration: 2000 });
                navigate("/")
                // setting the user to state
                dispatch(setUser({
                    user: res?.data,
                    token: res?.token
                }));
            } else {
                toast.error(res?.message, { id: toastId, duration: 2000 });
            }
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'An error occurred';
            toast.error(errorMessage, { id: toastId, duration: 2000 });
        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-white to-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md bg-white p-6">
                <CardHeader className="space-y-1 mb-2">
                    <div className="flex items-center justify-center">
                        <IoCarSportSharp className="h-12 w-12 text-primary" />
                        <CardTitle className="text-primary text-3xl font-semibold text-center ml-2">Rental Wheels</CardTitle>
                    </div>
                    <CardDescription className="text-center text-body">
                        Sign in to start your journey
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

                        {/* password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <RHInput
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    placeholder='password'
                                    className='pl-10'
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 transform -translate-y-1/2 right-3"
                                    onClick={handleShowPassword}>
                                    {
                                        showPassword ?
                                            <IoEyeOff className="text-body/60 text-lg" />
                                            :
                                            <IoEye className="text-body/60 text-lg" />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* submit button */}
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </RHFormProvider>
                </CardContent>


                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-sm text-center">
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Forgot password?
                        </a>
                    </div>
                    <div className="text-sm text-center text-body">
                        <span>Don't have an account? </span>
                        <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </a>
                    </div>
                </CardFooter>

                {/* privacy policy  + terms of service */}
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