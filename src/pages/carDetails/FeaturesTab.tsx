import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { TSingleCar } from "@/types/allTypes";


const FeaturesTab = ({ carDetails }: { carDetails: TSingleCar }) => {
    return (
        <TabsContent value="features" className="mt-4">
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4">Features</h3>
                    <ul className="list-disc pl-5">
                        {carDetails?.features?.map((feature: string, index: number) => (
                            <li key={index} className="text-gray-600 mb-2">{feature}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default FeaturesTab;