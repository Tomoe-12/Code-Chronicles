import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from '../pages/Home/Home.jsx'
import Question from "../pages/Question/Question.jsx";
import SignIn from '../components/SingInUP/SignIn.jsx'
import SignUp from "../components/SingInUP/SignUp.jsx";
import PrivateRouter from "../PrivateRouter/PrivateRouter.jsx";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import Create from "../pages/Create/Create.jsx";


const Index = () => {

    const { user } = useContext(AuthContext)

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />
                }, {
                    path: "/home",
                    element: <Home />
                }, {
                    path: '/question',
                    element: <PrivateRouter><Question /></PrivateRouter>
                }, {
                    path: '/create',
                    element: <PrivateRouter><Create /></PrivateRouter>
                }
            ]
        }, {
            path: '/SignIn',
            element: !user ? <SignIn /> : <Navigate to={'/'} />
            // element:  <SignIn />
        }, {
            path: '/SignUp',
            element: !user ? <SignUp /> : <Navigate to={'/'} />
            // element: <SignUp />
        }

    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default Index