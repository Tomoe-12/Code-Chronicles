import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext.jsx'
import axios from '../../helpers/axios'
const Navbar = () => {
    const navigate = useNavigate()
    let { user, dispatch } = useContext(AuthContext)
    console.log(user);

    const handleLogout = () => {
        axios.post('/api/users/logout', {
            withCredentials: true
        }).then((res) => {
            if (res.status == 200) {
                dispatch({ type: 'LOGOUT' })
                navigate('/')
            }
        })
    }
    const navList = (
        <>
            <li>
                <Link className="text-gray-500 transition text-base font-semibold " to='/' > Home </Link>
            </li>

            <li>
                <Link className="text-gray-500 transition text-base font-semibold" to='/question' > Questiion </Link>
            </li>
        </>
    )

    return (
        <>
            <header className=" sticky top-0 z-30 backdrop-blur-[50px]">
                <div className="mx-auto max-w-screen-xl py-0 px-6 ">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-1 md:flex md:items-center md:gap-12 ">
                            <Link className="block text-teal-600" to='/' >
                                <span className="sr-only">Home</span>
                                <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </Link>
                        </div>



                        <div className="md:flex md:items-center md:gap-12">
                            <nav aria-label="Global" className="hidden md:block">
                                <ul className="flex items-center gap-6 text-sm">
                                    {navList}
                                </ul>
                            </nav>

                            <div className="flex items-center gap-4">


                                {user ?
                                    <>
                                        <div className="dropdown dropdown-end">
                                            {/* <div tabIndex={0} role="button" className="w-10 h-10 items-center justify-center border-2  border-gray-400 btn-circle avatar">
                                <div className="w-full h-full overflow-hidden rounded-full">
                                   
                                    <svg className="w-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g></svg>

                                </div>
                            </div> */}
                                            <div className="flex items-center  gap-2 ">

                                                <div tabIndex={0} role="button" type="button" className=" flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                                    <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full ">
                                                        {
                                                            user.photoURL
                                                                ? <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover rounded-full" />
                                                                :
                                                                <svg className="object-cover w-full h-full" alt="avatar" viewBox="0 0 32.000001 32.000001" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg2" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><metadata id="metadata7"><rdf:rdf><cc:work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title /><dc:creator><cc:agent><dc:title>Timothée Giet</dc:title></cc:agent></dc:creator><dc:date>2021</dc:date><dc:description /><cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/" /></cc:work><cc:license rdf:about="http://creativecommons.org/licenses/by-sa/4.0/"><cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction" /><cc:permits rdf:resource="http://creativecommons.org/ns#Distribution" /><cc:requires rdf:resource="http://creativecommons.org/ns#Notice" /><cc:requires rdf:resource="http://creativecommons.org/ns#Attribution" /><cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks" /><cc:requires rdf:resource="http://creativecommons.org/ns#ShareAlike" /></cc:license></rdf:rdf></metadata><circle r="7.5" cy="9.5" cx={16} id="path839" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /><path id="rect841" d="M16 19c6.648 0 12 2.899 12 6.5V32H4v-6.5C4 21.899 9.352 19 16 19z" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /></g></svg>
                                                        }

                                                    </div>

                                                </div>
                                            </div>


                                            <ul tabIndex={0} className="menu menu-sm dropdown-content gap-1 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                                <li >
                                                    <Link to='/profile' className="min-h-8 max-h-9 flex justify-between items-center">Profile </Link>
                                                </li>

                                                <li>
                                                    <Link className="min-h-8 max-h-9 flex items-center  my-auto" onClick={handleLogout}>Logout</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                    :
                                    < >

                                        <div className="sm:flex sm:gap-4">
                                            <Link to='/SignIn'
                                                className="rounded-md outline-1 outline outline-teal-600 bg-teal-600 hover:bg-teal-700 hover:outline-teal-700 px-5 py-2.5 text-sm font-medium text-white shadow"

                                            >
                                                Login
                                            </Link >

                                            <div className="hidden sm:flex">
                                                <Link to='/SignUp'
                                                    className="rounded-md outline-1 outline outline-teal-600 px-5 py-2.5 text-sm font-medium text-teal-600"

                                                >
                                                    Register
                                                </Link>
                                            </div>
                                        </div>
                                    </>

                                }









                                <div className="block md:hidden dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn m-1">
                                        <label  >  <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg></label>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        {navList}
                                    </ul>
                                </div>

                            </div>
                        </div>



                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar