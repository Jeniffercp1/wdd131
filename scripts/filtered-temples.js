const temples = [
  {
    templeName: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/temples/aba-temple.jpg"
  },
  {
    templeName: "Manti Utah Temple",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/temples/manti-temple.jpg"
  },
  {
    templeName: "Payson Utah Temple",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/temples/payson-temple.jpg"
  },
  {
    templeName: "Yigo Guam Temple",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/temples/yigo-temple.jpg"
  },
  {
    templeName: "Washington D.C. Temple",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/temples/washdc-temple.jpg"
  },
  {
    templeName: "Lima Peru Temple",
    location: "Lima, Peru",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/temples/lima-temple.jpg"
  },
  {
    templeName: "Mexico City Mexico Temple",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "images/temples/mexico-temple.jpg"
  },
  {
    templeName: "Guayaquil Ecuador Temple",
    location: "Guayaquil, Ecuador",
    dedicated: "1999, August, 1",
    area: 70000,
    imageUrl: "images/temples/guayaquil-temple.jpg"
  },
  {
    templeName: "Sao Paulo Brazil Temple",
    location: "Sao Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl: "images/temples/saopaulo-temple.webp"
  },
  {
    templeName: "Cochabamba Bolivia Temple",
    location: "Cochabamba, Bolivia",
    dedicated: "2000, April, 30",
    area: 33284,
    imageUrl: "images/temples/cochabamba-temple.jpg"
  },
  {
    templeName: "Asuncion Paraguay Temple",
    location: "Asuncion, Paraguay",
    dedicated: "2002, May, 19",
    area: 11823,
    imageUrl: "images/temples/asuncion-temple.jpg"
  },
  {
    templeName: "Colonia Juarez Chihuahua Mexico Temple",
    location: "Colonia Juarez, Chihuahua, Mexico",
    dedicated: "1999, March, 6",
    area: 6800,
    imageUrl: "images/temples/juarez-temple.jpg"
  }
];

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#primary-nav");
const templeCards = document.querySelector("#temple-cards");
const albumTitle = document.querySelector("#album-title");
const navLinks = document.querySelectorAll("#primary-nav a");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

function getYear(dedicationDate) {
  return Number(dedicationDate.split(",")[0]);
}

function createInfoRow(label, value) {
  const term = document.createElement("dt");
  const description = document.createElement("dd");

  term.textContent = label;
  description.textContent = value;

  return [term, description];
}

function createTempleCard(temple) {
  const card = document.createElement("section");
  const name = document.createElement("h2");
  const info = document.createElement("dl");
  const image = document.createElement("img");

  card.classList.add("temple-card");
  name.textContent = temple.templeName;

  [
    createInfoRow("Location:", temple.location),
    createInfoRow("Dedicated:", temple.dedicated),
    createInfoRow("Size:", `${temple.area.toLocaleString()} sq ft`)
  ].forEach((row) => info.append(...row));

  image.src = temple.imageUrl;
  image.alt = temple.templeName;
  image.loading = "lazy";
  image.width = 400;
  image.height = 260;

  card.append(name, info, image);
  return card;
}

function displayTemples(filteredTemples) {
  templeCards.innerHTML = "";
  filteredTemples.forEach((temple) => {
    templeCards.append(createTempleCard(temple));
  });
}

function filterTemples(filter) {
  switch (filter) {
    case "old":
      return temples.filter((temple) => getYear(temple.dedicated) < 1900);
    case "new":
      return temples.filter((temple) => getYear(temple.dedicated) > 2000);
    case "large":
      return temples.filter((temple) => temple.area > 90000);
    case "small":
      return temples.filter((temple) => temple.area < 10000);
    default:
      return temples;
  }
}

function updateActiveFilter(activeLink) {
  navLinks.forEach((link) => link.classList.remove("active"));
  activeLink.classList.add("active");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.classList.toggle("open");
  navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filter = link.dataset.filter;

    albumTitle.textContent = link.textContent;
    updateActiveFilter(link);
    displayTemples(filterTemples(filter));
    navigation.classList.remove("open");
    menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  });
});

displayTemples(temples);
updateActiveFilter(document.querySelector('[data-filter="home"]'));
