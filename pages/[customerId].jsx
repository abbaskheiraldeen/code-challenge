import { ObjectId } from "mongodb";
const { connectToDatabase } = require("../lib/mongodb");

export default function customer({ customer }) {
  console.log(customer);
  return (
    <>
      <div>
        <ul>
          <li>{customer.name}</li>
          <li>{customer.address}</li>
          <li>{customer.phoneNumber}</li>
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  console.log(params);
  let { db } = await connectToDatabase();
  // fetch the customers
  const customer = await db.collection("customers").findOne({
    _id: new ObjectId(params.customerId),
  });

  return {
    props: {
      customer: JSON.parse(JSON.stringify(customer)),
    },
  };
}

export async function getStaticPaths() {
  let { db } = await connectToDatabase();
  // fetch the customers
  const customers = await db.collection("customers").find({}).toArray();
  return {
    paths: customers.map((customers) => `/${customers._id}`),
    fallback: false,
  };
}
