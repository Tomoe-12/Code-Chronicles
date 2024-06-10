import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from '../pages/Home/Home.jsx'

const index = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />
                }
            ]


        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default index