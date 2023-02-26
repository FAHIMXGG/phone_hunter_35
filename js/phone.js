const  loadPhone = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    //display 10 phone
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
      phones =phones.slice(0,10);
      showAll.classList.remove('d-none')
    }
    else{
      showAll.classList.add('d-none')
    }
    

    //display no phone
    const noPhone = document.getElementById('not-found')
  if(phones.length === 0){
    noPhone.classList.remove('d-none');
  }
  else{
    noPhone.classList.add('d-none');
  }
  
    //display all
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-5">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Go somewhere</button>
        </div>
      </div>
        `;
        phonesContainer.appendChild(phoneDiv)
    });
    //stop loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) =>{
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
  //start loader
  processSearch(10);
})

//"enter" key handler 
document.getElementById('search-field').addEventListener('keypress', function(e){
  //console.log(e.key)
  if (e.key === 'Enter') {
    processSearch(10);
  }
})

const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader')
  if (isLoading) {
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }
}
/// not best way
document.getElementById('btn-show-all').addEventListener('click', function(){
  processSearch();
})

const loadPhoneDetails = async id =>{
  const url = `
  https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);

}
const displayPhoneDetails = phone =>{
  console.log(phone);
  const modalTitle = document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText = phone.name;
  const phoneDetails= document.getElementById('phone-details');
  phoneDetails.innerHTML = `
  <img src="${phone.image
  }" alt="">
  <p> Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date'}</p>
  <p>Storage: ${phone.mainFeatures.storage} </p>
  <p>chipSet: ${phone.mainFeatures.chipSet}</p>
  <p>displaySize: ${phone.mainFeatures.displaySize}</p>
  <p></p>
  <p> others: ${phone.others ? phone.others.Bluetooth : 'none'}</p>
  `
}

loadPhone('samsung');