import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useRouter } from "next/router";

export default function AddCustomer() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    phoneNumber: "",
  });

  const router = useRouter();

  const { name, address, phoneNumber } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !address || !phoneNumber) {
        return alert("All fields are required");
      }

      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const d = await response.json();

      console.log(d);
      if(d.success){
        return (
          toast.success("Customer added successfully"),
          setIsOpen(false),
          router.push(router.asPath)
        );
      }else{

        return (
         
          toast.error("Could not add customer"),
          setIsOpen(false)
         
        );
      }
    } catch (error) {
      setIsOpen(false), console.log(error);
    }
  };

  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="flex justify-end items-end mr-12">
      <button
        onClick={() => setIsOpen(true)}
        className="  px-4 py-2 text-sm bg-[#F2E5D0] border border-transparent rounded-md hover:bg-[#b1d8bf] duration-300"
      >
        Add a New Customer
      </button>

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
                  Add a New Customer
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
                        type="number"
                        id="phoneNumber"
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50   border-solid border border-gray-300 appearance-none rounded focus:outline-none focus:ring-0 focus:border-[#FF9B0F] peer"
                        placeholder=" "
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
                        Add
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
