
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Load recipes from the public API
async function loadRecipes(search = "") {
  const container = document.getElementById("api-results");
  const status = document.getElementById("api-status");

  if (!container || !status) return;

  container.replaceChildren();
  status.textContent = "Loading recipes...";

  try {
    const response = await fetch(API_URL + encodeURIComponent(search));

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.meals) || data.meals.length === 0) {
      status.textContent = "No recipes found.";
      return;
    }

    status.textContent = `${data.meals.length} recipes found.`;

    data.meals.slice(0, 9).forEach(meal => {
      const column = document.createElement("div");
      column.className = "col-12 col-md-6 col-lg-4";

      const card = document.createElement("div");
      card.className = "card h-100 shadow-sm";

      const image = document.createElement("img");
      image.className = "card-img-top";
      image.src = meal.strMealThumb;
      image.alt = meal.strMeal;
      image.loading = "lazy";

      const body = document.createElement("div");
      body.className = "card-body";

      const title = document.createElement("h3");
      title.className = "h5";
      title.textContent = meal.strMeal;

      const category = document.createElement("p");
      category.textContent = meal.strCategory || "Recipe";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn btn-danger";
      button.textContent = "View Recipe";

      const instructions = document.createElement("p");
      instructions.className = "mt-3";
      instructions.hidden = true;
      instructions.textContent = meal.strInstructions || "No instructions available.";

      button.addEventListener("click", () => {
        instructions.hidden = !instructions.hidden;
        button.textContent = instructions.hidden ? "View Recipe" : "Hide Recipe";
      });

      body.append(title, category, button, instructions);
      card.append(image, body);
      column.appendChild(card);
      container.appendChild(column);
    });
  } catch (error) {
    status.textContent = "Could not load recipes. Please try again.";
  }
}

// Search recipes
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("api-search-form");
  const input = document.getElementById("api-search");

  if (!form || !input) return;

  form.addEventListener("submit", event => {
    event.preventDefault();
    loadRecipes(input.value.trim());
  });

  loadRecipes();
});
