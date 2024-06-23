const question = require('../models/questionModels')

const all = async (req, res) => {
    try {

        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 9;
        let sort = req.query.sort || "rating";

        const sortOptions = sort.split(',');
        const sortBy = {}
        sortBy[sortOptions[0]] = sortOptions[1] || 'asc'

        const resultQuestion = await jobs.find({}).sort(sortBy).skip(page * limit).limit(limit)

        const total = await question.countDocuments({})

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            resultQuestion,

        }
        res.status(200).json('get all questions')

    } catch (e) {
        res.status(500).json({ error: e.message })
    }

}

const postQuestion = (req, res) => {
    res.status(200).json('post question')
}

const getQuestion = (req, res) => {
    res.status(200).json('get question')
}

const deleteQuestion = (req, res) => {
    res.status(200).json('delete question')
}

const likeQuestion = (req, res) => {
    res.status(200).json('like question')
}

const unlikeQuestion = (req, res) => {
    res.status(200).json('unlike question')
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
    unlikeQuestion,
    addComment,
    getComments,
    deleteComment,
}