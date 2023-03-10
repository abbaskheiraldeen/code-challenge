import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPen } from "react-icons/fa";


import { useRouter } from "next/router";
import { updateCustomer } from "../lib/helper";

export default function EditCustomer({ customer }) {


  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: customer.name,
    address: customer.address,
    phoneNumber: customer.phoneNumber,
    status: customer.status,
  });


  

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update customer
   const response = await updateCustomer(customer._id, formData);
   if(response){
     return (
       setIsOpen(false),
      toast.success("Edit successfully"), 
      router.push(router.asPath)

      )
   }
   
   
    }catch(error){
      console.log(error);
    }
  }
  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-end items-end mr-12">
      <FaPen
        color="#3a7550"
        className="mx-8 hover:cursor-pointer sm:w-4 sm:h-4"
        onClick={() => setIsOpen(true)}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-lg "
          onClose={() => {}}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Customer
                </Dialog.Title>
                <div className="my-3">
                  <form onSubmit={onSubmit}>
                    <div className="relative form-group mb-6">
                      <input
                        type="text"
                        id="name"
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50   border-solid border border-gray-300 appearance-none rounded focus:outline-none focus:ring-0 focus:border-[#FF9B0F] peer"
                        placeholder=" "
                        autoComplete="off"
                        value={formData.name}
                        onChange={onMutate}
                        required
                      />
                      <label
                        htmlFor="name"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-[#FF9B0F] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                      >
                        Name
                      </label>
                    </div>
                    <div className="relative form-group mb-6">
                      <input
                        type="text"
                        id="address"
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50   border-solid border border-gray-300 appearance-none rounded focus:outline-none focus:ring-0 focus:border-[#FF9B0F] peer"
                        placeholder=" "
                        value={formData.address}
                        autoComplete="off"
                        onChange={onMutate}
                        required
                      />
                      <label
                        htmlFor="address"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-[#FF9B0F] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                      >
                        Address
                      </label>
                    </div>
                    <div className="relative form-group mb-6">
                      <input
                        type="tel"
                        id="phoneNumber"
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50   border-solid border border-gray-300 appearance-none rounded focus:outline-none focus:ring-0 focus:border-[#FF9B0F] peer"
                        placeholder=" "
                        value={formData.phoneNumber}
                        autoComplete="off"
                        onChange={onMutate}
                        required
                      />
                      <label
                        htmlFor="phoneNumber"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-[#FF9B0F] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                      >
                        Phone Number
                      </label>
                    </div>

                    <div className="flex justify-between mx-6">
                      <button
                        className="px-6 py-2.5 bg-[#f0cf9b] hover:bg-[#FF9B0F] text-black font-medium text-xs  uppercase rounded shadow-md  hover:shadow-lg transition duration-150 ease-in-out"
                        onClick={() => setIsOpen(false)}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#f0cf9b] hover:bg-[#FF9B0F] text-black font-medium text-xs  uppercase rounded shadow-md  hover:shadow-lg transition duration-150 ease-in-out"
                      >
                        Edit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Toaster />
    </div>
  );
}
