import clientPromise from "../../lib/mongodb"

/* autoCompleteSearch index definition:
{
    "mappings": {
        "dynamic": false,
        "fields": {
            "user_id": [
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
export default async function handler( req, res) {
    const { q } = req.query
    const client = await clientPromise;
    const isConnected = await client.isConnected();
    const collection = client.db("chat").collection("users");
    const pipeline = [
      {
          $search: {
              index: "autoCompleteSearch",
              autocomplete: {
                  query: q,
                  path: "user_id",
                  tokenOrder: "sequential"
              }
          }
      },
      {
          $limit: 20
      },
      {
          $project: {
              user_id: 1,
              nickname: 1
          }
      }
    ]

    const users = await collection.aggregate(pipeline).toArray()
    res.status(200).send(JSON.stringify(users))
}