import { useContext, useEffect, useState } from "react";
import CommentBox from "../Comment/CommentBox";
import useNode from "../../hook/useNode";
import { formatDistanceToNow, isValid } from 'date-fns';
import './style.css'
import { addComment, getComments } from "../../helpers/api";
import { AuthContext } from "../../../contexts/AuthContext";


const App = ({ question }) => {
    const { user } = useContext(AuthContext)
    const [commentsData, setCommentsData] = useState({ _id: 1, items: [] });
    const { insertNode, editNode, deleteNode } = useNode();

    useEffect(() => {
        fetchComments()
    }, [question]);

    const fetchComments = async () => {
        try {
            const response = await getComments(question._id);
            console.log('response.data  : ', response.data);
            setCommentsData({ _id: 1, items: response.data });
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleInsertNode = async (folderId, item) => {

        let comment = {
            author: user._id,
            body: item,
            parentComment: folderId !== 1 ? folderId : null
        }
        try {
            const newComment = await addComment(question._id, comment);
            // console.log('new comment : ', newComment);
            const finalStructure = insertNode(commentsData, folderId, newComment);
            // console.log('final structure : ', finalStructure);
            setCommentsData(finalStructure);
            fetchComments()
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleEditNode = (folderId, value) => {
        const finalStructure = editNode(commentsData, folderId, value);
        setCommentsData(finalStructure);
        fetchComments()
    };

    const handleDeleteNode = (folderId) => {
        const finalStructure = deleteNode(commentsData, folderId);
        const temp = { ...finalStructure };
        setCommentsData(temp);
        fetchComments()
    };
    const formattedDate = isValid(new Date(question.createdAt)) ? formatDistanceToNow(new Date(question.createdAt)) : 'Invalid date';

    return (
        <>
            <div className="modal-box lg:min-w-[60%] sm:min-w-[90%] p-0">
                <div className="px-7 py-3  m-0">

                    <div className=" w-full flex justify-between items-center">
                        {/* name and show days */}
                        <div className=" w-full h-full flex items-center space-x-2 justify-start ">
                            {
                                question.author?.photoURL
                                    ? <img src="" className="min-w-6 h-6 md:min-w-10 md:h-10 rounded-full " alt="" />
                                    :
                                    <div className="min-w-8 h-8 md:min-w-10 md:h-10 overflow-hidden border-2 border-gray-400 rounded-full ">
                                        <svg className="object-cover w-full h-full" alt="avatar" viewBox="0 0 32.000001 32.000001" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg2" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><metadata id="metadata7"><rdf:rdf><cc:work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title /><dc:creator><cc:agent><dc:title>Timothée Giet</dc:title></cc:agent></dc:creator><dc:date>2021</dc:date><dc:description /><cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/" /></cc:work><cc:license rdf:about="http://creativecommons.org/licenses/by-sa/4.0/"><cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction" /><cc:permits rdf:resource="http://creativecommons.org/ns#Distribution" /><cc:requires rdf:resource="http://creativecommons.org/ns#Notice" /><cc:requires rdf:resource="http://creativecommons.org/ns#Attribution" /><cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks" /><cc:requires rdf:resource="http://creativecommons.org/ns#ShareAlike" /></cc:license></rdf:rdf></metadata><circle r="7.5" cy="9.5" cx={16} id="path839" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /><path id="rect841" d="M16 19c6.648 0 12 2.899 12 6.5V32H4v-6.5C4 21.899 9.352 19 16 19z" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /></g></svg>
                                    </div>
                            }

                            <div>
                                <p className="text-start md:text-base text-sm">{question.author?.name}</p>
                                <p className="text-xs text-start">{formattedDate} ago</p>
                            </div>

                        </div>

                        <div className="">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-circle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="w-full md:text-2xl text-xl my-2">
                        <h1 className=" ">{question.title}</h1>
                    </div>



                    <div className="mt-6 pb-5 md:text-lg text-base text-center min-w-10 ">
                        <p>{question.body}</p>
                    </div>
                </div>

                <div className="px-7 py-3 m-0">

                    {/* <CommentBox/> */}
                    <div className="mt-5 w-full" >
                        <CommentBox
                            handleInsertNode={handleInsertNode}
                            handleEditNode={handleEditNode}
                            handleDeleteNode={handleDeleteNode}
                            comment={commentsData}
                        />
                    </div>

                </div>


            </div>

        </>

    );
};

export default App;