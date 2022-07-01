import Category from "../../components/Category";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products";
import clientPromise from "../../lib/mongodb";

export default function Home({isConnected, products}) {
  return (
    <>
      <Category
        category="Products Found"
        categoryCount={`${products.length} Products`}
      />
      <Products products={products} />
      <Pagination />
    </>
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
