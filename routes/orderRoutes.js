const express = require('express');
const router = express.Router();
// const apikey = require("./apikeymiddleware");
// const apiKeyMiddleware =require('./apikeymiddleware');
// const cors = require('./cors')

// Sample data: Orders with products
const orders = [
  {
    orderId: 1,
    customerName: 'John Doe',
    products: [
      { productId: 101, productName: 'Product A', price: 29.99 },
      { productId: 102, productName: 'Product B', price: 39.99 }
    ],
    totalAmount: 69.98,
  },
  {
    orderId: 2,
    customerName: 'Jane Smith',
    products: [
      { productId: 103, productName: 'Product C', price: 49.99 },
      { productId: 104, productName: 'Product D', price: 59.99 }
    ],
    totalAmount: 109.98,
  },
];

// API to get orders and select specific products
router.get('/products', (req, res) => {
  // Extract query parameter if provided (e.g., ?orderId=1)
  const { orderId } = req.query;

  if (orderId) {
    // Filter the orders to  only the one that matches the orderId
    const order = orders.find((o) => o.orderId === parseInt(orderId));
    if (order) {
       res.json(order);
    } else {
       res.status(404).json({ message: 'Order not found' });
    }
  }

  //  all orders if no specific orderId is requested
  res.json(orders);
});

// API to get products in a specific order
// router.get('/api/orders/:orderId/products', (req, res) => {
//   const { orderId } = req.params;
//   const order = orders.find((o) => o.orderId === parseInt(orderId));

//   if (order) {
//      res.json(order.products);
//   } else {
//      res.status(404).json({ message: 'Order not found' });
//   }
// });
module.exports = router;