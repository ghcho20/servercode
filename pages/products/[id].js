import ProductDetail from "../../components/ProductDetail";
import clientPromise from "../../lib/mongodb";
import { ObjectID } from 'mongodb'

const ProductDetails = ({product}) => {
  return (
    <>
      {product && (
        <>
          <ProductDetail product={product} />
        </>
      )}
    </>
  );
};

export default ProductDetails;

export async function getServerSideProps({query}) {
  const { id } = query
  // console.log(`id= ${id}`)
  const client = await clientPromise;
  const isConnected = await client.isConnected();
  const db = client.db("store");
  const collection = db.collection("products");
  
  const product = await collection.findOne({_id: ObjectID(id)})
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}