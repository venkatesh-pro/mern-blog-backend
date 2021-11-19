const AppError = require('../config/AppError')
const { TopicNameModel, articleModel } = require('../models/articles')

exports.createTopicName = async (req, res) => {
  try {
    const article = await TopicNameModel.create(req.body)

    res.json(article)
  } catch (error) {
    console.log(error)
  }
}

exports.createArticle = async (req, res, next) => {
  try {
    const article = await articleModel.create(req.body)

    res.json(article)
  } catch (error) {
    // console.log(error)
    return next(new AppError('Enter all Fields', 400))
  }
}

exports.getAllTopics = async (req, res) => {
  try {
    const article = await TopicNameModel.find()

    res.json(article)
  } catch (error) {
    console.log(error)
  }
}
exports.deleteArticle = async (req, res) => {
  try {
    const article = await articleModel.findByIdAndDelete(req.params.id)
    console.log(article)
    res.json('success')
  } catch (error) {
    console.log(error)
  }
}
exports.deleteTopicName = async (req, res) => {
  try {
    const topicName = await TopicNameModel.findByIdAndDelete(req.params.id)
    const article = await articleModel.deleteMany({
      parentId: req.params.id,
    })
    res.json('success')
  } catch (error) {
    console.log(error)
  }
}
exports.getRelatedArticleToTheTitle = async (req, res) => {
  try {
    const article = await articleModel.find({
      parentId: req.params.id,
    })

    res.json(article)
  } catch (error) {
    console.log(error)
  }
}

exports.getCurrentArticle = async (req, res) => {
  try {
    const article = await articleModel.findById(req.params.id)

    res.json(article)
  } catch (error) {
    console.log(error)
  }
}
exports.editCurrentArticle = async (req, res) => {
  try {
    const article = await articleModel.findByIdAndUpdate(
      req.params.id,
      req.body
    )

    res.json(article)
  } catch (error) {
    console.log(error)
    return next(new AppError('something went wrong', 500))
  }
}
