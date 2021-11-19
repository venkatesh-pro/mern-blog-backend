const express = require('express')
const { protect, isAdmin } = require('../config/protect')
const {
  createTopicName,
  createArticle,
  getAllTopics,
  getRelatedArticleToTheTitle,
  getCurrentArticle,
  editCurrentArticle,
  deleteArticle,
  deleteTopicName,
} = require('../controller/articleController')

const router = express.Router()

router.route('/').post(createTopicName).get(getAllTopics)
router.route('/:id').delete(deleteArticle)
router.route('/topicNameDel/:id').delete(deleteTopicName)

router.route('/createArticle').post(protect, createArticle)
router
  .route('/getRelatedArticleToTheTitle/:id')
  .get(getRelatedArticleToTheTitle)

router.route('/getCurrentArticle/:id').get(getCurrentArticle)
router
  .route('/editCurrentArticle/:id')
  .post(protect, isAdmin, editCurrentArticle)
module.exports = router
