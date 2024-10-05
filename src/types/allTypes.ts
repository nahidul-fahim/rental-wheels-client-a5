export type TSingleCar = {
    _id: string;
    name: string;
    description: string;
    carType: string;
    color: string;
    isElectric: boolean;
    features: string[];
    pricePerHour: number;
    image: string;
    status: string;
    reviews?: string[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
};