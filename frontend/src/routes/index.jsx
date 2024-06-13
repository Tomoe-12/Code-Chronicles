import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from '../pages/Home/Home.jsx'
import Question from "../pages/Question/Question.jsx";

const index = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },{
                    path : '/question',
                    element : <Question/>
                }
            ]


        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default index