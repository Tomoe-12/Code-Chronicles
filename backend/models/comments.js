const mongoose = require('mongoose')

const Schema = mongoose.Schema
const commentSchema = new Schema({
    questionId: {
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
    items:{
        type :Array,
        default : null ,
    },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true })

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment
