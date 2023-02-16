import AddCustomer from "../components/AddCustomer";
import CustomersList from "../components/CustomersList";


export default function Home() {


  return (
    <div className="mt-12">
    <AddCustomer/>
    <CustomersList/>
    </div>
  );
}

