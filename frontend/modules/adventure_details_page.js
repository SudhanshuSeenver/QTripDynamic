import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL 
  const adve_id = new URLSearchParams(search)
  // console.log(adve_id.get('adventure'))
  return adve_id.get('adventure') 
 

  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
  const detail = await fetch(`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`)
  const detail_json = await detail.json()
  // console.log(detail_json)
  return detail_json
  }
  // Place holder for functionality to work in the Stubs
  catch(e){
  return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.getElementById('adventure-name').textContent = adventure.name
  document.getElementById('adventure-subtitle').textContent = adventure.subtitle 
  document.getElementById('adventure-content').textContent = adventure.content
  
  const photoGallery = document.getElementById('photo-gallery')

  adventure.images.forEach(img => {
    const image = document.createElement('img')
    image.setAttribute('src', img)
    image.setAttribute('class', 'activity-card-image')

    const divImg = document.createElement('div')
    divImg.appendChild(image)

    photoGallery.appendChild(divImg)


  })





}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById("photo-gallery")
  photoGallery.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id="carousel-indicators1">
    
  </div>
  <div class="carousel-inner" id="adventure-images">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`

 const carouselImages = document.getElementById('adventure-images')
 const carouselIndicators = document.getElementById('carousel-indicators1')

images.forEach((img, ind) => {
    
    ///// buttons //////
    const attributes = {"type":"button", "data-bs-target":"#carouselExampleIndicators", "data-bs-slide-to":`${ind}`, "aria-label":`Slide ${ind+1}`}

    const button = document.createElement('button')
    Object.keys(attributes).forEach(attr => {
      button.setAttribute(attr, attributes[attr])
    })

    ///// images /////
    const image = document.createElement('img')
    image.setAttribute('src', img)
    image.setAttribute('class', 'activity-card-image ')

    const divImg = document.createElement('div')
    if(ind===0){
      divImg.setAttribute('class', 'carousel-item active w-100')
      button.setAttribute("class", "active")
      button.setAttribute("aria-current", "true")
    }
    else
      divImg.setAttribute('class', 'carousel-item w-100')
    divImg.appendChild(image)

    carouselImages.appendChild(divImg)
    carouselIndicators.appendChild(button)

  })

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  document.getElementById('reservation-panel-available').style.display = 'none'
  document.getElementById('reservation-panel-sold-out').style.display = 'none'
  if(adventure.available){
    
    document.getElementById('reservation-panel-available').style.display = 'block'
    document.getElementById('reservation-person-cost').textContent = adventure.costPerHead
  }
  else{
    
    document.getElementById('reservation-panel-sold-out').style.display = 'block'
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById('reservation-cost').textContent = Number(persons) * Number(adventure.costPerHead) 
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 const form  =  document.getElementById('myForm')
 form.addEventListener('submit', (e) => {
    e.preventDefault()

    const resDet = {
      name: form.elements["name"].value,
      date: form.elements["date"].value,
      person: form.elements["person"].value,
      adventure: adventure.id
    };

    (async () => {
      try{
    const res = await fetch(`${config.backendEndpoint}/reservations/new`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(resDet),
    })
    const result = await res.json()
    if(result.message)
    alert('Failed!')
    else{
     
    alert("Success!")
    
    conditionalRenderingOfReservationPanel(adventure);
     
  }
  }
  catch(e){
    alert("Failed!")
  }
    
  })();
  
    
 })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
adventure.reserved ? document.getElementById('reserved-banner').style.display = "block" : document.getElementById('reserved-banner').style.display = "none"

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
