import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { TSingleCar } from "@/types/allTypes";


const DetailsTab = ({ carDetails }: { carDetails: TSingleCar }) => {
    return (
        <TabsContent value="details" className="mt-4">
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4">Car Details</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Features</h4>
                            <ul className="list-disc pl-5">
                                {carDetails?.features?.map((feature: string, index: number) => (
                                    <li key={index} className="text-gray-600 mb-2">{feature}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Insurance Options</h4>
                            <p className="text-gray-600">We offer comprehensive insurance coverage for your peace of mind. Options include:</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li className="text-gray-600">Basic Coverage: Included in the rental price</li>
                                <li className="text-gray-600">Premium Coverage: Additional $20/day for extra protection</li>
                                <li className="text-gray-600">Full Coverage: Additional $35/day for complete peace of mind</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Cancellation Policy</h4>
                            <p className="text-gray-600">We understand that plans can change. Our cancellation policy is as follows:</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li className="text-gray-600">Free cancellation up to 48 hours before pickup</li>
                                <li className="text-gray-600">50% refund for cancellations between 48 and 24 hours before pickup</li>
                                <li className="text-gray-600">No refund for cancellations less than 24 hours before pickup</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default DetailsTab;