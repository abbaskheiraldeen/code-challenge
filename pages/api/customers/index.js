import clientPromise from "../../../lib/mongo";

export default async(req, res)=> {
  try {
    const client = await clientPromise;
  const db = client.db("task")
  const customers = await db.collection("customers").find({}).limit(10).toArray()

  res.json(customers)
  }catch(error){
    console.log(error);
  }
}