import { Link, useLocation, useNavigate } from "react-router-dom"
import Validation from '../../hook/validation'
import { useForm } from 'react-hook-form'
import { useContext, useState } from "react"
import axios from "../../helpers/axios"
import { AuthContext } from "../../../contexts/AuthContext"

const Login = () => {

    const { dispatch } = useContext(AuthContext)
    const { validateEmail, validatePassword, validateRequired } = Validation
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [errorMessage, setErrorMessage] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async (data) => {
        let user = {
            email: data.email,
            password: data.password
        }

        axios.post('/api/users/login', user, { withCredentials: true })
            .then((res) => {
                if (res.status == 200) {
                    dispatch({ type: "LOGIN", payload: res.data.user })
                    navigate(from, { replace: true })
                }
            }).catch((e) => {
                console.log(e);
                if (e.response.data.error == 'error occur user does not exists') {
                    setErrorMessage('User does not exists')
                }
            })
    }

    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold  text-white">
                    Logo
                </Link>
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                            Sign in to your account
                        </h1>

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">Your email</label>
                                <input {...register('email', { validate: (value) => validateRequired(value) || validateEmail(value) })} type="email" name="email" id="email" className=" border  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-teal-600   " placeholder="name@eamil.com" />
                            </div>
                            {errors.email && <div className="col-span-2 ">
                                <p className="text-red-500 text-end  -my-5 ">{errors.email.message}</p>
                            </div>}
                            {errorMessage && <div className="col-span-2 ">
                                <p className="text-red-500 text-end   -my-5 ">{errorMessage}</p>
                            </div>}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium  text-white">Password</label>
                                <input {...register('password', { validate: (value) => validateRequired(value) || validatePassword(value) })} type="password" name="password" id="password" placeholder="password" className=" border   sm:text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-teal-600  " />
                            </div>
                            {errors.password && <div className="col-span-2 ">
                                <p className="text-red-500 text-end   -my-5 ">{errors.password.message}</p>
                            </div>}


                            <div>
                                <button type="submit" className="w-full  text-white mt-3 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-teal-600 hover:bg-teal-700 ">Sign in</button>
                            </div>
                            <p className="text-sm font-light  text-gray-400">
                                Don&apos;t have an account yet? <Link to="/SignUp" className="font-medium  hover:underline text-blue-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Login