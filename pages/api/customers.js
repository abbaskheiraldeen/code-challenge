
const {getCustomers, addCustomer, updateCustomer, deleteCustomer} = require('../../utils/crud')

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getCustomers(req, res);
    }

    case "POST": {
      return addCustomer(req, res);
    }

    case "PATCH": {
      return updateCustomer(req, res);
    }

    case "DELETE": {
      return deleteCustomer(req, res);
    }
  }
  
}
