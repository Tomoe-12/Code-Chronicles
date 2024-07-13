const mongoose = require('mongoose')

const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: {
            id : String ,
            icon : String ,
            name : String ,
        },
        required: true,
    },
    body: {
        type : String ,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    createdAt: { type: Date, default: Date.now },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ]
}, { timestamps: true })

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
