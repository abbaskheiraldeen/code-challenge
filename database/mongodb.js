import { MongoClient } from "mongodb";
import mongoose from "mongoose";

//  This code checks if there is an existing con to the db if yes then use it, else create another one
// to prevent exhausting the db

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

// check the MongoDB DB
if (!MONGODB_DB) {
  throw new Error("Define the MONGODB_DB environmental variable");
}



export default async function connectToDatabase() {
 try{
  const {connection} = await mongoose.connect(MONGODB_URI);
  if(connection.readyState ==1){
    console.log("Database Connected");
  }
 }catch(error){
  return Promise.reject(error)
 }
}
