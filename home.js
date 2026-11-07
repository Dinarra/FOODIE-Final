
const popularDishes = [
  {
    name: "Carbonara Pasta",
    price: 12,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
  },
  {
    name: "Foodie Burger",
    price: 14,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
  },
  {
    name: "Grilled Salmon Steak",
    price: 21,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500"
  }
];

const popularContainer = document.getElementById("popular-dishes");
const surpriseButton = document.getElementById("surprise-btn");
const surpriseResult = document.getElementById("surprise-result");

// Create a card for each dish
function createPopularCard(dish) {
  const column = document.createElement("div");
  column.className = "col-12 col-md-6 col-lg-4";

  column.innerHTML = `
    <div class="card h-100">
      <img src="${dish.image}" alt="${dish.name}">
      <div class="card-body">
        <h3>${dish.name}</h3>
        <p>Freshly prepared and full of flavor.</p>
        <p class="price">$${dish.price}</p>
        <a href="foodie-menu.html" class="btn">View Menu</a>
      </div>
    </div>
  `;

  return column;
}

// Show popular dishes on the page
function showPopularDishes() {
  popularContainer.innerHTML = "";

  popularDishes.forEach(dish => {
    popularContainer.appendChild(createPopularCard(dish));
  });
}

// Pick a random dish
function getRandomDish() {
  const randomIndex = Math.floor(Math.random() * popularDishes.length);
  return popularDishes[randomIndex];
}

// Show the selected dish
function showSurprise() {
  const dish = getRandomDish();
  surpriseResult.textContent = `You should try ${dish.name} today!`;
}

if (popularContainer && surpriseButton && surpriseResult) {
  showPopularDishes();

  surpriseButton.addEventListener("click", showSurprise);
}
