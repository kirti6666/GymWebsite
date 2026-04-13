const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    
    const uri = process.env.MONGO_URI
    // console.log(uri)
    if (!uri) {
      throw new Error('MONGO_URI is undefined - check your .env file')
    } 
    await mongoose.connect(uri)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB