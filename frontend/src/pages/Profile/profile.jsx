import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import { useForm } from 'react-hook-form'
import ProfilePhoto from "../../components/SingInUP/ProfilePhoto.jsx";
import Validation from '../../hook/validation'
import axios from '../../helpers/axios'


const Profile = () => {

    const { user } = useContext(AuthContext);
    const [update, setUpdate] = useState(false)
    const [files, setFiles] = useState([]);
    const { validateEmail } = Validation

    // console.log('user , ::: ', user);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    console.log(files[0]?.name);


    const onSubmit = async (data) => {
        console.log(files[0]);

        let formData;
        let blobFile;
        if (files && files.length > 0) {
            blobFile = new Blob([files[0]])
            console.log('blbo ifle : ', blobFile);
            
            formData = new FormData();
            formData.append('file', files[0])
            formData.append('name', data.name)
            formData.append('email', data.email)
            formData.append('fileName', files[0].name)
        }

        // Log the formData entries
        for (const [key, value] of formData.entries()) {
            if (value instanceof Blob) {
                console.log(`${key}: Blob`);
            } else {
                console.log(`${key}:`, value);
            }
        }
        try {

            axios.patch(`api/users/updateProfile/${user._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((result) => {
                    console.log(result);
                    alert('Update successfully')
                }).catch((error) => {
                    console.log(error);
                    alert('sth went wrong')
                })


        } catch (error) {
            console.log('error :', error);
        }
        console.log('data :::: ', data);

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

                            <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-0" >
                                {/* Profile Image */}

                                <div className="mt-10 flex justify-center  ">
                                    <ProfilePhoto user={user} update={update} files={files} onChange={setFiles} />

                                </div>
                                {/* <h2 className="text-center mt-1 font-semibold">Upload Propfile and Cover Image</h2> */}
                                <div className="grid mt-8 gap-x-8 grid-cols-2 gap-y-7  ">

                                    <div className={`col-span-2 ${update && 'sm:col-span-1'} `} >
                                        {
                                            update ?
                                                <>
                                                    <label className="block mb-2 text-sm text-gray-600 ">Name</label>
                                                    <input {...register('name')} type="text" placeholder={user?.name || 'mg mg'} className="block w-full px-5 py-3 mt-2 text-white placeholder-gray-400 border border-gray-600 rounded-lg bg-gray-700   focus:outline-none focus:ring-2 focus:ring-teal-600 " />
                                                </>
                                                :
                                                <div className="my-2 text-center  grid grid-cols-[40%,60%] ">
                                                    <div className=" w-full">
                                                        <p className="lg:text-3xl font-semibold md:text-2xl text-xl break-all">Name</p>
                                                    </div>
                                                    <p className=" lg:text-3xl md:text-2xl text-xl break-all">{user?.name}</p>
                                                </div>
                                        }
                                    </div>
                                    <div className={`col-span-2 ${update && 'sm:col-span-1'} `} >
                                        {
                                            update ?
                                                <>
                                                    <label className="block mb-2 text-sm text-gray-600 ">Email address</label>
                                                    <input {...register('email', { validate: (value) => validateEmail(value) })} type="text" placeholder={user?.email || "johnsnow@ucstgi.com"} className="block w-full  px-5 py-3 mt-2 text-white placeholder-gray-400 border border-gray-600 rounded-lg bg-gray-700   focus:outline-none focus:ring-2 focus:ring-teal-600 " />
                                                </>
                                                :
                                                <div className="my-2 text-center  grid grid-cols-[40%,60%] ">
                                                    <div className=" w-full">
                                                        <p className="lg:text-3xl font-semibold md:text-2xl text-xl break-all">Email</p>
                                                    </div>
                                                    <p className="lg:text-3xl md:text-2xl text-xl  break-all">{user?.email}</p>
                                                </div>
                                        }
                                        {errors.email && <div className="col-span-2 ">
                                            <p className="text-red-500 text-end   ">{errors.email.message}</p>
                                        </div>}
                                    </div>

                                    {
                                        update &&
                                        <div className="mb-4  col-span-2 ">
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
