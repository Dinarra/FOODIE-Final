# 🍽️ FOODIE — Restaurant Website

**Web Technologies | Final Project | 2026**

FOODIE is a responsive, interactive restaurant website developed as a university Web Technologies project. It allows visitors to explore the restaurant menu, search and filter dishes, save favorite meals, manage a shopping cart, discover recipes using an external API, reserve a table, and contact the restaurant.

This Final Project extends the previous Midterm and Endterm assignments by integrating advanced JavaScript functionality, Object-Oriented Programming (OOP), asynchronous API requests, browser storage, and interactive UI features.

## 👥 Team Members

| Student | Main Responsibilities |
|---|---|
| Nurzhaubay Dinara | Home page, Menu page, advanced search and filtering |
| Balzhan Amantaeva | Reservation page, Contact page, shopping cart and OOP |
| Li Yuixin | About page, external API integration, Dark Mode and responsive design |

### Team Collaboration

All three team members contributed equally to the development of the FOODIE Final Project.

The team worked collaboratively on JavaScript functionality, DOM manipulation, UI improvements, debugging, testing, and final project integration.

Each member participated in reviewing the website and ensuring that all features worked correctly.

**All team members have equal roles and responsibilities in the final project.**

## ✨ Main Features

### 1. External API Integration

The Menu page includes a **Live Recipe Explorer** powered by the public [TheMealDB API](https://www.themealdb.com/api.php).

- Uses `fetch()` with `async/await`
- Processes JSON responses
- Dynamically displays recipe cards with images and information
- Supports searching for recipes by name
- Handles loading, empty results, and request errors
- Allows users to expand and collapse recipe instructions

API endpoint:

`https://www.themealdb.com/api/json/v1/1/search.php?s=`

No API key is required for the public educational endpoint used in this project.

**Implementation:** `api.js`

### 2. Object-Oriented Programming (OOP)

The shopping cart is implemented using JavaScript classes.

**CartItem class:**
- Stores dish ID, name, price, and quantity
- Calculates the total price of an item
- Supports quantity increases and decreases

**FoodieCart class:**
- Manages a collection of cart items
- Adds and removes dishes
- Updates item quantities
- Calculates the total price and item count
- Saves and restores cart data

The application creates multiple `CartItem` instances through the `FoodieCart` class.

**Implementation:** `cart.js`

### 3. Local Storage

The website uses browser `localStorage` to preserve user preferences and application data.

| Storage Key | Purpose |
|---|---|
| `foodieFinalCart` | Saves shopping cart items |
| `foodieFavorites` | Saves favorite dishes |
| `foodieTheme` | Saves the selected color theme |

Stored JSON data is handled with error protection to reduce problems caused by invalid or unavailable storage.

### 4. Advanced Search, Filtering, and Sorting

The Menu page allows users to:

- Search dishes by name
- Filter dishes by category
- Sort dishes by price, ascending or descending
- Sort dishes alphabetically
- Filter dishes by maximum price
- Display favorite dishes only

The displayed menu updates dynamically without reloading the page.

**Implementation:** `menu.js`

### 5. Interactive Shopping Cart

Users can:

- Add dishes to the cart
- Increase or decrease quantities
- Remove individual dishes
- View the total item count and price
- Clear the entire cart
- Keep cart items after refreshing the page

The shopping cart demonstrates DOM manipulation, event handling, OOP, and persistent browser storage.

### 6. Favorites System

Users can mark dishes as favorites and display only their saved dishes.

Favorite selections remain available after refreshing the page through `localStorage`.

### 7. Dark Mode

The website provides Light Mode and Dark Mode.

- Theme toggle is available on all five pages
- Theme preference is saved in `localStorage`
- The selected theme remains active after refreshing or navigating between pages
- Dark Mode styles are applied to the main interface elements

**Implementation:** `theme.js` and `theme.css`

### 8. Form Validation

The Reservation and Contact pages include interactive forms with JavaScript validation.

The forms provide feedback for invalid input and show confirmation messages when valid information is submitted.

These are demonstration forms. They do not create real restaurant bookings or send messages to a production server.

### 9. Responsive Design

The website uses HTML5, CSS3, Bootstrap 5, Flexbox, and responsive layouts to support different screen sizes.

## 📄 Website Pages

| Page | Description |
|---|---|
| `foodie-home.html` | Restaurant introduction, featured dishes, and interactive elements |
| `foodie-menu.html` | Dynamic menu, filtering, favorites, cart, and recipe API |
| `foodie-about.html` | Restaurant story, feature cards, and interactive information |
| `foodie-reservation.html` | Table reservation form with validation |
| `foodie-contact.html` | Contact information and interactive contact form |

## 🛠️ Technologies Used

- **HTML5** — Website structure
- **CSS3** — Custom styling and responsive design
- **Bootstrap 5.3.3** — Responsive layout and UI components
- **JavaScript (ES6+)** — Application logic and interactions
- **DOM Manipulation** — Dynamic rendering and content updates
- **jQuery** — Form interactions and visual effects
- **Fetch API** — Asynchronous requests to an external service
- **JSON** — API data processing and storage serialization
- **JavaScript Classes** — Object-Oriented Programming
- **localStorage** — Persistent client-side data
- **Git and GitHub** — Version control and project hosting

## 📁 Project Structure

```text
FOODIE-Final/
├── index.html
├── foodie-home.html
├── foodie-menu.html
├── foodie-about.html
├── foodie-reservation.html
├── foodie-contact.html
├── foodie.css
├── theme.css
├── home.js
├── menu.js
├── about.js
├── reservation.js
├── contact.js
├── cart.js
├── api.js
├── theme.js
└── README.md
```

## 🚀 How to Run the Project

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension if necessary.
4. Open `index.html` or `foodie-home.html` using Live Server.
5. Navigate between the pages using the website menu.

An internet connection is required for the external recipe API and CDN resources.

No backend server, database, or additional package installation is required.

## 🧪 Testing

The website was manually checked in a browser.

The following functionality was verified:

- Home page interactive elements
- Navigation between pages
- Dynamic menu rendering
- Search, category filters, price filters, and sorting
- Favorites functionality
- Shopping cart operations and total calculations
- Persistence after refreshing the page
- Recipe API loading, searching, and error states
- Dark Mode and theme persistence
- About page interactions
- Reservation form validation
- Contact form validation

## 🔗 Project Links

**Final Project Repository:**  
https://github.com/Dinarra/FOODIE-Final.git

**Final Project Website:**  
https://dinarra.github.io/FOODIE-Final/

## 🎓 Academic Purpose

This website was developed for educational purposes as a Final Project in Web Technologies.

The project demonstrates the practical application of frontend development concepts, asynchronous JavaScript, OOP, browser storage, DOM manipulation, responsive design, and interactive user interfaces.

---

**© 2026 FOODIE Restaurant — Web Technologies Final Project.**