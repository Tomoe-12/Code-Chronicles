const express = require('express')
const QuestionControllers = require('../controllers/questionController')
const router = express.Router()

// question side
router.get('/', QuestionControllers.all)
router.post('/postQuestion', QuestionControllers.postQuestion)
router.get('/singleQuestion', QuestionControllers.getQuestion)
router.delete('/deleteQuestion', QuestionControllers.deleteQuestion)

// comment side
router.get('/comments', QuestionControllers.getComments)
router.post('/comments/:postId', QuestionControllers.addComment)
router.post('/comments/:postId/:parentCommentId', QuestionControllers.addComment)

// like post 
router.patch('/like/:postId', QuestionControllers.likeQuestion)
router.get('/liked-posts/:userId', QuestionControllers.likedPosts)

module.exports = router