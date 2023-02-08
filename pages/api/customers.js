const { connectToDatabase } = require("../../lib/mongodb");
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
  async function getCustomers(req, res) {
    try {
      // connect to the database
      let { db } = await connectToDatabase();
      // fetch the customers
      let customers = await db.collection("customers").find({}).toArray();
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
  async function deleteCustomer(req, res) {
    try {
      // Connecting to the database
      let { db } = await connectToDatabase();

      // Deleting the customer
      await db.collection("customers").deleteOne({
        _id: new ObjectId(req.body),
      });
      console.log(req.body);
      // returning a message
      return res.json({
        message: "customer deleted successfully",
        success: true,
      });
    } catch (error) {
      // returning an error
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  }
  async function updateCustomer(req, res) {
    try {
      const {id, name, address, phoneNumber} = req.body
      // connect to the database
      let { db } = await connectToDatabase();

      // update the customer
      console.log(req.body)
      await db.collection("customers").updateOne(
        {
          "_id": id
        },
        { $set: { "name": name , "address": address, "phoneNumber": +phoneNumber } },
      );

      // return a message
      return res.json({
        message: "Customer updated successfully",
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
}
