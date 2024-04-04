"use strict";
const global = {
  currentPage: window.location.pathname,
};
const mainContent = document.querySelector(".main-content");
const planetToPass = global.currentPage.replace("/", "").replace(".html", "");
console.log(planetToPass);
function renderMainBtns() {}
async function dataFromJson() {
  try {
    const response = await fetch("../data.json");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function renderOverview(planetName) {
  if (planetToPass === "index") {
    planetName = "mercury";
  }
  const planetsData = await dataFromJson();
  const planet = planetsData.find((planet) => {
    return planet.name.toLowerCase() === planetName.toLowerCase();
  });
  if (planet) {
    let planetHTML = `
           <article class="main-img">
              <img
                src="${planet.images.planet}"
                alt=""
                class="main-img__planet ${planetName}-img"
              />
            </article>
            <article class="main-info">
            <div>
               <h2 class="main-info__title">${planet.name}</h2>
               <p class="main-info__text">${planet.overview.content}</p>
               <p class="main-info__link">
                 Source : <a href="${planet.overview.source}">Wikipedia</a>
              </p>
            </div>

              <ul class="main-info__list">
                <li class="overview bgc-${planetName}__active"><span>01</span>Overview</li>
                <li class="structure"><span>02</span>Internal structure</li>
                <li class="geology"><span>03</span>Surface geology</li>
              </ul>
            </article>
      `;
    mainContent.innerHTML = "";
    mainContent.insertAdjacentHTML("beforeend", planetHTML);
  }
  window.addEventListener("resize", updateContentBasedOnWidth);
}

async function renderStructure(planetName) {
  if (planetToPass === "index") {
    planetName = "mercury";
  }
  const planetsData = await dataFromJson();
  const planet = planetsData.find((planet) => {
    return planet.name.toLowerCase() === planetName.toLowerCase();
  });
  if (planet) {
    let planetHTML = `
           <article class="main-img">
              <img
                src="${planet.images.internal}"
                alt=""
                class="main-img__planet ${planetName}-img"
              />
            </article>
            <article class="main-info">
            <div>
              <h2 class="main-info__title">${planet.name}</h2>
              <p class="main-info__text">${planet.structure.content}</p>
              <p class="main-info__link">
                  Source : <a href="${planet.structure.source}  ">Wikipedia</a>
                </p>
            </div>

              <ul class="main-info__list">
                <li class="overview"><span>01</span>Overview</li>
                <li class="structure bgc-${planetName}__active"><span>02</span>Internal structure</li>
                <li class="geology"><span>03</span>Surface geology</li>
              </ul>
            </article>
      `;
    mainContent.innerHTML = "";
    mainContent.insertAdjacentHTML("beforeend", planetHTML);
  }
  window.addEventListener("resize", updateContentBasedOnWidth);
}

async function renderGeology(planetName) {
  if (planetToPass === "index") {
    planetName = "mercury";
  }
  const planetsData = await dataFromJson();
  const planet = planetsData.find((planet) => {
    return planet.name.toLowerCase() === planetName.toLowerCase();
  });
  if (planet) {
    let planetHTML = `
           <article class="main-img">
              <img
                src="${planet.images.planet}"
                alt=""
                class="main-img__planet ${planetName}-img"
              />
              <img 
              src= "${planet.images.geology}"
               alt="" 
               class="geology-img"></img>
            </article>
            <article class="main-info">
            <div>
            
            <h2 class="main-info__title">${planet.name}</h2>
            <p class="main-info__text">${planet.geology.content}</p>
            <p class="main-info__link">
              Source : <a href="${planet.geology.source}">Wikipedia</a>
            </p>
            </div>

              <ul class="main-info__list">
                <li class="overview"><span>01</span>Overview</li>
                <li class="structure"><span>02</span>Internal structure</li>
                <li class="geology bgc-${planetName}__active"><span>03</span>Surface geology</li>
              </ul>
            </article>
      `;
    mainContent.innerHTML = "";
    mainContent.insertAdjacentHTML("beforeend", planetHTML);
  }
  window.addEventListener("resize", updateContentBasedOnWidth);
}

async function renderPlanetDetails(planetName) {
  const planetDetails = document.querySelector(".footer-details");
  const planetsData = await dataFromJson();
  const planet = planetsData.find((planet) => {
    return planet.name.toLowerCase() === planetName.toLowerCase();
  });
  if (planet) {
    let detailsHTML = `
    <li class="footer-details__card">
    <h4>rotation time</h4>
    <p>${planet.rotation}</p>
  </li>
  <li class="footer-details__card">
    <h4>revolution time</h4>
    <p>${planet.revolution}</p>
  </li>
  <li class="footer-details__card">
    <h4>radius</h4>
    <p>${planet.radius}</p>
  </li>
  <li class="footer-details__card">
    <h4>average temp</h4>
    <p>${planet.temperature}</p>
  </li>
    `;
    planetDetails.insertAdjacentHTML("beforeend", detailsHTML);
  }
}
function updateContentBasedOnWidth() {
  const structure = document.querySelector(".structure");
  const geology = document.querySelector(".geology");
  const viewportWidth = window.innerWidth;

  if (viewportWidth < 500) {
    structure.innerHTML = "structure";
    geology.innerHTML = "geology";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mainContent.addEventListener("click", (e) => {
    if (e.target.classList.contains("overview")) {
      console.log("overview");
      renderOverview(planetToPass);
    } else if (e.target.classList.contains("structure")) {
      console.log("structure");
      renderStructure(planetToPass);
    } else if (e.target.classList.contains("geology")) {
      console.log("geology");
      renderGeology(planetToPass);
    }
  });
});

const upperline = document.querySelector(".upperline");

function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      console.log(1);
      // upperline.style.backgroundColor = '$uranus';
      renderOverview("mercury");
      renderPlanetDetails("mercury");
      break;
    case "/venus.html":
      console.log(2);
      renderOverview("venus");
      renderPlanetDetails("venus");
      break;
    case "/earth.html":
      console.log(3);
      renderOverview("earth");
      renderPlanetDetails("earth");
      break;
    case "/mars.html":
      console.log(4);
      renderOverview("mars");
      renderPlanetDetails("mars");
      break;
    case "/jupiter.html":
      console.log(5);
      renderOverview("jupiter");
      renderPlanetDetails("jupiter");
      break;
    case "/saturn.html":
      console.log(6);
      renderOverview("saturn");
      renderPlanetDetails("saturn");
      break;
    case "/uranus.html":
      console.log(7);
      renderOverview("uranus");
      renderPlanetDetails("uranus");
      break;
    case "/neptune.html":
      console.log(8);
      renderOverview("neptune");
      renderPlanetDetails("neptune");
      break;
  }
}
init();