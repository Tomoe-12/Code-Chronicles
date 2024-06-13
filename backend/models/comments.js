const mongoose = require('mongoose')

const Schema = mongoose.Schema
const commentSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    },
}, { timestamps: true })

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment