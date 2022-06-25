import clientPromise from "../../lib/mongodb"

export default async function handler( req, res) {
    // autocomplete comes from file name, [autocomplete].js
    const { autocomplete } = req.query
    const client = await clientPromise;
    const isConnected = await client.isConnected();
    const db = client.db("store");
    const collection = db.collection("products");

/* autoCompleteProducts index definition:
{
    "mappings": {
        "dynamic": false,
        "fields": {
            "name": [
                {
                    "foldDiacritics": false,
                    "maxGrams": 7,
                    "minGrams": 3,
                    "tokenization": "edgeGram",
                    "type": "autocomplete"
                }
            ]
        }
    }
}
*/
    const pipeline = [
        {
            $search: {
                index: "autoCompleteProducts",
                autocomplete: {
                    query: autocomplete,
                    path: "name",
                    tokenOrder: "sequential"
                }
            }
        },
        {
            $limit: 15
        },
        {
            $project: {
                name: 1
            }
        }
    ]
  
    const products = await collection.aggregate(pipeline).toArray()

    // res.status(200).json(JSON.parse(JSON.stringify(products)))
    res.status(200).send(JSON.stringify(products))
}