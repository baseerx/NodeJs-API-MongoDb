const mongoose=require('mongoose');

const dbConnect=async () => {
  const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/dbnodejs"; // Default URI if not provided

  try {
      const conn=await mongoose.connect(mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports=dbConnect