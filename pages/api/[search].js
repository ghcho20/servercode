export default function handler( req, res) {
  // search comes from file name, [search].js
  const { search } = req.query
  res.status(200).json({ name: search })
}
