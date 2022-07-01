import clientPromise from "../../lib/mongodb";
import ChannelList from "../../components/ChannelList"

export default function Channels({isConnected, channels}) {
  return (
    <>
      <ChannelList channels={channels} />
    </>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const isConnected = await client.isConnected();
  const db = client.db("chat");
  const collection = db.collection("channels");
  const channels = await collection.find({}).toArray();

  return {
    props: {
      isConnected,
      channels: JSON.parse(JSON.stringify(channels)),
    },
  };
}
