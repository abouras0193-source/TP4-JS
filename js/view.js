// Affichage : ce module reçoit les données déjà traitées et met à jour le DOM.
const money = value => new Intl.NumberFormat("fr-MA", {
  style: "currency", currency: "MAD", maximumFractionDigits: 2
}).format(value);

const statusLabel = status => ({
  "Livree": "Livrée",
  "En attente": "En attente",
  "Annulee": "Annulée"
}[status] || status);

const statusClass = status => "status-" + status.replaceAll(" ", "-");

export function renderIndicators(indicators) {
  const cards = [
    ["Clients", indicators.customers, "👥"],
    ["Produits", indicators.products, "📦"],
    ["Commandes", indicators.orders, "🧾"],
    ["Montant cumulé", money(indicators.amount), "💰"]
  ];
  document.getElementById("indicators").innerHTML = cards.map(([label, value, emoji]) => `
    <div class="col-6 col-xl-3"><div class="card border-0 shadow-sm stat-card"><div class="card-body">
      <div class="stat-label">${emoji} ${label}</div><div class="stat-value">${value}</div>
    </div></div></div>`).join("");
}

export function renderCategories(categories, selected) {
  const select = document.getElementById("categoryFilter");
  const previous = selected || "all";
  select.innerHTML = '<option value="all">Toutes les catégories</option>' +
    categories.map(category => `<option value="${category}">${category}</option>`).join("");
  select.value = categories.includes(previous) ? previous : "all";
}

export function renderOrders(orders) {
  const tbody = document.getElementById("ordersTable");
  document.getElementById("resultMessage").textContent =
    `${orders.length} commande(s) affichée(s)`;
  if (!orders.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-secondary py-4">Aucune commande ne correspond aux filtres.</td></tr>';
    return;
  }
  tbody.innerHTML = orders.map(order => `
    <tr>
      <td class="fw-semibold">#${order.id}</td>
      <td>${order.customer ? order.customer.name : "Client introuvable"}</td>
      <td>${order.date}</td>
      <td><span class="status-badge ${statusClass(order.status)}">${statusLabel(order.status)}</span></td>
      <td class="fw-semibold">${money(order.total)}</td>
      <td><button class="btn btn-sm btn-outline-primary detail-button" data-order-id="${order.id}">Voir détail</button></td>
    </tr>`).join("");
}

export function renderDetail(order) {
  const section = document.getElementById("detailSection");
  const content = document.getElementById("detailContent");
  if (!order) {
    section.classList.add("d-none");
    content.innerHTML = "";
    return;
  }
  const linesHTML = order.lines.map(line => `
    <div class="product-line row g-2 align-items-center">
      <div class="col-5">${line.product.name}<div class="small text-secondary">${line.product.category}</div></div>
      <div class="col-2 text-end">${money(line.product.price)}</div>
      <div class="col-2 text-center">${line.quantity}</div>
      <div class="col-3 text-end fw-semibold">${money(line.lineTotal)}</div>
    </div>`).join("");
  content.innerHTML = `
    <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
      <div><p class="text-primary fw-semibold small mb-1">DÉTAIL DE COMMANDE</p>
        <h2 class="h5">Commande #${order.id}</h2></div>
      <button id="closeDetail" class="btn btn-sm btn-outline-secondary">Fermer</button>
    </div>
    <div class="row g-3 mb-4">
      <div class="col-md-6"><div class="p-3 rounded-3 bg-light"><strong>Client :</strong> ${order.customer?.name || "Introuvable"}<br><strong>Ville :</strong> ${order.customer?.city || "—"}</div></div>
      <div class="col-md-6"><div class="p-3 rounded-3 bg-light"><strong>Date :</strong> ${order.date}<br><strong>Statut :</strong> ${statusLabel(order.status)}</div></div>
    </div>
    <div class="row fw-semibold small text-secondary mb-2"><div class="col-5">Produit</div><div class="col-2 text-end">Prix</div><div class="col-2 text-center">Qté</div><div class="col-3 text-end">Montant</div></div>
    ${linesHTML}
    <div class="d-flex justify-content-end align-items-center gap-3 mt-3"><span class="text-secondary">Total de la commande</span><span class="h4 mb-0">${money(order.total)}</span></div>`;
  section.classList.remove("d-none");
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}
