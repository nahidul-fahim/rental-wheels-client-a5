import App from "@/App";
import Car from "@/pages/car/Car";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // errorElement: <></>
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/cars",
                element: <Car />
            }
        ]
    }
]);


export default router;