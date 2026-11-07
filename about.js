
const aboutButtons = document.querySelectorAll(".about-btn");
const aboutResult = document.getElementById("about-result");

// Information about our restaurant
const aboutInfo = {
  atmosphere: "Enjoy a cozy atmosphere where you can relax with friends and family.",
  team: "Our friendly team works hard to make every visit special.",
  ingredients: "We use fresh ingredients to prepare delicious meals every day."
};

// Show information when a button is clicked
function showAboutInfo(topic) {
  const message = aboutInfo[topic];

  if (!message) {
    return;
  }

  aboutResult.textContent = message;
  aboutResult.classList.remove("d-none");
}

// Connect buttons to the function
if (aboutResult && aboutButtons.length > 0) {
  aboutButtons.forEach(button => {
    button.addEventListener("click", function() {
      const topic = this.dataset.topic;

      showAboutInfo(topic);

      // Highlight the selected button
      aboutButtons.forEach(item => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      this.classList.add("active");
      this.setAttribute("aria-pressed", "true");
    });
  });
}
