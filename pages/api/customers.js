const {connectToDatabase} = require('../../lib/mongodb')
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getCustomers(req, res);
    }

    case "POST": {
      return addCustomer(req, res);
    }

    case "PUT": {
      return updateCustomer(req, res);
    }

    case "DELETE": {
      return deleteCustomer(req, res);
    }
  }
  async function addCustomer(req, res) {
    try {
      // connect to the database
      let { db } = await connectToDatabase();
      // add the customer
      await db.collection("customers").insertOne(JSON.parse(req.body));
      // return a message
      return res.json({
        message: "Customer added successfully",
        success: true,
      });
    } catch (error) {
      // return an error
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  }
  async function getCustomers(req,res){
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the customers
        let customers = await db
          .collection("customers")
          .find({})
          .sort({ published: -1 })
          .toArray();
        // return the customers
        return res.json(customers);
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
}

