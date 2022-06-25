import Head from "next/head";
import Category from "../../components/Category";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products";
import clientPromise from "../../lib/mongodb";

export default function Home({isConnected, products}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white w-full min-h-screen">
        <Header />
        <Container>
          <Category
            category="Products Found"
            categoryCount={`${products.length} Products`}
          />
          <Products products={products} />
          <Pagination />
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps({query}) {
  const { term } = query
  // console.log(`term= ${term}`)
  const client = await clientPromise;
  const isConnected = await client.isConnected();
  const db = client.db("store");
  const collection = db.collection("products");
  const pipeline = [{
    $search: {
      index: "searchProducts",
      text: {
        query: term,
        path: {
          wildcard: '*'
        },
        fuzzy: {}
      }
    }
  }]
  
  const products = await collection.aggregate(pipeline).toArray()
  return {
    props: {
      isConnected,
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
