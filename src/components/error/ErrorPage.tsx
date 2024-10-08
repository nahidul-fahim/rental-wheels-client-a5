import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IoHome, IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaCarBurst } from "react-icons/fa6";

interface NotFoundPageProps {
    errorMessage?: string;
}

const ErrorPage: React.FC<NotFoundPageProps> = ({ errorMessage }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-body">
            <Card className="w-full max-w-2xl mx-4 bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="flex justify-center items-center bg-white">
                    <FaCarBurst className="text-primary text-9xl md:text-[140px] lg:text-[180px]" />
                </div>
                <CardContent className="p-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Oops! Wrong Turn</h1>
                    <p className="md:text-lg text-body mb-6">
                        {errorMessage || "Looks like you've veered off the main road. This page doesn't exist in our rental fleet."}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            onClick={() => navigate('/')}
                            className="bg-primary text-white hover:bg-primary/90 transition-all flex items-center justify-center"
                        >
                            <IoHome className="mr-2" /> Back to Home
                        </Button>
                        <Button
                            onClick={() => navigate(-1)}
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                        >
                            <IoArrowBack className="mr-2" /> Go Back
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ErrorPage;