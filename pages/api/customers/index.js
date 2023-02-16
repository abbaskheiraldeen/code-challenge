import connectToDatabase from "../../../database/mongodb";
import {getCustomers, addCustomer, updateCustomers, deleteCustomer} from '../../../database/controller'


export default async function handler(req, res){
  connectToDatabase().catch(()=> res.status(405).json({error: "Connection Error"}))

  const {method} = req
  switch(method){
    case'GET':
      getCustomers(req, res)
      break;
    case'POST':
     addCustomer(req, res)
      break;
    case'PATCH':
     updateCustomers(req,res)
      break;
    default:
      res.setHeader('Allow',['GET','POST','PATCH','DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break;
  }

 
}