import { useState } from "react";
import { useRouter } from "next/router";

export default function Home({ customers }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    phoneNumber: "",
  });

  const router = useRouter();

  const { id, name, address, phoneNumber } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !address || !phoneNumber) {
        return alert("All fields are required");
      }

      const response = await fetch("/api/customers", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      await response.json();

      alert("Added successfully");
      setFormData({ name: "", address: "", phoneNumber: "" });
      return router.push(router.asPath);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      // Delete customer
      await fetch("/api/customers", {
        method: "DELETE",
        body: id,
      });

      // reload the page
      return router.push(router.asPath);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async () => {
   

    try {
      // Update post
      await fetch("/api/customers", {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      // reload the page
      alert("Edited successfully")
      return router.push(router.asPath);
    } catch (error) {
      console.log(error);
    }
  };
  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div>
      <h1 className="text-4xl my-4 mx-2 text-white">Customers</h1>
      <div className="flex  justify-center mb-2 ">
        <form className="flex flex-col" onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            autoComplete="false"
            value={formData.name}
            onChange={onMutate}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            autoComplete="false"
            value={formData.address}
            onChange={onMutate}
          />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="number"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={onMutate}
          />
              <div className="flex space-x-7">
                
            <button
              type="submit"
              className="bg-white text-black py-1 px-2 rounded"
              >
              Add customer
            </button>
        
            <button
            type="button"
            onClick={handleEdit}
            className="bg-white text-black  py-1 px-2 rounded"
            >
              Edit
            </button>
            </div>
        </form>
      </div>

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
              <tr
                className="bg-[#D9D9D9] tracking-wider text-gray-900 "
                key={customer._id}
              >
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
                  <div className="flex justify-center space-x-7 align-middle">
                    <button onClick={() => { setFormData({
                      id: customer._id,
                      name: customer.name,
                      address: customer.address,
                      phoneNumber: customer.phoneNumber,
                    });}}>Edit</button>
                    <button onClick={() => handleDelete(customer._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  // request customers from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/customers`);
  // extract the data
  let customers = await response.json();

  return {
    props: {
      customers: customers,
    },
  };
}
