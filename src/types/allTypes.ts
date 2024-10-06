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


export type TUser = {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    password: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    preferences: string;
    isActive: boolean;
};