import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
try{
  const response  = await fetch(`${config.backendEndpoint}/reservations`)
  const data = await response.json()
  return data
} 
 catch(e){
  // Place holder for functionality to work in the Stubs
  return null;
 }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
 if( reservations.length === 0)  {
  document.getElementById('reservation-table-parent').style.display = 'none'
  document.getElementById('no-reservation-banner').style.display = 'block'
}
else{
  document.getElementById('reservation-table-parent').style.display = 'block'
  document.getElementById('no-reservation-banner').style.display = 'none'
}
  
  reservations.forEach(elm => {
    const tableRow = document.createElement('tr')
    // tableRow.id = elm.id
    const date = new Date(elm.time)

    // console.log(date)
    const bookingDate = new Date(elm.date).toLocaleString('en-IN').split(',')[0]
    const dateLocale = date.toLocaleString('en-IN', {year: "numeric", month: "long", day:"numeric", hour12: true })
    const timeLocale = date.toLocaleTimeString('en-IN')
    // console.log(dateLocale, timeLocale)

    // console.log(date.toLocaleString('en-IN', {hour12: true }))

// console.log(config.backendEndpoint.split('80')[0])
    tableRow.innerHTML = `<td scope="col" class="fw-bolder">${elm.id}</td>
    <td scope="col">${elm.name}</td>
    <td scope="col">${elm.adventureName}</td>
    <td scope="col">${elm.person}</td>
    <td scope="col">${bookingDate}</td>
    <td scope="col">${elm.price}</td>
    <td scope="col">${dateLocale}, ${timeLocale}</td>
    <td id="${elm.id}" scope="col"><a href="../detail/?adventure=${elm.adventure}"><div class="reservation-visit-button">Visit Adventure</div></a></td>`
    document.getElementById('reservation-table').appendChild(tableRow)
    
    
  
  })
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
