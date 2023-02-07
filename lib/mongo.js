import {MongoClient} from 'mongodb'



//  This code checks if there is an existing con to the db if yes then use it, else create another one
// to prevent exhausting the db
const URI = process.env.MONGO_URI
const options ={}
if(!URI) throw new Error('URI not found')
let client = new MongoClient(URI, options)
let clientPromise

if(process.env.NODE_ENV !== 'production'){
  if(!global._mongoClientPromise){
    global_._mongoClientPromise = client.connect()
  }
  clientPromise = global_._mongoClientPromise
} else{
  clientPromise =client.connect()
}
export default clientPromise