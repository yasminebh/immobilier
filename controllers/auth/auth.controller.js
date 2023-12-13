const mongoose = require('mongoose')
const userModel = require('../../models/user.model')
const bcryptjs= require('bcryptjs');
const errorHandler = require('../../utils/error');
const jwt = require('jsonwebtoken')
module.exports = {
  signup: async (req, res ,next) => {
    const { userName, password, email } = req.body;
    const hashedPassword= bcryptjs.hashSync(password,10)
    try {
      const newUser = await new userModel({ userName, password:hashedPassword, email });
     await newUser.save();
     res.status(201).json({ message: 'User created successfully',data:newUser });

    } catch (error) {
      next(error);
    }
  },

  signin: async ( req , res,next) => {
    const {email, password:userPassword}= req.body

    try {
      const user = await userModel.findOne({email})
      if (!user) {
        return next(errorHandler(404, 'User not found'));
      }
      const isCorrect = await bcryptjs.compare(userPassword , user.password)

      if(!isCorrect) {
        return next(errorHandler(401, 'invalid password'))
      }
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
      const {password, ...others} = user._doc
      res
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 *1000),
        })
        .status(202)
        .json({ message: "you re logged in " ,data:others});
    } catch (error) {
      next(error)
    }
  }

};