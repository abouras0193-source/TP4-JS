// Logique métier : relations, calculs, recherche et filtres.
import { state } from "./state.js";

export const findCustomer = (customerId) =>
  state.customers.find(customer => customer.id === customerId);

export const findProduct = (productId) =>
  state.products.find(product => product.id === productId);

export function getOrderLines(order) {
  return order.items.map(item => {
    const product = findProduct(item.productId);
    if (!product) throw new Error(`Produit introuvable : ${item.productId}`);
    return {
      product,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity
    };
  });
}

export function getOrderTotal(order) {
  return getOrderLines(order).reduce((sum, line) => sum + line.lineTotal, 0);
}

export function getEnrichedOrder(order) {
  return {
    ...order,
    customer: findCustomer(order.customerId),
    total: getOrderTotal(order),
    lines: getOrderLines(order)
  };
}

export function getVisibleOrders() {
  const search = state.search.trim().toLocaleLowerCase("fr");
  return state.orders.filter(order => {
    const customer = findCustomer(order.customerId);
    const matchesName = customer && customer.name.toLocaleLowerCase("fr").includes(search);
    const matchesStatus = state.status === "all" || order.status === state.status;
    const matchesCategory = state.category === "all" ||
      order.items.some(item => findProduct(item.productId)?.category === state.category);
    return matchesName && matchesStatus && matchesCategory;
  }).map(getEnrichedOrder);
}

export function getIndicators() {
  let totalOrderAmount = 0;
  state.orders.forEach(order => { totalOrderAmount += getOrderTotal(order); });
  return {
    customers: state.customers.length,
    products: state.products.length,
    orders: state.orders.length,
    amount: totalOrderAmount
  };
}

export function getCategories() {
  return [...new Set(state.products.map(product => product.category))].sort();
}
export function getOrderStatusCounts() {
  return state.orders.reduce((counts, order) => {
    counts[order.status] = (counts[order.status] || 0) + 1;
    return counts;
  }, {
    Livree: 0,
    "En attente": 0,
    Annulee: 0
  });
}
