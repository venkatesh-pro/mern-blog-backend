const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    // const data = await mongoose.connect('mongodb://localhost:27017/blog')
    const data = await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected To DB')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDb
