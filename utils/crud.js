const { connectToDatabase } = require("../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

export async function addCustomer(req, res) {
  const { name, address, phoneNumber } = req.body;
  if (!name || !address || !phoneNumber)
    return res.json({ success: false, message: "All fields are required" });
  try {
    const result = await fetch(
      "https://phone-validation.vercel.app/api/validate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      }
    );
    const data = await result.json();
    console.log(data);
    if (data.success) {
      // connect to the database
      let { db } = await connectToDatabase();
      // add the customer
      await db.collection("customers").insertOne(req.body);
      // return a message
      return res.json({
        message: "Customer added successfully",
        success: true,
      });
    } else {
      return res.json({ message: data.message });
    }
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
export async function updateCustomer(req, res) {
  const { id, name, address, phoneNumber } = req.body;
  if (!name || !address || !phoneNumber)
    return res.json({ success: false, message: "All fields are required" });

  try {
    // send phone number to the validation api
    const result = await fetch(
      "https://phone-validation.vercel.app/api/validate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      }
    );
    const data = await result.json();
    if (data.success) {
      // connect to the database
      let { db } = await connectToDatabase();

      // update the customer
      console.log(req.body);
      const filter = { _id:  ObjectId(id) };
      const newValues = {
        $set: { "name": name, "address": address, "phoneNumber": phoneNumber },
      };
      await db.collection("customers").updateOne(filter, newValues);

      // return a message
      return res.json({
        message: "Customer updated successfully",
        success: true,
      });
    } else {
      return res.json({ message: data.message });
    }
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
export async function getCustomers(req, res) {
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
export async function deleteCustomer(req, res) {
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
