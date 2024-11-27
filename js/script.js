
const countriesList = document.getElementById("countries-list");

// Función principal para obtener datos
async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();

    // Ordenar alfabéticamente por nombre
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common, 'en', { sensitivity: 'base' }));

    // Renderizar lista de países
    displayCountries(countries);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    countriesList.innerHTML = `<p>Error al cargar los países. Por favor, inténtalo de nuevo.</p>`;
  }
}

// Renderizar países en la lista
function displayCountries(countries) {
  countriesList.innerHTML = ""; 
  countries.forEach((country) => {
    const countryDiv = document.createElement("div");
    countryDiv.classList.add("country");
    countryDiv.innerHTML = `
      <img src="${country.flags.png}" alt="Bandera de ${country.name.common}" class="flag">
      <p>${country.name.common}</p>
    `;
    countryDiv.addEventListener("click", () => displayCountryDetails(country));
    countriesList.appendChild(countryDiv);
  });
}

// Mostrar detalles del país
function displayCountryDetails(country) {
  // Crear ventana flotante
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-btn">&times;</button>
      <img src="${country.flags.png}" alt="Bandera de ${country.name.common}" class="flag-large">
      <h2>${country.name.common}</h2>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "No disponible"}</p>
      <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Conducción:</strong> ${country.car.side === "right" ? "Por la derecha" : "Por la izquierda"}</p>
    </div>
  `;

  // Botón para cerrar la ventana
  modal.querySelector(".close-btn").addEventListener("click", () => {
    modal.remove();
  });

  document.body.appendChild(modal);
}

// Llamar a la función al cargar el DOM
document.addEventListener("DOMContentLoaded", fetchCountries);