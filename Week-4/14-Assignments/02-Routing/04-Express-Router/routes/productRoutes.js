/*
  routes/productRoutes.js
  ========================

  Same pattern as userRoutes.js but for products.
  This is how you keep each feature's routes in its own file.

  Mounted in server.js as: app.use("/products", productRouter)

  So:
  router.get("/")    → GET /products
  router.get("/:id") → GET /products/:id
*/

const express  = require("express");
const router   = express.Router();

/*
  Fake products database.
*/
const products = [
  { id: 1, name: "Laptop",  price: 999 },
  { id: 2, name: "Phone",   price: 499 },
  { id: 3, name: "Tablet",  price: 299 },
];

/*
  GET /products
  --------------
  Returns all products.
*/
router.get("/", (req, res) => {
  res.json(products);
});

/*
  GET /products/:id
  ------------------
  Returns a single product by id.
*/
router.get("/:id", (req, res) => {
  const id      = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

/*
  Export the router so server.js can import and use it.
*/
module.exports = router;