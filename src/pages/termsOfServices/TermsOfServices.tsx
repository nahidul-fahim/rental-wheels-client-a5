import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="flex mb-8" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
                                <Home className="mr-2 h-4 w-4" />
                                Home
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Terms of Service</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="bg-white shadow-md rounded-lg p-8">
                    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                        <p className="mb-4">By accessing or using our car rental services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
                        <p className="mb-4">To use our services, you must:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Be at least 21 years of age</li>
                            <li>Possess a valid driver's license</li>
                            <li>Have a clean driving record</li>
                            <li>Provide a valid form of payment</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. Reservation and Cancellation</h2>
                        <p className="mb-4">Reservations are subject to vehicle availability. We reserve the right to cancel or modify reservations under certain circumstances. Cancellation fees may apply based on the timing of the cancellation.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Vehicle Use</h2>
                        <p className="mb-4">You agree to:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Use the vehicle only for personal or business use</li>
                            <li>Not use the vehicle for any illegal activities</li>
                            <li>Not sublease or transfer the vehicle to others</li>
                            <li>Return the vehicle in the same condition as received, normal wear and tear excepted</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Insurance and Liability</h2>
                        <p className="mb-4">We provide basic insurance coverage with each rental. Additional coverage options are available. You are responsible for any damage to the vehicle resulting from your use, subject to the terms of the selected insurance coverage.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Fees and Payments</h2>
                        <p className="mb-4">You agree to pay all fees associated with your rental, including the base rental rate, insurance fees, fuel charges, late return fees, and any applicable taxes. Additional charges may apply for violations of these terms or damage to the vehicle.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Modifications to Terms</h2>
                        <p className="mb-4">We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes. Your continued use of our services after such modifications constitutes your acceptance of the updated terms.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                        <p className="mb-4">To the fullest extent permitted by law, we disclaim all warranties, express or implied, regarding our services. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
                    </section>

                    <p className="text-sm text-gray-600">Last Updated: 7 October 2024</p>

                    <div className="mt-8">
                        <Button className="bg-primary text-white hover:bg-primary/90" onClick={() => window.history.back()}>
                            Back to Previous Page
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;