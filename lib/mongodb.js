import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const fedUri = process.env.FEDERATED_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client, fedClient
let clientPromise, fedClientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

// In production mode, it's best to not use a global variable.
client = new MongoClient(uri, options)
clientPromise = client.connect()

fedClient = new MongoClient(fedUri, options)
fedClientPromise = fedClient.connect()

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
export { fedClientPromise }