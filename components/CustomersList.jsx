import DeleteCustomer from "./DeleteCustomer";
import EditCustomer from "./EditCustomer";



export default function CustomersList({ customers }) {
  return (
    <div className="container">
      <div className="overflow-auto relative my-4 mx-6 rounded-sm shadow-lg">
        <table className="w-full table  text-sm text-center border border-slate-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-[#F2E5D0]">
            <tr>
              <th scope="col" className="py-3 px-6 w-24">
                Name
              </th>
              <th scope="col" className="py-3 px-6 w-24">
                Address
              </th>
              <th scope="col" className="py-3 px-6 w-24">
                Phone Number
              </th>
              <th className="w-24">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers?.length > 0 &&
              customers.map((customer) => (
                <tr className="bg-[#D9D9D9] tracking-wider" key={customer._id}>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900  border border-l-slate-500 border-y-slate-500"
                  >
                    {customer.name}
                  </th>
                  <td className="border border-y-slate-500 ">
                    {customer.address}
                  </td>

                  <td className="border border-y-slate-500 ">
                    {customer.phoneNumber}
                  </td>

                  <td className="border border-y-slate-500 border-r-slate-500">
                    <div className="flex justify-center align-middle">
                      <EditCustomer customer={customer} />
                      <DeleteCustomer customerId={customer._id} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
