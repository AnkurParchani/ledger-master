/* eslint-disable */
import { reviews, faq } from "./data.js";
import { showContactModal } from "./modal.js";

// Appending the reviews
reviews.forEach(review => {
  let starIcons = "";
  for (let i = review.stars; i < 5; i++) {
    starIcons += "<i class='fa-regular fa-star fontAwesomeStars'></i>";
  }
  for (let i = 0; i < review.stars; i++) {
    starIcons += "<i class='fa-solid fa-star fontAwesomeStars'></i>";
  }

  const html = `
    <div class="review item">
        <h1 class="reviewSymbol">${review.symbol}</h1>
        ${starIcons}
        <h2 class="reviewName">${review.name}</h2>
        <h3 class="reviewReview">${review.review}</h3>
    </div>
    `;
  document
    .querySelector(".reviewCarousel")
    .insertAdjacentHTML("beforeend", html);
});

$(document).ready(function() {
  $(".owl-carousel").owlCarousel({
    stagePadding: 120,
    loop: true,
    margin: 30,
    dots: false,
    smartSpeed: 2000,
    autoplayTimeout: 4000,
    nav: false,
    animateOut: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 0
      },

      700: {
        items: 2,
        stagePadding: 0
      },
      1200: {
        items: 3
      }
    }
  });
});

// For Frequently Asked Questions
faq.forEach((entry, i) => {
  const html = `
  <div class="accordion-item">
  <h2 class="accordion-header" id="heading${i}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}"
          aria-expanded="false" aria-controls="collapse${i}">
          ${entry.question}
      </button>
  </h2>
  <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}"
      data-bs-parent="#faqAccordion">
      <div class="accordion-body">
          ${entry.answer}
      </div>
  </div>
</div>
  `;

  document.querySelector("#faqAccordion").insertAdjacentHTML("beforeend", html);
});

// To show contact page
document
  .querySelector("#contactLink")
  .addEventListener("click", showContactModal);
