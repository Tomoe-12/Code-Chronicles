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
router.post('/:postId/comments', QuestionControllers.addComment)
router.post('/:postid/comments/:parentCommentId', QuestionControllers.addComment)

// like post 
router.post('/:postId/like', QuestionControllers.likeQuestion)
router.post('/:postId/unlike', QuestionControllers.unlikeQuestion)

module.exports = router