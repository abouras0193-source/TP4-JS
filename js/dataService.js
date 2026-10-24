// Ce module charge les JSON. Il ne manipule jamais le DOM.
async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Impossible de charger ${path} (HTTP ${response.status})`);
  }
  return response.json();
}

export async function loadAllData() {
  const [customers, products, orders] = await Promise.all([
    loadJSON("./data/customers.json"),
    loadJSON("./data/products.json"),
    loadJSON("./data/orders.json")
  ]);
  if (!Array.isArray(customers) || !Array.isArray(products) || !Array.isArray(orders)) {
    throw new Error("Un fichier JSON ne contient pas un tableau valide.");
  }
  return { customers, products, orders };
}
