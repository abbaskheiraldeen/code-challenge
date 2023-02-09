
import AddCustomer from "../components/AddCustomer";
import CustomersList from "../components/CustomersList";

export default function Home({ customers }) {
  
  return (
    <div className="mt-12">
    <AddCustomer/>
    <CustomersList customers={customers}/>
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
