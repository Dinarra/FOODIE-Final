
const THEME_KEY = "foodieTheme";

// Read the saved theme
function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch (error) {
    return "light";
  }
}

// Apply theme to the website
function applyTheme(theme) {
  const dark = theme === "dark";

  document.documentElement.setAttribute(
    "data-bs-theme",
    dark ? "dark" : "light"
  );

  document.body.classList.toggle("foodie-dark", dark);

  document.querySelectorAll(".theme-toggle").forEach(button => {
    button.textContent = dark ? "☀ Light Mode" : "🌙 Dark Mode";
    button.setAttribute("aria-pressed", String(dark));
  });
}

// Save a new theme
function toggleTheme() {
  const dark = document.body.classList.contains("foodie-dark");
  const nextTheme = dark ? "light" : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem(THEME_KEY, nextTheme);
  } catch (error) {
    // Theme still works until the page reloads
  }
}

// Create the theme button
function createThemeButton() {
  const header = document.querySelector(".site-header");

  if (!header || header.querySelector(".theme-toggle")) {
    return;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle btn btn-outline-danger";
  button.setAttribute("aria-label", "Switch color theme");
  button.addEventListener("click", toggleTheme);

  header.appendChild(button);
}

// Start theme functionality
document.addEventListener("DOMContentLoaded", () => {
  createThemeButton();
  applyTheme(getSavedTheme());
});
