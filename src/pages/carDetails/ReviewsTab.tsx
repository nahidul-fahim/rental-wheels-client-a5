/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { TSingleCar } from "@/types/allTypes";
import { IoStar } from "react-icons/io5";


const ReviewsTab = ({ carDetails }: { carDetails: TSingleCar }) => {
    return (
        <TabsContent value="reviews" className="mt-4">
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
                    {carDetails.reviews && carDetails.reviews.length > 0 ? (
                        carDetails.reviews.map((review: any) => (
                            <div key={review.id} className="mb-4 pb-4 border-b last:border-b-0">
                                <div className="flex items-center mb-2">
                                    <span className="font-semibold mr-2">{review.user}</span>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <IoStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No reviews yet.</p>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default ReviewsTab;