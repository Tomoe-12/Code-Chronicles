import { useContext, useEffect, useState } from "react";
import axios from '../../helpers/axios'
import { AuthContext } from '../../../contexts/AuthContext.jsx'
import Comment from '../../components/Comment/Comment.jsx'
import { formatDistanceToNow } from 'date-fns';

const QuestionContainer = ({ questions }) => {
    const { user } = useContext(AuthContext)
    const [likes, setLikes] = useState({})
    const [likeCount, setLikeCounts] = useState(0)
    const [selectedQuestion, setSelectedQuestion] = useState('')
    useEffect(() => {
        if (user) {
            axios.get('/api/questions/liked-posts/' + user._id)
                .then((res) => {
                    const likedQuestions = res.data;
                    const initialLikes = questions.reduce((acc, question) => {
                        acc[question._id] = likedQuestions.some(likedQuestion => likedQuestion._id === question._id);
                        return acc;
                    }, {});
                    const initialLikeCounts = questions.reduce((acc, question) => {
                        acc[question._id] = question.likes.length;
                        return acc;
                    }, {});
                    setLikes(initialLikes);
                    setLikeCounts(initialLikeCounts);
                }).catch((e) => {
                    console.log(e);
                });
        }
    }, [user, questions]);


    const giveLike = (question) => {
        const postId = question._id;
        const isLiked = likes[postId];

        axios.patch('/api/questions/like/' + postId + '', {
            likes: !likes[postId],
            userId: user._id,
        }).then(() => {
            setLikes((prevLikes) => ({ ...prevLikes, [postId]: !prevLikes[postId] }))
            setLikeCounts(prevCounts => ({ ...prevCounts, [postId]: prevCounts[postId] + (isLiked ? -1 : 1) }));
        }).catch((e) => {
            console.log(e);
        })

    }

    const openComment = (question) => {
        console.log(question);
        setSelectedQuestion(question)
        document.getElementById('my_modal_2').showModal();
    }

    return (
        <div className="flex flex-wrap -m-4 mt-10 gap-y-8">
            {
                !!questions && questions.map((question) => (
                    <div key={question._id} className="h-full p-4 lg:w-1/3 sm:w-1/2 md:w-1/2 w-full " >
                        <div className="h-full flex flex-col justify-between bg-gray-800 bg-opacity-40 md:px-8 md:py-5 px-5 py-4 rounded-lg space-y-6 overflow-hidden text-center relative">

                            <div className=" flex items-center justify-between ">
                                <div className=" w-full h-full flex items-center  space-x-3 justify-start">
                                    <div className=" ">
                                        <img src={question.icon.icon} className="md:min-w-16 md:min-h-16 min-w-12 min-h-12  " alt={question.icon.name} />
                                    </div>
                                    <p className="text-start md:text-lg text-sm">{question.title}</p>

                                </div>
                            </div>

                            <div className=" min-h-56 flex items-center">
                                <h1 className=" title-font sm:text-2xl text-xl font-medium text-white mb-3">{question.body}</h1>

                            </div>

                            <div className=" flex items-center md:flex-row flex-col  md:gap-0 gap-3 ">
                                <div className=" w-full h-full flex items-center space-x-3 justify-start">
                                    {
                                        question.author?.photoURL
                                            ? <img src="" className="min-w-10 h-10  lg:w-12 lg:h-12 rounded-full " alt="" />
                                            :
                                            <div className="w-10 h-10 lg:w-12 lg:h-12 overflow-hidden border-2 border-gray-400 rounded-full ">
                                                <svg className="object-cover w-full h-full" alt="avatar" viewBox="0 0 32.000001 32.000001" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg2" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><metadata id="metadata7"><rdf:rdf><cc:work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title /><dc:creator><cc:agent><dc:title>Timothée Giet</dc:title></cc:agent></dc:creator><dc:date>2021</dc:date><dc:description /><cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/" /></cc:work><cc:license rdf:about="http://creativecommons.org/licenses/by-sa/4.0/"><cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction" /><cc:permits rdf:resource="http://creativecommons.org/ns#Distribution" /><cc:requires rdf:resource="http://creativecommons.org/ns#Notice" /><cc:requires rdf:resource="http://creativecommons.org/ns#Attribution" /><cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks" /><cc:requires rdf:resource="http://creativecommons.org/ns#ShareAlike" /></cc:license></rdf:rdf></metadata><circle r="7.5" cy="9.5" cx={16} id="path839" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /><path id="rect841" d="M16 19c6.648 0 12 2.899 12 6.5V32H4v-6.5C4 21.899 9.352 19 16 19z" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /></g></svg>
                                            </div>
                                    }
                                    <div>
                                        <p className="text-start md:text-lg text-sm">{question.author.name}</p>
                                        <p className="text-xs text-start ">{formatDistanceToNow(new Date(question.createdAt))} ago</p>
                                    </div>

                                </div>

                                {/* give like and comment  */}
                                <div className=" md:w-1/3 w-full  flex  items-center justify-end  text-end ">
                                    <div className="flex items-center   lg:space-x-2 space-x-3 ">
                                        <div className=" bg-none inline-flex items-center space-x-1 text-teal-600 ">
                                            <button onClick={() => giveLike(question)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${likes[question._id] ? '' : 'hover:fill-red-600 hover:stroke-red-600'} cursor-pointer `} fill={likes[question._id] ? 'red' : 'none'} viewBox="0 0 24 24" stroke={likes[question._id] ? "red" : 'teal'}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                            </button>
                                            {
                                                !likeCount[question._id] == 0 && <span>{likeCount[question._id]}</span>
                                            }
                                        </div>
                                        <div className="text-2xl font-semibold text-teal-600">|</div>
                                        <div className="text-teal-500  inline-flex items-center leading-none text-base space-x-1 cursor-pointer ">
                                            <button onClick={() => openComment(question)}>
                                                <svg className="w-6 h-6 mr-1" stroke="teal" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                                </svg>
                                            </button>
                                            <span >6</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
            }

            <Comment question={selectedQuestion} />

        </div>
    )
}

export default QuestionContainer