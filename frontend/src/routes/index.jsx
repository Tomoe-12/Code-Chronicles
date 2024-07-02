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
import Profile from '../pages/Profile/profile.jsx'
import Loading from '../components/Loading/loading.jsx'
const Index = () => {

    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return <div> <Loading/> </div>
    }

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
                },{
                    path: '/profile',
                    element: user ? <Profile /> : <Navigate to={'/'} />
                    // element: <\Profile />
                },
            ]
        }, {
            path: '/SignIn',
            element: !user ? <SignIn /> : <Navigate to={'/'} />
            // element:  <SignIn />
        }, {
            path: '/SignUp',
            element: !user ? <SignUp /> : <Navigate to={'/'} />
            // element: <SignUp />
        }, 

    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default Index