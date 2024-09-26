import App from "@/App";
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
            }
        ]
    }
]);


export default router;