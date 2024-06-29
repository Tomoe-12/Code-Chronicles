import { useContext, useEffect, useState } from "react";
import axios from '../../helpers/axios'
import { AuthContext } from '../../../contexts/AuthContext.jsx'
const QuestionContainer = ({ questions }) => {
    const { user } = useContext(AuthContext)
    console.log(questions);
    const [likes, setLikes] = useState({})
    const [likeCount, setLikeCounts] = useState(0)

    console.log(user);

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
            console.log('error at giving like ' + e);
        })

    }

    return (
        <div className="flex flex-wrap -m-4 mt-10 gap-y-8">
            {
                !!questions && questions.map((question) => (
                    <div key={question._id} className="h-full p-4 lg:w-1/3 sm:w-1/2 md:w-1/2 w-full " >
                        <div className="h-full flex flex-col justify-between bg-gray-800 bg-opacity-40 px-8  py-5 rounded-lg space-y-6 overflow-hidden text-center relative">

                            <div className=" flex items-center justify-between ">
                                <div className=" w-[75%] h-full flex items-center space-x-3 justify-start">
                                    <img src={question.icon.icon} className="w-16 h-16 rounded-full " alt={question.icon.name} />
                                    <p className="text-start">{question.title}</p>

                                </div>
                                <div className=" w-[25%] text-end">
                                    <p>1 day ago </p>
                                </div>
                            </div>

                            <div className=" min-h-56 flex items-center">
                                <h1 className=" title-font sm:text-2xl text-xl font-medium text-white mb-3">{question.body}</h1>

                            </div>

                            <div className=" flex items-center justify-between ">
                                <div className=" w-1/2 h-full flex items-center space-x-3 justify-start">
                                    <img src="" className="w-10 h-10   rounded-full test" alt="" />
                                    <p>lsadfjsldfj ;</p>

                                </div>

                                {/* give like and comment  */}
                                <div className=" w-1/2 flex items-center justify-end text-end ">
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
                                            <svg className="w-6 h-6 mr-1" stroke="teal" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                            </svg>
                                            <span >6</span>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default QuestionContainer