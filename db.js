const mongoose = require('mongoose')

const db = async () => {
  try {
  await mongoose.connect(process.env.URL)
    console.log("successfuly connected")
  
  } catch (error) {
    console.log("error"+error)
  
  }
  }

module.exports= db