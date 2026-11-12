
// =====================================
// PULSAKULA - DATABASE PENYIMPANAN
// =====================================

const products = [
  {
    id: "PLN20",
    name: "Token PLN 20.000",
    category: "Token Listrik",
    price: 22000,
    active: true
  },
  {
    id: "PLN50",
    name: "Token PLN 50.000",
    category: "Token Listrik",
    price: 52000,
    active: true
  },
  {
    id: "D10",
    name: "Paket Data 10GB",
    category: "Paket Data",
    price: 35000,
    active: true
  },
  {
    id: "P10",
    name: "Pulsa 10.000",
    category: "Pulsa",
    price: 12000,
    active: true
  }
];

const orders = [];

function getProducts(category = null) {
  if (!category) return products;
  return products.filter(
    product => product.category === category
  );
}

function getProduct(id) {
  return products.find(product => product.id === id);
}

function createOrder(data) {
  const order = {
    id: "PKL" + Date.now(),
    productId: data.productId,
    customer: data.customer,
    amount: data.amount,
    status: "PENDING",
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  return order;
}

function getOrder(id) {
  return orders.find(order => order.id === id);
}

module.exports = {
  products,
  orders,
  getProducts,
  getProduct,
  createOrder,
  getOrder
};
