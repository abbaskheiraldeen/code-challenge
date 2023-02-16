import { Schema, models, model } from "mongoose";

const customerSchema = new Schema({
  name: String,
  address: String,
  phoneNumber: Number,
  status: String,
})

const Customers = models.customer || model('customer', customerSchema)
export default Customers