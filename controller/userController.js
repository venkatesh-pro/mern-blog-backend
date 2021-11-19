const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const AWS = require('aws-sdk')
const { nanoid } = require('nanoid')
dotenv.config({
  path: '../.env',
})

// aws
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SCRECT_ACCESS_KEY,
  region: process.env.region,
  apiVersion: process.env.apiVersion,
}

const s3 = new AWS.S3(awsConfig)

// jwt
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SCRECT_KEY, {
    expiresIn: '30d',
  })
}

exports.createUser = async (req, res) => {
  try {
    const { email, password, name, profilePic } = req.body
    if (!email || !password || !name) {
      return res.status(400).send('Please Fill All Fields')
    }
    const user = await User.create({
      email,
      password,
      name,
      profilePic,
    })
    const token = signToken(user._id)
    const user1 = {
      email: user.email,
      name: user.name,
      role: user.role,
      _id: user._id,
      profilePic: user.profilePic,
    }

    res.json({
      user: user1,
      token,
    })
  } catch (error) {
    if (error.code == 11000) {
      res.status(400).send('Email Already exists')
      return
    }
    res.status(400).send(error)
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send('Please Fill All Fields')
    }
    const user = await User.findOne({ email }).select('+password')
    console.log(user)

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).send('Incorrect Email or Password')
    }
    const token = signToken(user._id)
    const user1 = {
      email: user.email,
      name: user.name,
      role: user.role,
      _id: user._id,
      profilePic: user.profilePic,
    }
    res.json({
      user: user1,
      token,
    })
  } catch (error) {
    return next(new AppError('something went wrong', 500))
  }
}
exports.uploadImage = async (req, res) => {
  try {
    const { image } = req.body
    if (!image) return res.status(400).send('No Image')

    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64/, ''),
      'base64'
    )
    const type = image.split(';')[0].split('/')[1]
    const params = {
      Bucket: 'programming-blog-app',
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
    }

    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err)
        return res.status(400).send('Upload failed , please check the time')
      }
      res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send(`Error : Can't Upload Image`)
  }
}
exports.deleteImage = async (req, res) => {
  try {
    const { image } = req.body
    if (!image) return res.status(400).send('No Image')

    const params = {
      Bucket: image.Bucket,
      Key: image.Key,
    }

    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err)
        return res.status(400).send('Delete Failed')
      }

      res.send('Deleted')
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send(`Error : Can't Upload Image`)
  }
}
