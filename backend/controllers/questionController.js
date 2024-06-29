const { default: mongoose } = require('mongoose');
const Question = require('../models/questionModels')

const all = async (req, res) => {
    try {

        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 9;
        let sort = req.query.sort || "rating";

        const sortOptions = sort.split(',');
        const sortBy = {}
        sortBy[sortOptions[0]] = sortOptions[1] || 'asc'

        const resultQuestion = await Question.find({}).sort(sortBy).skip(page * limit).limit(limit)

        const total = await Question.countDocuments({})

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            resultQuestion,
        }
        res.status(200).json(response)

    } catch (e) {
        res.status(500).json({ error: 'error at getting all jobs' + e.message })
    }

}

const postQuestion = async (req, res) => {
    const newQuestion = req.body
    console.log(newQuestion);
    try {

        const result = await Question.create(newQuestion)
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

const getQuestion = (req, res) => {
    res.status(200).json('get question')
}

const deleteQuestion = (req, res) => {
    res.status(200).json('delete question')
}

const likeQuestion = async (req, res) => {
    try {
        let id = req.params.postId;
        let userId = req.body.userId


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'not a valid id' })
        }

        let question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }

        console.log(question);

        // check if the user has already liked the question
        const hasLiked = question.likes.includes(userId);
        console.log(hasLiked);
        // like and unlike the question
        if (hasLiked) {
            console.log('enter inng true hasliked ');
            question.likes = question.likes.filter((like) => { console.log('like' + like + '\n userid' + userId); like.toString() != userId })
        } else {
            // add the user Id to the likes array
            question.likes.push(userId)
            console.log('enter push user id in the array');
        }
        await question.save();

        return res.status(200).json({ likes: question.likes.length });

    } catch (e) {
        return res.status(500).json({ error: 'internet server error' });
    }
}

const likedPosts = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ msg: 'not a valid user Id' })
        }

        const likedPosts = await Question.find({ likes: userId });

        return res.status(200).json(likedPosts)
    } catch (e) {
        return res.status(500).json({ error: 'internet server error' });
    }
}

const addComment = (req, res) => {
    res.status(200).json('add comment')
}

const getComments = (req, res) => {
    res.status(200).json('get all comments ')
}

const deleteComment = (req, res) => {
    res.status(200).json('delete comment')
}



module.exports = {
    all,
    postQuestion,
    getQuestion,
    deleteQuestion,
    likeQuestion,
    likedPosts,
    addComment,
    getComments,
    deleteComment,
}