const cardContainer = document.querySelector(".card__container");
const categoryContainer = document.querySelector(".shoe-category");
const sizeContainer = document.querySelector(".shoe-sizes");
const colorContainer = document.querySelector(".shoe__colors");
const cartAmount = document.querySelectorAll(".cart__amount");
const searchInput = document.querySelector(".search--input");
const modalContainer = document.querySelector(".modal");
const searchIcon = document.querySelector(".nav__searchIcon");
const menuIconToggle = document.querySelector(".Nav__mobile--menuIcon");
const navMobileList = document.querySelector(".nav__mobile--ul");
const filterIcon = document.querySelector(".filter--Icon");
const sectionFilterContainer = document.querySelector(".filters");
const cartButton = document.querySelector(".cart__button");
// filtros

// función para crear los filtros de categoria, size y color

function createFilters() {
  const categories = [...new Set(Shoes.map((item) => item.categoria))];
  const sizes = [...new Set(Shoes.flatMap((item) => item.size))];
  const colors = [...new Set(Shoes.flatMap((item) => item.color))];

  categories.forEach((category) => {
    const label = document.createElement("label");
    label.textContent = category;
    label.classList.add("filter__label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = category;
    input.classList.add("filter_checkbox");
    label.prepend(input);
    categoryContainer.appendChild(label);
  });

  sizes.forEach((size) => {
    const label = document.createElement("label");
    label.textContent = size;
    label.classList.add("filter__label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = size;
    input.classList.add("filter_checkbox");
    label.prepend(input);
    sizeContainer.appendChild(label);
  });

  colors.forEach((color) => {
    const label = document.createElement("label");
    label.textContent = color;
    label.classList.add("filter__label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = color.toLowerCase();
    input.classList.add(color.toLowerCase(), "color__checkbox");
    label.prepend(input);
    colorContainer.appendChild(label);
  });

  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", handleFilter);
  });

  searchInput.addEventListener("input", handleFilter);
}

//  handle filters/ funciçon para manejar los filtros (hacer que filtren)

function handleFilter() {
  const selectedCategories = Array.from(
    document.querySelectorAll(".shoe-category input:checked")
  ).map((input) => input.value);

  const selectedSizes = Array.from(
    document.querySelectorAll(".shoe-sizes input:checked")
  ).map((input) => input.value);

  const selectedColors = Array.from(
    document.querySelectorAll(".shoe__colors input:checked")
  ).map((input) => input.value.toLowerCase());

  const searchText = searchInput.value.toLowerCase().trim();

  const filteredShoes = Shoes.filter((shoe) => {
    const matchCategory = selectedCategories.length
      ? selectedCategories.includes(shoe.categoria)
      : true;

    const matchSize = selectedSizes.length
      ? shoe.size.some((size) => selectedSizes.includes(String(size)))
      : true;

    const matchColor = selectedColors.length
      ? shoe.images.some((img) =>
          selectedColors.includes(img.color.toLowerCase())
        )
      : true;

    const matchSearch = shoe.name.toLowerCase().includes(searchText);

    return matchCategory && matchSize && matchColor && matchSearch;
  });

  createCards(filteredShoes);
}

//  Función para crear las tarjetas con las imágenes principales de cada tipo de zapato

function createCards(filteredShoes = Shoes) {
  cardContainer.innerHTML = "";
  filteredShoes.forEach((shoe) => {
    const selectedColor =
      document.querySelector(".shoe__colors input:checked")?.value || null;
    const picToShow = selectedColor
      ? shoe.images.find(
          (img) => img.color.toLowerCase() === selectedColor.toLowerCase()
        )
      : shoe.images[0];
    const picUrl = picToShow ? picToShow.url : shoe.images[0].url;
    cardContainer.innerHTML += `
      <div class="card" data-name="${shoe.name}">
        <img src="${picUrl}" alt="${shoe.name}" class="main-image">
        <h4>${shoe.name}</h4>
        <p class="card__cat"><strong>Categoría:</strong> ${shoe.categoria}</p>
        <p class="card__cat"><strong>Descripción: </strong>${shoe.description}</p>
        <p class="card__cat"><strong>Precio: </strong>${shoe.price}</p>
        <button class="cart__button">Agregar a carrito</button>
      </div>
    `;
  });
}

// EventListenrs  para que se agregue la cantidad al span de carrito cuando se haga click por cada botón
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("cart__button")) {
    e.stopPropagation();
    const cartAmounts = document.querySelectorAll(".cart__amount");
    cartAmounts.forEach((span) => {
      let currentAmount = parseInt(span.textContent) || 0;
      currentAmount++;
      span.textContent = currentAmount;
      span.classList.add("cart__movement");
      setTimeout(() => span.classList.remove("cart__movement"), 2500);
    });
  }

  //  funciones para el modal(imagen grande (main_image) e imagenes pequeñas con el mismo nombre)

  if (e.target.classList.contains("main-image")) {
    const shoeName = e.target.closest(".card").dataset.name;
    const shoe = Shoes.find((item) => item.name === shoeName);
    const modalContent = document.querySelector(".modal__container");

    // Sección contenedor principal del modal
    modalContent.innerHTML = `
      
        <div class="modal__image--data">
          <img src="${shoe.images[0].url}" alt="${shoe.name}" class="modal-main-image">
          <div class="modal__data">
          <h4>${shoe.name}</h4>
          <p class="card__cat">Color: <span class="modal-main-color">${shoe.images[0].color}</span></p>
          <p class="card__cat"><strong>Descripción: </strong>${shoe.description}</p>
          <p class="card__cat"><strong>Precio: </strong>${shoe.price}</p>
          <button class="cart__button">Agregar a carrito</button>
          </div>
        </div>
       
        <div class="modal__side--images"></div>
     
    `;

    const modalSideImages = modalContent.querySelector(".modal__side--images");

    shoe.images.forEach((img, index) => {
      const littleImage = document.createElement("img");
      littleImage.src = img.url;
      littleImage.alt = img.color;
      littleImage.classList.add("side-littleImagenail");

      littleImage.addEventListener("click", function () {
        const mainImg = modalContent.querySelector(".modal-main-image");
        mainImg.src = img.url;
        mainImg.alt = shoe.name;
        modalContent.querySelector(".modal-main-color").textContent = img.color;
      });
      modalSideImages.appendChild(littleImage);
    });

    document.querySelector(".modal").classList.add("open");
  }
});

document.querySelector(".modal-close").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("open");
});

// funciones para manejar la barra de búsqueda

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleFilter();
  }
});

//  función para que se muestre la lista del nav en versión móvil

menuIconToggle.addEventListener("click", function () {
  navMobileList.classList.toggle("mostrar");
});

//  Función para que aparezaca y desaparezca la sección de filtros en versión móvil
filterIcon.addEventListener("click", function () {
  if (sectionFilterContainer.style.display === "none") {
    sectionFilterContainer.style.display = "flex";
  } else {
    sectionFilterContainer.style.display = "none";
  }
});

createFilters();
createCards();
