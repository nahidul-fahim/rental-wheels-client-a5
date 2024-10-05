import App from "@/App";
import ErrorPage from "@/components/error/ErrorPage";
import DashboardRouter from "@/components/layout/DashboardRouter";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import About from "@/pages/about/About";
import Signin from "@/pages/auth/Signin";
import Signup from "@/pages/auth/Signup";
import Booking from "@/pages/booking/Booking";
import Car from "@/pages/car/Car";
import CarDetails from "@/pages/carDetails/CarDetails";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/cars",
                element: <Car />
            },
            {
                path: "/cars/:id",
                element: <ProtectedRoute><CarDetails /></ProtectedRoute>
            },
            {
                path: "/booking",
                element: <Booking />
            }
        ]
    },
    {
        path: "/signin",
        element: <Signin />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    // dashboard
    {
        path: "/dashboard",
        element: <DashboardRouter />
    },
]);


export default router;