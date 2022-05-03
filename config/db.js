import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    // console.log(`mongoDB connected: ${conn.connection.host}`.cyan.underline);
    console.log("mongoose connected");
  } catch (err) {
    // console.error(`Error: ${err.message}`.red.underline.bold);
    // process.exit(1);
    console.log(err);
  }
};

export default connectDB;
