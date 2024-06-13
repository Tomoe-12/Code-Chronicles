const question = require('../models/questionModels')

const all = (req, res) => {
    res.status(200).json('hit all')
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