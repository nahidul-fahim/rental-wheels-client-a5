import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { TSingleCar } from "@/types/allTypes";


const OverviewTab = ({ carDetails }: { carDetails: TSingleCar }) => {
    return (
        <TabsContent value="overview" className="mt-4">
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4">Overview</h3>
                    <p className="text-gray-600">{carDetails.description}</p>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default OverviewTab;