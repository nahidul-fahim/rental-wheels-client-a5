import { ChevronRight, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
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
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Privacy Policy</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="bg-white shadow-md rounded-lg p-8">
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                        <p className="mb-4">We collect information you provide directly to us, such as when you create an account, make a reservation, or contact us for support. This may include:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Name, email address, phone number, and payment information</li>
                            <li>Driver's license information and rental history</li>
                            <li>Location data when you use our mobile app</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                        <p className="mb-4">We use the information we collect to:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Process your reservations and payments</li>
                            <li>Provide customer support and respond to your requests</li>
                            <li>Improve our services and develop new features</li>
                            <li>Send you marketing communications (with your consent)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. Sharing of Information</h2>
                        <p className="mb-4">We may share your information with:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Service providers who perform services on our behalf</li>
                            <li>Law enforcement or government agencies, when required by law</li>
                            <li>Other parties in connection with a company transaction, such as a merger or sale of assets</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Your Rights and Choices</h2>
                        <p className="mb-4">You have the right to:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Access, correct, or delete your personal information</li>
                            <li>Object to the processing of your data</li>
                            <li>Withdraw your consent at any time</li>
                            <li>Opt-out of marketing communications</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Security</h2>
                        <p className="mb-4">We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Updates to This Policy</h2>
                        <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
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

export default PrivacyPolicy;