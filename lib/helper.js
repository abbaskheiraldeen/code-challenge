//all customers
export const getCustomers = async () => {
  const response = await fetch(`http://localhost:3000/api/customers`);
  const json = await response.json();

  return json;
};

// single customer
export const getCustomer = async (customerId) => {
  const response = await fetch(
    `http://localhost:3000/api/customers/${customerId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};

// posting a new customer
export async function addCustomer(formData) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(
      `http://localhost:3000/api/customers`,
      Options
    );
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

// update a customer
export async function updateCustomer(customerId, formData) {
  try {
    const Options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(
      `http://localhost:3000/api/customers/${customerId}`,
      Options
    );
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
export async function updateCustomers(filter, update){

  try {
    const Options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({filter, update}),
    };
    const response = await fetch(
      `http://localhost:3000/api/customers`,
      Options
    );
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

// Delete a Customer
export async function deleteCustomer(customerId) {
  try {
    const Options = {
      method: "DELETE",
    };
    const response = await fetch(
      `http://localhost:3000/api/customers/${customerId}`,
      Options
    );
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
