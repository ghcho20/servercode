import clientPromise from "../../lib/mongodb"
import Category from "../../components/Category"
import Hero from "../../components/Hero"
import Pagination from "../../components/Pagination"
import Products from "../../components/Products"

export default function Home({ isConnected, products }) {
  return (isConnected && (
        <>
        <Hero />
        <Category
          category="Tech Wear"
          categoryCount={`${products.length} Products`}
        />
        <Products products={products} />
        <Pagination />
        </>
      )
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const isConnected = await client.isConnected();
  const db = client.db("store");
  const collection = db.collection("products");
  const products = await collection.find({}).toArray();

  return {
    props: {
      isConnected,
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
