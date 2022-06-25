import Head from "next/head";

import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import ProductDetail from "../../components/ProductDetail";
import clientPromise from "../../lib/mongodb";
import { ObjectID } from 'mongodb'

const ProductDetails = ({product}) => {
  return (
    <>
      {product && (
        <>
          <Head>
            <title>MongoDB E-Commerce Demo - {product.name}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="bg-white w-full min-h-screen">
            <Header />
            <Container>
              <ProductDetail product={product} />
            </Container>
            <Footer />
          </div>
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