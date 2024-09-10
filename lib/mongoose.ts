import mongoose from "mongoose";

let isMongoConnected: boolean = false;
let mongoClientPromise: Promise<typeof mongoose> | null = null;

declare global {
  var _mongoClientPromise: Promise<typeof mongoose> | null; // This is important for TypeScript
}

export const connectToMongo = async () => {
  if (isMongoConnected) {
    console.log("MongoDB is already connected.");
    return mongoose;
  }

  if (!process.env.MONGODB_URI) {
    console.error("MongoDB URI is missing.");
    throw new Error("MongoDB URI is missing.");
  }

  if (process.env.ENVIRONMENT === "development") {
    if (!globalThis._mongoClientPromise) {
      mongoClientPromise = mongoose.connect(process.env.MONGODB_URI, {
        dbName: "viewUs",
      });
      globalThis._mongoClientPromise = mongoClientPromise;
    } else {
      mongoClientPromise = globalThis._mongoClientPromise;
    }
  } else {
    mongoClientPromise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: "viewUs",
    });
  }

  try {
    await mongoClientPromise;
    isMongoConnected = true;
    console.log("MongoDB connected.");
    return mongoose;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

// Call connectToMongo when your application starts
connectToMongo().catch(console.error);

export default mongoose;

