import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import { useForm } from 'react-hook-form'
const Profile = () => {

    const { user, updateUserProfile } = useContext(AuthContext);
    const [update, setUpdate] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        let name = data.name
        let email = data.email
        let photoURL = data.photoURL

        updateUserProfile(name, photoURL)
            .then((result) => {
                alert('Update sucessfully')
            }).catch((error) => {
                alert('sth went wrong')
                console.log(error);

            })


    }
    const updateChange = () => {
        setUpdate(!update)
    }
    return (
        <>
            <section className="py-10 md:pt-32 pt-20 min-h-screen ">
                <div className="lg:w-[50%] md:w-[70%] w-[80%] xs:w-[100%] mx-auto  flex gap-4 ">
                    <div className={`w-full outline outline-teal-600   mx-auto shadow-3xl sm:px-10 px-5  py-7 rounded-xl h-fit self-center `}>
                        {/* Profile Form */}
                        <div className=" flex flex-col ">

                            <div className="flex justify-between ">

                                <h1 className="text-teal-600  tracking-wider lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-serif font-extrabold mb-2 "> Profile  </h1>

                                {
                                    update ?
                                        <button className="w-9 h-9 " onClick={updateChange}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="#0d9488">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        :
                                        <button className="w-9 h-9" onClick={updateChange} >
                                            <svg className="icon flat-color " fill="#000000" viewBox="0 0 24 24" id="update-alt-2" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path id="primary" d="M21.71,10.29a1,1,0,0,0-1.42,0L19,11.59V7a3,3,0,0,0-3-3H6A1,1,0,0,0,6,6H16a1,1,0,0,1,1,1v4.59l-1.29-1.3a1,1,0,0,0-1.42,1.42l3,3a1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,21.71,10.29Z" style={{ fill: '#6b7280' }} /><path id="secondary" d="M18,18H8a1,1,0,0,1-1-1V12.41l1.29,1.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-3-3a1,1,0,0,0-1.42,0l-3,3a1,1,0,0,0,1.42,1.42L5,12.41V17a3,3,0,0,0,3,3H18a1,1,0,0,0,0-2Z" style={{ fill: '#0d9488' }} /></g></svg>
                                        </button>
                                }


                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-0">
                                {/* Profile Image */}

                                <div className="mt-10 flex justify-center  ">
                                    <div className="w-fit h-fit relative  ">
                                        {
                                            user?.photoURL
                                                ? <img src={user.photoURL} alt={user.displayName} className="mx-auto flex justify-center md:w-[200px] md:h-[200px] w-[150px] h-[150px] border border-gray-500 bg-blue-300/20  rounded-full bg-cover bg-center bg-no-repeat outline-1 " />
                                                :
                                                <svg className="mx-auto flex justify-center md:w-[200px] md:h-[200px] w-[150px] h-[150px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat " alt="avatar" viewBox="0 0 32.000001 32.000001" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg2" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><metadata id="metadata7"><rdf:rdf><cc:work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title /><dc:creator><cc:agent><dc:title>Timothée Giet</dc:title></cc:agent></dc:creator><dc:date>2021</dc:date><dc:description /><cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/" /></cc:work><cc:license rdf:about="http://creativecommons.org/licenses/by-sa/4.0/"><cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction" /><cc:permits rdf:resource="http://creativecommons.org/ns#Distribution" /><cc:requires rdf:resource="http://creativecommons.org/ns#Notice" /><cc:requires rdf:resource="http://creativecommons.org/ns#Attribution" /><cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks" /><cc:requires rdf:resource="http://creativecommons.org/ns#ShareAlike" /></cc:license></rdf:rdf></metadata><circle r="7.5" cy="9.5" cx={16} id="path839" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /><path id="rect841" d="M16 19c6.648 0 12 2.899 12 6.5V32H4v-6.5C4 21.899 9.352 19 16 19z" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /></g></svg>
                                        }

                                        <div className="md:top-0 md:right-4 top-0 right-0 flex items-center justify-center  absolute bg-white border border-gray-300 rounded-full  w-10 h-10 text-center ">
                                            <input {...register('photoURL')} type="file" name="profile" className="upload_profile" id="upload_profile" hidden required />
                                            <label htmlFor="upload_profile">
                                                <svg data-slot="icon" className="w-7 h-6 text-blue-500" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
                                                </svg>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/* <h2 className="text-center mt-1 font-semibold">Upload Propfile and Cover Image</h2> */}
                                <div className="grid gap-6 mt-8 grid-cols-1 ">

                                    <div className="sm:col-span-1 col-span-2 " >

                                        {
                                            update ?
                                                <>
                                                    <label className="block mb-2 text-sm text-gray-600 ">Name</label>
                                                    <input {...register('name')} type="text" placeholder={user?.name || 'mg mg'} className="block w-full px-5 py-3 mt-2 text-white placeholder-gray-400 border border-gray-600 rounded-lg bg-gray-700   focus:outline-none focus:ring-2 focus:ring-teal-600 " />

                                                </>
                                                :
                                                <div className="my-2 md:px-28 px-0 text-center">
                                                    <p className="lg:text-3xl md:text-2xl text-xl break-all">{user?.name}</p>
                                                </div>
                                        }
                                    </div>


                                    <div className="col-span-2 sm:col-span-1 " >
                                        {
                                            update ?
                                                <>
                                                    <label className="block mb-2 text-sm text-gray-600 ">Email address</label>
                                                    <input {...register('email')} type="email" placeholder={user?.email || "johnsnow@ucstgi.com"} className="block w-full  px-5 py-3 mt-2 text-white placeholder-gray-400 border border-gray-600 rounded-lg bg-gray-700   focus:outline-none focus:ring-2 focus:ring-teal-600 " />
                                                </>
                                                :
                                                <div className="my-2 text-center md:px-28 px-0 w-full ">
                                                    <p className="lg:text-3xl md:text-2xl text-xl  break-all">{user?.email}</p>
                                                </div>
                                        }
                                    </div>

                                    {
                                        update &&
                                        <div className="my-4  col-span-2 ">
                                            <button type="submit" className=" flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-600 rounded-lg hover:bg-teal-700 ">
                                                <span>Update</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    }
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;
