import { useContext } from 'react'
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();

    if (user) {
        return <>{children}</>
    }
    if (loading) {
        return <>....loading </>
    }

    return (
        <div>
            <Navigate
                to='/SignIn'
                state={{ from: location }}
                replace
            />
        </div>
    )
}

export default PrivateRouter