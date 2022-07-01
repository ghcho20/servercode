import clientPromise from "../../lib/mongodb"

/* search index: simpleSearch
{
    "mappings": {
      "dynamic": false,
      "fields": {
        "user_id": {
          "type": "string"
        }
      }
    }
}
*/
export default async function handler( req, res) {
    const { q } = req.query
    const client = await clientPromise;
    const isConnected = await client.isConnected();
    const collection = client.db("chat").collection("users");
    const pipeline = [{
        $search: {
        index: "simpleSearch",
            text: {
                query: q,
                path: {
                    wildcard: '*'
                }
            }
        }
    }]

    const users = await collection.aggregate(pipeline).toArray()
    res.status(200).send(JSON.stringify(users))
}