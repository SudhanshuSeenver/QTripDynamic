
import config from "../conf/index.js";
let adventures;
//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // console.log(search)
  const param =  new URLSearchParams(search) 
  return param.get('city')
  
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // console.log(config)
  try{
  const response = await fetch(`${config.backendEndpoint}/adventures/?city=${city}`)
  const data = await response.json()
  // console.log(data)
 adventures = data
  return data
  }
  catch(err){
    return null
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const data = document.getElementById('data')
  data.innerhtml=``
  adventures.forEach(element => {
  const {id , name, costPerHead, currency, image, duration, category} = element
  // console.log(image)
  
  const card = document.createElement('div')
  card.setAttribute("class", `col-6 col-lg-3 mb-4 ${category}-cat`)

  card.innerHTML=`
  <a href="detail/?adventure=${id}" class="position-relative" id=${id}>
      <div class="category-banner" >${category}</div>
      <div class="activity-card" >
          
          <img src=${image} alt=${name}>
          <div class="d-flex flex-column w-100 p-2 px-3 "><div class="d-flex justify-content-between mb-2">
              <p class="m-0  fw-bold">${name}</p>
              <p class="m-0">&#8377 ${costPerHead}</p>
          </div>
          <div class="d-flex justify-content-between ">
              <p class="m-0  fw-bold">Duration</p>
              <p class="m-0">${duration} hrs</p>
          </div></div>
      </div>
  </a>
`
 data.appendChild(card) 
  
})


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(elm => elm.duration > low && elm.duration <= high)
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  if(categoryList){
  // console.log(list.filter(elem => categoryList.includes(elem.category)))
  return list.filter(elem => categoryList.includes(elem.category))
}
else {
  return list
}
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.category.length !== 0 && filters.duration.length === 0 ){
  return  filterByCategory(list, filters.category) 
  }
  else if(filters.category.length === 0 && filters.duration.length !== 0 ){
    
    return filterByDuration(list, ...filters.duration.split(" ")[0].split("-"))

  }
  else if(filters.category.length !== 0 && filters.duration.length !== 0 ){
    const filterList = filterByDuration(filterByCategory(list, filters.category), ...filters.duration.split(" ")[0].split("-"))
   
    return filterList

  }
  else
  return list

  // Place holder for functionality to work in the Stubs
  
}


//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  // console.log(filters)
  localStorage.setItem('filters', JSON.stringify(filters));
  // console.log(localStorage.getItem('filters'))
  // console.log(JSON.parse(localStorage.getItem('filters')))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // console.log(localStorage.length)
  // console.log(JSON.parse(localStorage.getItem('filters')).category)
  return localStorage.length !== 0 ? JSON.parse(localStorage.getItem('filters')):  { duration: "", category: [] }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryList = document.getElementById('category-list')
  filters.category.forEach(cat => {
    const pill = document.createElement("div")
    pill.setAttribute("class", "category-filter")
    pill.textContent = `${cat}`
    
    const closebtn = document.createElement("div")
    
    
    closebtn.setAttribute("class", "close-btn")
    closebtn.onclick=function(event){
      // console.log(event)
      const pillId = event.target.id
      document.getElementById(pillId).parentElement.remove()
      filters.category = filters.category.filter(elm => elm != pillId)
      const activityCard = document.querySelectorAll(`.${pillId}-cat`)
      activityCard.forEach(node => node.remove())
      saveFiltersToLocalStorage(filters)
      // console.log(filters.category)
      if(filters.category.length === 0)
        addAdventureToDOM(filterFunction(adventures, filters))
        
      // console.log(filters)
    }
    closebtn.setAttribute("id", cat)
    closebtn.innerHTML=`&#10005`
    pill.appendChild(closebtn)
    categoryList.appendChild(pill)
  })
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  
};
