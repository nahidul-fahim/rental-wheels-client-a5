/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { IoMailOutline, IoLockClosedOutline, IoCarSportSharp, IoEye, IoEyeOff, IoPersonOutline, IoPhonePortraitOutline, IoLocationOutline, IoHome, IoChevronForward } from "react-icons/io5";
import RHFormProvider from '@/components/form/RHFormProvider';
import { FieldValues } from 'react-hook-form';
import RHInput from '@/components/form/RHInput';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
import { useSignupMutation } from '@/redux/features/auth/authApi';
import { toast } from 'sonner';
import { setUser, TUser } from '@/redux/features/auth/authSlice';
import { Checkbox } from '@/components/ui/checkbox';
import { verifyToken } from '@/utils/verifyToken';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    // redux hooks
    const dispatch = useAppDispatch();
    const [signup, { isLoading }] = useSignupMutation();

    // validate email
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // show/hide password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // show/hide confirm password
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSubmit = async (data: FieldValues) => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (data.password !== data.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!termsAccepted) {
            setError('You must accept the Terms & Conditions.');
            return;
        }
        const toastId = toast.loading("Signing up...");
        try {
            const signupInfo = {
                name: data.name,
                email: data.email,
                role: 'user',
                password: data.password,
                phone: data.phone,
                address: data.address,
            };
            // send the formData to api
            const res = await signup(signupInfo).unwrap();
            const user = verifyToken(res?.token) as TUser;

            if (res?.success) {
                toast.success("Signup successful!", { id: toastId, duration: 2000 });
                navigate("/")
                // setting the user to state
                dispatch(setUser({
                    user: user,
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
        <div className="min-h-screen bg-gradient-to-tr from-white to-gray-200 flex items-center justify-center py-12 px-3 md:px-6 lg:px-8">
            <Card className="w-full max-w-md bg-white md:p-6">
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
                                <span className="ml-2 text-body/50 font-sm font-medium">Sign up</span>
                            </li>
                        </ol>
                    </nav>
                    <div className="flex items-center justify-center">
                        <IoCarSportSharp className="size-8 md:size-12 text-primary" />
                        <CardTitle className="text-primary text-xl md:text-3xl font-semibold text-center ml-2">Rental Wheels</CardTitle>
                    </div>
                    <CardDescription className="text-center text-body">
                        Sign up to start your rental journey
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <RHFormProvider onSubmit={onSubmit} className="space-y-4">
                        {/* name */}
                        <div className="space-y-2">
                            <div className="relative">
                                <IoPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <RHInput
                                    type='text'
                                    name='name'
                                    placeholder='Full Name'
                                    className='pl-10'
                                />
                            </div>
                        </div>

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

                        {/* password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <RHInput
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    placeholder='Password'
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

                        {/* confirm password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <RHInput
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name='confirmPassword'
                                    placeholder='Confirm Password'
                                    className='pl-10'
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 transform -translate-y-1/2 right-3"
                                    onClick={handleShowConfirmPassword}>
                                    {
                                        showConfirmPassword ?
                                            <IoEyeOff className="text-body/60 text-lg" />
                                            :
                                            <IoEye className="text-body/60 text-lg" />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* phone number */}
                        <div className="space-y-2">
                            <div className="relative">
                                <IoPhonePortraitOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <RHInput
                                    type='tel'
                                    name='phone'
                                    placeholder='Phone Number (optional)'
                                    className='pl-10'
                                />
                            </div>
                        </div>

                        {/* address */}
                        <div className="space-y-2">
                            <div className="relative">
                                <IoLocationOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <RHInput
                                    type='text'
                                    name='address'
                                    placeholder='Address'
                                    className='pl-10'
                                />
                            </div>
                        </div>

                        {/* terms and conditions */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                checked={termsAccepted}
                                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I accept the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                            </label>
                        </div>

                        {error && <p className="text-red-600 font-medium text-sm text-center">{error}</p>}

                        {/* submit button */}
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? "Signing up..." : "Sign Up"}
                        </Button>
                    </RHFormProvider>
                </CardContent>

                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-sm text-center text-body">
                        <span>Already have an account? </span>
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

export default Signup;