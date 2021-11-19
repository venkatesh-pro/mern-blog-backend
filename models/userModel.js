const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  profilePic: {
    type: {},
    default: '/defaultUser.png',
  },
  role: {
    type: [String],
    default: ['User'],
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.correctPassword = async function (password, passwordDb) {
  return await bcrypt.compare(password, passwordDb)
}
const User = mongoose.model('User', userSchema)

module.exports = User
