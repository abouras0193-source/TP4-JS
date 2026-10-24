# TP4 — Application JavaScript structurée avec données liées

## Description
Application frontend de gestion des commandes construite avec HTML, Bootstrap, JavaScript en modules et trois sources JSON liées.

## Structure
- `index.html` : structure de la page.
- `css/style.css` : styles personnalisés.
- `data/customers.json` : clients.
- `data/products.json` : produits et prix.
- `data/orders.json` : commandes, identifiants et quantités.
- `js/state.js` : état central.
- `js/dataService.js` : chargement des fichiers JSON.
- `js/selectors.js` : relations, calculs, recherche et filtres.
- `js/view.js` : affichage dans le DOM.
- `js/app.js` : initialisation et événements.

## Fonctionnalités
- Indicateurs dynamiques : clients, produits, commandes et montant cumulé.
- Recherche par nom du client.
- Filtrage par statut et catégorie.
- Détail d'une commande avec prix, quantité et total.
- Gestion des erreurs de chargement.

## Lancement
1. Ouvrir le dossier dans Visual Studio Code.
2. Installer/activer l'extension **Live Server**.
3. Faire un clic droit sur `index.html`, puis choisir **Open with Live Server**.
4. Vérifier la Console et l'onglet Network des outils développeur en cas d'erreur.

Les modules JavaScript et `fetch()` nécessitent un serveur local dans les navigateurs habituels ; ne pas ouvrir `index.html` directement avec `file://`.

## Git et GitHub
Créer un dépôt GitHub public, puis exécuter les commandes ci-dessous dans le terminal à la racine du projet. Remplacer l'URL par celle de votre propre dépôt.

```bash
git init
git add .
git commit -m "Initial project structure"
git add data
git commit -m "Add linked JSON data"
git add js
git commit -m "Add data loading and entity relations"
git add index.html css
git commit -m "Add dashboard, filters and order details"
git branch -M main
git remote add origin URL_DU_DEPOT
git push -u origin main
```

Ne prétendez pas que ces commits ont été réalisés si vous ne les avez pas exécutés. Le dépôt remis doit contenir votre historique réel.
