const mongoose = require('mongoose')
// const marked = require('marked')
// const createDomPurify = require('dompurify')
// const { JSDOM } = require('jsdom')
// const dompurify = createDomPurify(new JSDOM().window)
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // description: {
  //   type: String,
  //   required: true,
  // },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  parentId: {
    type: mongoose.Types.ObjectId,
    ref: 'topicName',
  },
})
// articleSchema.pre('validate', function (next) {
//   if (this.markdown) {
//     console.log(this.markdown)
//     this.sanitizedHTML = dompurify.sanitize(marked.marked(this.markdown))
//   }
//   next()
// })
const topicName = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  picture: {},
})

const TopicNameModel = mongoose.model('topicName', topicName)
const articleModel = mongoose.model('article', articleSchema)

module.exports = {
  TopicNameModel,
  articleModel,
}
