const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const userModel = require('../models/user.model')
const errorHandler = require('../utils/error')

module.exports = {
  updateUser: async(req,res,next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401,'you can only update your own account'))


    try {
        if(req.body.password) {
          req.body.password = await bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await userModel.findByIdAndUpdate({_id:req.params.id}, {$set: {userName:req.body.userName, email: req.body.email, password: req.body.password, avatar: req.body.avatar }
   
        },     {new: true}
          )
          const {password , ...rest} = updatedUser._doc
          res.status(200).json(rest)
} catch (error) {   
      next(error)
    }
  }
}