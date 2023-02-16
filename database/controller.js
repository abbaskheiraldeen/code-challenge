import Customers from "../model/customer";

// get: http://localhost:/api/customers
export async function getCustomers(req, res) {
  
  try {

    const customers = await Customers.find({});
    if (!customers) return res.status(404).json({ error: "Data not found" });
    res.status(200).json(customers);

  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
// getCustomer: http://localhost:/api/customers/id
export async function getCustomer(req, res){
  try {
    const {customerId} = req.query
    if(customerId){
      const customer = await Customers.findById(customerId)
      return res.status(200).json(customer)
    }
     return res.status(404).json({error: "Error fetching customer"});

  }catch(error){
     return res.json({
       message: new Error(error).message,
       success: false,
     });
  }
}

// post: http://localhost:/api/customers
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
     
      Customers.create(req.body, function(err,data){
         return res.status(200).json(data);
      })
     
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

// patch: http://localhost:/api/customer/id
export async function updateCustomer(req, res) {
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
      
      const { customerId } = req.query;
      const {name, address, phoneNumber} = req.body
     const customer = await Customers.findOneAndUpdate(
       { _id: customerId },
       { name: name, address: address, phoneNumber: phoneNumber },
       { new: true }
     );
      return res.status(200).json(customer);
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

// delete: http://localhost:/api/customer/id
export async function deleteCustomer(req, res) {
  try {
    const {customerId} = req.query

    if(customerId){
      const customer = await Customers.findByIdAndDelete(customerId)
      return res.status(200).json({
        message: "customer deleted successfully",
        success: true,
      });
    }
    res.status(404).json({error: "error while deleting"})
    
    
  } catch (error) {
    // returning an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export async function updateCustomers(req, res){

  const { filter, update } = req.body;
    try {
      
      const customers = await Customers.updateMany(filter, update)
       return res.status(200).json(customers);
    } catch (error) {
       return res.json({
         message: new Error(error).message,
         success: false,
       });
    }
}
