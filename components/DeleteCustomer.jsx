import { FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

import { useRouter } from "next/router";
import { deleteCustomer } from "../lib/helper";


export default function DeleteCustomer({ customerId }) {

  const router = useRouter()

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete")){
      try {
        // Delete customer
        await deleteCustomer(customerId)

        
        return (
          
          toast.success("Customer deleted successfully"),
          // reload the page
        router.push(router.asPath)
      );
      } catch (error) {
        console.log(error);
      }
    }
      
  };
  return (
    <div>
      <FaTrash
        color="#ff6b69 "
        className="mx-8 hover:cursor-pointer sm:w-4 sm:h-4"
        onClick={handleDelete}
      />
      <Toaster/>
    </div>
  );
}
