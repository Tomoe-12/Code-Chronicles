import { useCallback, } from "react";
import { useDropzone } from "react-dropzone";

const ProfilePhoto = ({ user, update, files, onChange }) => {

    // change to blob file 
    const convertFileToUrl = (file) => URL.createObjectURL(file);


    const onDrop = useCallback((acceptedFiles) => {
        onChange(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="w-fit h-fit relative  ">
            {
                files && files.length > 0
                    ? <img
                        src={convertFileToUrl(files[0])}
                        width={800}
                        height={800}
                        alt="uploaded image"
                        className="mx-auto flex justify-center md:w-[200px] md:h-[200px] w-[150px] h-[150px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat max-h-[400px] overflow-hidden object-cover "
                    />
                    : user?.photoURL && !files
                        ? <img src={user.photoURL} alt={user.displayName} className="mx-auto flex justify-center md:w-[200px] md:h-[200px] w-[150px] h-[150px] border border-gray-500 bg-blue-300/20  rounded-full bg-cover bg-center bg-no-repeat outline-1 " />
                        : <svg className="mx-auto flex justify-center md:w-[200px] md:h-[200px] w-[150px] h-[150px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat " alt="avatar" viewBox="0 0 32.000001 32.000001" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg2" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><metadata id="metadata7"><rdf:rdf><cc:work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title /><dc:creator><cc:agent><dc:title>Timothée Giet</dc:title></cc:agent></dc:creator><dc:date>2021</dc:date><dc:description /><cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/" /></cc:work><cc:license rdf:about="http://creativecommons.org/licenses/by-sa/4.0/"><cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction" /><cc:permits rdf:resource="http://creativecommons.org/ns#Distribution" /><cc:requires rdf:resource="http://creativecommons.org/ns#Notice" /><cc:requires rdf:resource="http://creativecommons.org/ns#Attribution" /><cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks" /><cc:requires rdf:resource="http://creativecommons.org/ns#ShareAlike" /></cc:license></rdf:rdf></metadata><circle r="7.5" cy="9.5" cx={16} id="path839" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /><path id="rect841" d="M16 19c6.648 0 12 2.899 12 6.5V32H4v-6.5C4 21.899 9.352 19 16 19z" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /></g></svg>
            }
            {
                update &&
                <div {...getRootProps()} className="md:top-0 md:right-4 top-0 right-0  flex items-center justify-center  absolute bg-white border border-gray-300 rounded-full  w-10 h-10 text-center ">
                    <input {...getInputProps()} hidden type="file" />

                    <label htmlFor="upload_profile">
                        <svg data-slot="icon" className="w-7 h-6 text-blue-500" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
                        </svg>
                    </label>
                </div>
            }

        </div>

    )
}

export default ProfilePhoto