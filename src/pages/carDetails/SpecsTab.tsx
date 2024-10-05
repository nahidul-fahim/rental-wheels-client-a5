import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { TSingleCar } from "@/types/allTypes";
import { IoCalendarNumber, IoCarSport, IoPeople, IoSpeedometer } from "react-icons/io5";


const SpecsTab = ({ carDetails }: { carDetails: TSingleCar }) => {
    return (
        <TabsContent value="specs" className="mt-4">
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4">Specifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <IoCarSport className="text-primary mr-2" />
                            <span className="text-gray-600">Type: {carDetails.carType}</span>
                        </div>
                        <div className="flex items-center">
                            <IoSpeedometer className="text-primary mr-2" />
                            <span className="text-gray-600">Color: {carDetails.color}</span>
                        </div>
                        <div className="flex items-center">
                            <IoPeople className="text-primary mr-2" />
                            <span className="text-gray-600">Electric: {carDetails.isElectric ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex items-center">
                            <IoCalendarNumber className="text-primary mr-2" />
                            <span className="text-gray-600">Status: {carDetails.status}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default SpecsTab;