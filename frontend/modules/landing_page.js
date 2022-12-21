import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  // console.log("from init()")
  // console.log(`${config.backendEndpoint}/cities`)
  
  let cities = await fetchCities()
  // console.log(cities)
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
    try{  
    const cities = await fetch(`${config.backendEndpoint}/cities`)
    const data = await cities.json()
    return  data
  }
  catch(err){
    return null
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const data = document.getElementById("data")
  const link = `pages/adventures/?city=${id}`
  const card  = document.createElement('div')

  
  card.setAttribute("class", "col-12 col-md-6 col-lg-3 mb-4")
  // card.classList.add('tile')

  card.innerHTML=`
  <a href="pages/adventures/?city=${id}" id=${id}>
    <div class="tile">
      <img  src=${image} alt=${city}>
  
      <div class="tile-text">
        <h4>${city}</h4>
        <p>${description}</p>
      </div>
    </div>
  </a>`

data.appendChild(card)

}

export { init, fetchCities, addCityToDOM };
