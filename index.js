const express = require('express');
const dotenv = require('dotenv')

dotenv.config()
const db = require('./db')
db()
const app = express()
app.use(express.json()); // Make sure to include this line

PORT = 3000
app.listen(PORT, ()=> {
  console.log('server is running on port ', PORT)
})


// api Route
const authRoute= require('./routes/auth.route')

app.use('/auth', authRoute)

//midlleware for error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
})
 