import { createContext, useEffect, useReducer, useState } from "react";
import axios from 'axios'

const AuthContext = createContext()

let AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem('user', JSON.stringify(action.payload))
            return { user: action.payload }
        case 'LOGOUT':
            localStorage.removeItem('user');
            return { user: null }
        default:
            return state;
    }
}

const AuthContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    let [state, dispatch] = useReducer(AuthReducer, {
        user: null,
        loading
    })

    useEffect(() => {
        const authFun = async () => {
            try {
                const res = await axios.get("/api/users/me");
                const user = res.data;
                if (user) {
                    dispatch({ type: "LOGIN", payload: user });
                } else {
                    dispatch({ type: "LOGOUT" });
                }
            } catch (error) {
                dispatch({ type: "LOGOUT" });
            } finally {
                setLoading(false);
            }
        };
        authFun();
    }, []);
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }



