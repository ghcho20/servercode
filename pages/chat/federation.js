import { fedClientPromise } from "../../lib/mongodb";
import Users from "../../components/Users"

export default function Federation({isConnected, users}) {
  return (isConnected && (
    <>
      <Users users={users} />
    </>
  ));
}

export async function getServerSideProps(context) {
  const client = await fedClientPromise;
  const isConnected = await client.isConnected();
  const db = client.db("chat");
  const collection = db.collection("users");
  const users = await collection.find({}).toArray();

  return {
    props: {
      isConnected,
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}