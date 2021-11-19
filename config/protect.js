const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.protect = async (req, res, next) => {
  try {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) return res.sendStatus(401)

    const decoded = jwt.verify(token, process.env.JWT_SCRECT_KEY)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) return res.status(400).send('User is Not belong to this app')
    req.user = user
    next()
  } catch (error) {
    res.status(401).send('Unauthorized')
  }
}

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (user.role.includes('ADMIN')) {
      req.user = user
      next()
    } else {
      res.status(401).send('Admin can only accessed')
    }
  } catch (error) {
    res.status(401).send('Unauthorized')
  }
}
