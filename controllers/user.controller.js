const mongoose = require('mongoose')

const userModel = require('../models/user.model')

module.exports = {
  createUser: async(req,res) => {
    try {
      const newUser = new userModel(req.body)
      await newUser.save()
      res.status(200).json({success: true , message:'new user added'})
    } catch (error) {
      
      
    }
  }
}