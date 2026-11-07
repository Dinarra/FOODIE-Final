
const CART_STORAGE_KEY = "foodieFinalCart";

// One object represents one dish in the cart
class CartItem {
  constructor(id, name, price, quantity = 1) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  // Calculate the price for this item
  getTotal() {
    return this.price * this.quantity;
  }

  // Increase the quantity
  increase() {
    this.quantity++;
  }

  // Decrease the quantity
  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}

// Manage all cart items
class FoodieCart {
  constructor() {
    this.items = this.loadCart();
  }

  // Load saved items from localStorage
  loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");

      if (!Array.isArray(saved)) {
        return [];
      }

      return saved
        .filter(item =>
          item &&
          Number.isInteger(item.id) &&
          typeof item.name === "string" &&
          item.name.trim() !== "" &&
          Number.isFinite(item.price) &&
          item.price >= 0 &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0
        )
        .map(item => new CartItem(
          item.id,
          item.name,
          item.price,
          item.quantity
        ));
    } catch (error) {
      return [];
    }
  }

  // Save cart items
  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      return true;
    } catch (error) {
      return false;
    }
  }

  // Add a dish to the cart
  addItem(id, name, price) {
    if (!Number.isInteger(id) || typeof name !== "string" ||
        !name.trim() || !Number.isFinite(price) || price < 0) {
      return false;
    }

    const existingItem = this.items.find(item => item.id === id);

    if (existingItem) {
      existingItem.increase();
    } else {
      this.items.push(new CartItem(id, name, price));
    }

    this.saveCart();
    return true;
  }

  // Change the quantity
  changeQuantity(id, change) {
    const item = this.items.find(item => item.id === id);

    if (!item) {
      return;
    }

    if (change > 0) {
      item.increase();
    } else if (change < 0) {
      item.decrease();
    }

    this.saveCart();
  }

  // Remove one dish
  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveCart();
  }

  // Remove all dishes
  clearCart() {
    this.items = [];
    this.saveCart();
  }

  // Calculate the total price
  getTotal() {
    return this.items.reduce((total, item) => total + item.getTotal(), 0);
  }

  // Count all items
  getCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }
}

const foodieCart = new FoodieCart();

// Show cart items on the page
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  if (!cartContainer || !cartTotal) {
    return;
  }

  cartContainer.innerHTML = "";

  if (foodieCart.items.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Your cart is empty.";
    cartContainer.appendChild(emptyMessage);
  }

  foodieCart.items.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item border-bottom py-3";

    const name = document.createElement("h4");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = `$${item.getTotal().toFixed(2)}`;

    const controls = document.createElement("div");
    controls.className = "d-flex align-items-center gap-2 flex-wrap";

    const decreaseButton = document.createElement("button");
    decreaseButton.type = "button";
    decreaseButton.className = "btn";
    decreaseButton.textContent = "-";
    decreaseButton.dataset.action = "decrease";
    decreaseButton.dataset.id = item.id;
    decreaseButton.setAttribute("aria-label", `Decrease ${item.name}`);

    const quantity = document.createElement("span");
    quantity.textContent = `Quantity: ${item.quantity}`;

    const increaseButton = document.createElement("button");
    increaseButton.type = "button";
    increaseButton.className = "btn";
    increaseButton.textContent = "+";
    increaseButton.dataset.action = "increase";
    increaseButton.dataset.id = item.id;
    increaseButton.setAttribute("aria-label", `Increase ${item.name}`);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "btn";
    removeButton.textContent = "Remove";
    removeButton.dataset.action = "remove";
    removeButton.dataset.id = item.id;

    controls.append(decreaseButton, quantity, increaseButton, removeButton);
    row.append(name, price, controls);
    cartContainer.appendChild(row);
  });

  cartTotal.textContent = `$${foodieCart.getTotal().toFixed(2)}`;

  if (cartCount) {
    cartCount.textContent = foodieCart.getCount();
  }
}

// Handle cart buttons
document.addEventListener("click", function(event) {
  const addButton = event.target.closest("[data-add-cart]");

  if (addButton) {
    const id = Number(addButton.dataset.id);
    const name = addButton.dataset.name;
    const price = Number(addButton.dataset.price);

    if (foodieCart.addItem(id, name, price)) {
      renderCart();
    }
    return;
  }

  const cartButton = event.target.closest("[data-action]");

  if (!cartButton || !cartButton.closest("#cart-items")) {
    return;
  }

  const id = Number(cartButton.dataset.id);
  const action = cartButton.dataset.action;

  if (action === "increase") {
    foodieCart.changeQuantity(id, 1);
  } else if (action === "decrease") {
    foodieCart.changeQuantity(id, -1);
  } else if (action === "remove") {
    foodieCart.removeItem(id);
  }

  renderCart();
});

// Clear the entire cart
document.addEventListener("click", function(event) {
  if (event.target.closest("#clear-cart")) {
    foodieCart.clearCart();
    renderCart();
  }
});

// Display saved cart when the page opens
document.addEventListener("DOMContentLoaded", renderCart);
