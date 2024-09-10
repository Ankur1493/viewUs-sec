import mongoose from "mongoose";

let isMongoConnected: boolean = false;

export const connectToMongo = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) return console.log("mongoDB url missing")

  if (isMongoConnected) {
    return console.log("mongo db is connected")
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "viewUs",

    });

    isMongoConnected = true;
    console.log("mongo db connected")
  } catch (err) {
    return console.log("mongo db not connected")
  }
}

