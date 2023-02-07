import { useState } from "react";
import Head from "next/head";

export default function addcustomer() {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState(0)

  const onSubmit = async (e)=> {
    e.preventDefault()
    try{

      if(!name || !address || !phoneNumber){
        return alert("All fields are required");
      }
      const customer ={
        name,
        address,
        phoneNumber
      }
      const response = await fetch("/api/customers", {
        method: "POST",
        body: JSON.stringify(customer)
      })
      const data = await response.json()
      console.log(data);
      alert('Added successfully')
    } catch(error){
      console.log(error);
    }
  }
  return (
    <div>

      <h1 className="text-4xl my-4 mx-2 text-white">Customers</h1>
      <div className="flex  justify-center ">
        <form className="flex flex-col" onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            autoComplete="false"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            autoComplete="false"
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="number"
            id="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button type="submit" className="bg-white text-black mt-4 rounded">
            Add customer
          </button>
        </form>
      </div>
    </div>
  );

}