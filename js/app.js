// Point d'entrée : chargement, événements et orchestration du rendu.
import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import { getVisibleOrders, getIndicators, getCategories } from "./selectors.js";
import { renderIndicators, renderCategories, renderOrders, renderDetail } from "./view.js";

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const categoryFilter = document.getElementById("categoryFilter");
const errorMessage = document.getElementById("errorMessage");

function render() {
  renderIndicators(getIndicators());
  renderCategories(getCategories(), state.category);
  const visibleOrders = getVisibleOrders();
  renderOrders(visibleOrders);
  const selected = state.selectedOrderId === null
    ? null
    : visibleOrders.find(order => order.id === state.selectedOrderId)
      || state.orders.find(order => order.id === state.selectedOrderId);
  if (selected && !selected.customer) {
    renderDetail(null);
  } else {
    renderDetail(selected ? (selected.lines ? selected : getVisibleOrders().find(order => order.id === selected.id)) : null);
  }
}

async function init() {
  try {
    const data = await loadAllData();
    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;
    errorMessage.classList.add("d-none");
    render();
  } catch (error) {
    console.error("Erreur de chargement :", error);
    errorMessage.textContent = `Impossible de charger les données. Vérifiez que vous lancez le projet avec Live Server et que les trois fichiers JSON existent. Détail : ${error.message}`;
    errorMessage.classList.remove("d-none");
    document.getElementById("ordersTable").innerHTML =
      '<tr><td colspan="6" class="text-center text-danger py-4">Les commandes ne peuvent pas être affichées.</td></tr>';
    document.getElementById("resultMessage").textContent = "Erreur de chargement";
  }
}

searchInput.addEventListener("input", event => {
  state.search = event.target.value;
  state.selectedOrderId = null;
  render();
});
statusFilter.addEventListener("change", event => {
  state.status = event.target.value;
  state.selectedOrderId = null;
  render();
});
categoryFilter.addEventListener("change", event => {
  state.category = event.target.value;
  state.selectedOrderId = null;
  render();
});
document.getElementById("ordersTable").addEventListener("click", event => {
  const button = event.target.closest(".detail-button");
  if (!button) return;
  state.selectedOrderId = Number(button.dataset.orderId);
  const order = getVisibleOrders().find(item => item.id === state.selectedOrderId);
  renderDetail(order || null);
});
document.getElementById("detailSection").addEventListener("click", event => {
  if (event.target.id === "closeDetail") {
    state.selectedOrderId = null;
    renderDetail(null);
  }
});

init();
