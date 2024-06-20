import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm, } from "react-hook-form";
import Validation from '../../hook/validation'
import axios from "../../helpers/axios";
import { useState } from "react";
import { isNull } from "lodash";


const SignUp = () => {

    const { validateEmail, validatePassword, validateRequired } = Validation
    const naviagte = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const [errorMessage, setErrorMessage] = useState(null)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        let { name, email, password } = data


        let user = {
            name,
            email,
            password,
        }
        console.log(user);


        await axios.post('/api/users/register', user, {
            withCredentials: true
        }).then((res) => {
            setErrorMessage(null)
            if (res.status == 200) {
                alert('sign up sucesssfully')
                naviagte(from, { replacae: true })
            }
        }).catch((e) => {
            console.log(e.response.data.error);
            if (e.response.data.error == 'user already exists') {
                setErrorMessage('Email already In Used !')
            }
        })




    }

    return (

        <section >
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to='/' className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
                    Logo
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input {...register('name', { validate: validateRequired })} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  " placeholder="Kyaw Kyaw" />
                            </div>
                            {errors.name && <div className="col-span-2 ">
                                <p className="text-red-500 text-end  -my-5 ">{errors.name.message}</p>
                            </div>}
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input {...register('email', { validate: (value) => validateRequired(value) || validateEmail(value) })} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  " placeholder="name@gamil.com" />
                            </div>
                            {errors.email && <div className="col-span-2 ">
                                <p className="text-red-500 text-end  -my-5 ">{errors.email.message}</p>
                            </div>}
                            {errorMessage && <div className="col-span-2 ">
                                <p className="text-red-500 text-end  -my-5 ">{errorMessage}</p>
                            </div>}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input {...register('password', { validate: (value) => validateRequired(value) || validatePassword(value) })} type="password" name="password" id="password" placeholder="Enter Your Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  " />
                            </div>
                            {errors.password && <div className="col-span-2 ">
                                <p className="text-red-500 text-end   -my-5 ">{errors.password.message}</p>
                            </div>}
                            <div>
                                <label htmlFor="conpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input {...register('conpassword', { validate: (value) => validateRequired(value) || validatePassword(value) || (value == watch('password') || 'Passwords do not match') })} type="password" name="conpassword" id="conpassword" placeholder="Enter Your  Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  " />
                            </div>
                            {errors.conpassword && <div className="col-span-2 ">
                                <p className="text-red-500 text-end   -my-5 ">{errors.conpassword.message}</p>
                            </div>}


                            <div>
                                <button type="submit" className="w-full mt-3 text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>

                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to="/SignIn" className="font-medium text-blue-600 hover:underline">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp