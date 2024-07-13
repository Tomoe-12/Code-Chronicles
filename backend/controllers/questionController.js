const { default: mongoose } = require('mongoose');
const Question = require('../models/questionModels')

const all = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 9;
        let sort = req.query.sort || "createdAt,desc";

        const sortOptions = sort.split(',');
        const sortBy = {}
        sortBy[sortOptions[0]] = sortOptions[1] || 'asc'

        const resultQuestion = await Question.find({})
        .populate('author','photoURL name')
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit)

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


        // check if the user has already liked the question
        const hasLiked = question.likes.includes(userId);
        // like and unlike the question
        if (hasLiked) {
            question.likes = question.likes.filter((like) => { like.toString() != userId })
        } else {
            // add the user Id to the likes array
            question.likes.push(userId)
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


// Get all comments
const allComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Add a new comment
const addNewComment = async (req, res) => {
    try {
        const { postId } = req.params; // Assuming postId is passed in the URL params
        const { body, author } = req.body;

        const newComment = new Comment({
            question: postId, // Assuming postId is the question id
            author,
            body,
        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Edit a comment
const editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { body } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(commentId, { body }, { new: true });

        if (!updatedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = {
    all,
    postQuestion,
    getQuestion,
    deleteQuestion,
    likeQuestion,
    likedPosts,
    allComments,
    addNewComment,
    editComment,
    deleteComment,
}