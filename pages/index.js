import Head from 'next/head'
import Image from 'next/image'


export default function Home() {

  const onSubmit = async (e)=> {
    e.preventDefault()
    const result = await fetch('/api/customers/', {
      method: 'GET'
    })
    const data = await result.json()
    console.log(data);
  }
  return (
    <div>
      <Head>
        <title>Code Challenge</title>
      </Head>

      <h1 className="text-4xl my-4 mx-2">Customers</h1>
      <div className="flex  justify-center ">
        <form className="flex flex-col" onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" autoComplete="false" />
          <label htmlFor="address">Address</label>
          <input type="text" id="address" autoComplete="false"  />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="number" id="phoneNumber" />
          <button type="submit" className="bg-white text-black mt-4 rounded">
            Add customer
          </button>
        </form>
      </div>
    </div>
  );
}
