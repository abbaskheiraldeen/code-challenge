import connectToDatabase from "../../../database/mongodb";
import {
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../../database/controller";

export default async function handler(req, res){
    connectToDatabase().catch(() =>
      res.status(405).json({ error: "Connection Error" })
    );

  const {method}= req
  switch (method) {
    case "GET":
      getCustomer(req, res);
      break;
    case "PATCH":
      updateCustomer(req, res);
      break;
    case "DELETE":
      deleteCustomer(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}