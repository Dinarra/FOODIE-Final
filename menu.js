
const dishes = [
  { id: 1, name: "Carbonara Pasta", category: "main", price: 12, description: "Creamy pasta with parmesan and bacon.", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600" },
  { id: 2, name: "Foodie Burger", category: "main", price: 14, description: "Juicy burger with cheese and vegetables.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600" },
  { id: 3, name: "Grilled Salmon Steak", category: "main", price: 21, description: "Fresh salmon with vegetables.", image: "https://images.unsplash.com/photo-1467003909585-2f8a7277f2a5?w=600" },
  { id: 4, name: "Mushroom Risotto", category: "main", price: 13, description: "Italian rice with mushrooms.", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600" },
  { id: 5, name: "Caesar Salad", category: "starter", price: 9, description: "Lettuce, croutons and parmesan.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600" },
  { id: 6, name: "Tomato Bruschetta", category: "starter", price: 7, description: "Toasted bread with tomatoes.", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600" },
  { id: 7, name: "Pumpkin Cream Soup", category: "starter", price: 8, description: "Warm creamy pumpkin soup.", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600" },
  { id: 8, name: "Tiramisu", category: "dessert", price: 8, description: "Classic Italian coffee dessert.", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600" },
  { id: 9, name: "New York Cheesecake", category: "dessert", price: 9, description: "Creamy cheesecake.", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600" }
];

const categories = ["all", "main", "starter", "dessert"];
const FAVORITES_KEY = "foodieFavorites";

// Load saved favorites safely
function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    return Array.isArray(saved)
      ? saved.filter(id => Number.isInteger(id) && dishes.some(d => d.id === id))
      : [];
  } catch (error) {
    return [];
  }
}

let favorites = loadFavorites();
let showOnlyFavorites = false;

const menuContainer = document.getElementById("dynamic-menu");
const searchInput = document.getElementById("menu-search");
const categorySelect = document.getElementById("category-filter");
const favoritesButton = document.getElementById("show-favorites");
const menuMessage = document.getElementById("menu-message");
const sortSelect = document.getElementById("sort-menu");
const maxPriceInput = document.getElementById("max-price");
const priceValue = document.getElementById("price-value");

// Create category options
categories.forEach(category => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category === "all"
    ? "All Categories"
    : category.charAt(0).toUpperCase() + category.slice(1);
  categorySelect.appendChild(option);
});

// Search, filter and sort dishes
function getFilteredDishes() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const maxPrice = Number(maxPriceInput.value);

  const filtered = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(search);
    const matchesCategory = category === "all" || dish.category === category;
    const matchesFavorites = !showOnlyFavorites || favorites.includes(dish.id);
    const matchesPrice = dish.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesFavorites && matchesPrice;
  });

  const sort = sortSelect.value;

  if (sort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return filtered;
}

// Create a menu card
function createDishCard(dish) {
  const column = document.createElement("div");
  column.className = "col-12 col-md-6 col-lg-4";

  const card = document.createElement("div");
  card.className = "card h-100 shadow-sm";

  const image = document.createElement("img");
  image.src = dish.image;
  image.alt = dish.name;
  image.className = "card-img-top";
  image.loading = "lazy";
  image.style.height = "220px";
  image.style.objectFit = "cover";

  const body = document.createElement("div");
  body.className = "card-body d-flex flex-column";

  const title = document.createElement("h3");
  title.className = "h5";
  title.textContent = dish.name;

  const description = document.createElement("p");
  description.textContent = dish.description;

  const price = document.createElement("p");
  price.className = "fw-bold";
  price.textContent = `$${dish.price.toFixed(2)}`;

  const actions = document.createElement("div");
  actions.className = "d-flex gap-2 flex-wrap mt-auto";

  const favoriteButton = document.createElement("button");
  favoriteButton.type = "button";
  favoriteButton.className = "btn btn-outline-danger";
  favoriteButton.dataset.favoriteId = dish.id;
  favoriteButton.textContent = favorites.includes(dish.id)
    ? "♥ Saved"
    : "♡ Favorite";
  favoriteButton.setAttribute(
    "aria-pressed",
    String(favorites.includes(dish.id))
  );

  const cartButton = document.createElement("button");
  cartButton.type = "button";
  cartButton.className = "btn btn-danger";
  cartButton.textContent = "Add to Cart";
  cartButton.dataset.addCart = "true";
  cartButton.dataset.id = dish.id;
  cartButton.dataset.name = dish.name;
  cartButton.dataset.price = dish.price;

  actions.append(favoriteButton, cartButton);
  body.append(title, description, price, actions);
  card.append(image, body);
  column.appendChild(card);

  return column;
}

// Display filtered dishes
function renderMenu() {
  const filtered = getFilteredDishes();
  menuContainer.replaceChildren();

  menuMessage.textContent = filtered.length === 0
    ? "No dishes found."
    : `${filtered.length} dishes found.`;

  for (const dish of filtered) {
    menuContainer.appendChild(createDishCard(dish));
  }
}

// Add or remove a favorite
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(itemId => itemId !== id);
  } else {
    favorites.push(id);
  }

  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    menuMessage.textContent = "Favorites could not be saved.";
  }

  renderMenu();
}

// Update favorites button
function updateFavoriteButton() {
  favoritesButton.textContent = showOnlyFavorites
    ? "Show All Dishes"
    : "Show Favorites";

  favoritesButton.setAttribute("aria-pressed", String(showOnlyFavorites));
}

// Menu events
searchInput.addEventListener("input", renderMenu);
categorySelect.addEventListener("change", renderMenu);
sortSelect.addEventListener("change", renderMenu);

maxPriceInput.addEventListener("input", () => {
  priceValue.textContent = maxPriceInput.value;
  renderMenu();
});

favoritesButton.addEventListener("click", () => {
  showOnlyFavorites = !showOnlyFavorites;
  updateFavoriteButton();
  renderMenu();
});

menuContainer.addEventListener("click", event => {
  const button = event.target.closest("[data-favorite-id]");

  if (button) {
    toggleFavorite(Number(button.dataset.favoriteId));
  }
});

updateFavoriteButton();
renderMenu();
