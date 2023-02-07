
import Link from 'next/link'


export default function Home({customers}) {
  
      console.log(customers);
    
    return (
      <div className="flex space-x-4">
        <Link href="/add" className="items-center flex py-2 px-4 bg-indigo-400">
          AddCustomer
        </Link>
        <Link
          href="/addcustomer"
          className="items-center flex py-2 px-4 bg-indigo-400"
        >
          EditCustomer
        </Link>
        <Link
          href="/addcustomer"
          className="items-center flex py-2 px-4 bg-indigo-400"
        >
          DeleteCustomer
        </Link>

       
          {customers?.length > 0 ?
            (
              <div>
               { customers.map((customer)=> {
                <p>{customer.name}</p>
               })}
              </div>
            ) : (
              <div>
                no customers yet
              </div>
            )
          
          }
        

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
