const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const productSelect = document.querySelector("#product");
const reviewCount = document.querySelector("#review-count");
const reviewPlural = document.querySelector("#review-plural");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Última modificación: ${document.lastModified}`;

if (productSelect) {
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
}

if (reviewCount) {
  const completedReviews = Number(localStorage.getItem("completedReviews")) || 0;
  const newTotal = completedReviews + 1;

  localStorage.setItem("completedReviews", newTotal);
  reviewCount.textContent = newTotal;
  reviewPlural.textContent = newTotal === 1 ? "" : "s";
}
