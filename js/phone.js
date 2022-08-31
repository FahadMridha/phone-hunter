const loadPhones = async (searchText, dataLimits) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    phoneDisplay(data.data, dataLimits);
    console.log(data.data);
}
const phoneDisplay = (phones, dataLimits) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';
    // display 10 phone only------>
    const showAll = document.getElementById('show-all');
    if (dataLimits && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    } else {
        showAll.classList.add('d-none')
    }

    // no phone found
    const noPhone = document.getElementById('no-found-message')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')

    } else {
        noPhone.classList.add('d-none')
    }
    // display all phones------>
    phones.forEach(phone => {
        const {
            brand,
            phone_name,
            slug,
            image
        } = phone
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card"> 
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
         <h5 class="card-title">Phone Name:${phone_name}</h5>
         <h4>Brand:${brand}</h4>
            <p class="card-text"> About Phone:Its a very good phone</p>
            <button href="#" onclick="loadPhonesDetailes('${slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailesmodal">Phone Detail</button>
            
        </div>
     </div>`;
        phoneContainer.appendChild(phoneDiv)

    });
    // loader spinner end
    tooggleSpinner(false);
}
const processSearch = (dataLimits) => {
    tooggleSpinner(true);
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value
    loadPhones(searchText, dataLimits)
    // searchField.value = '';
}
document.getElementById('btn-search').addEventListener('click', function () {
    // loader spinner start
    processSearch(10);
})
//search input field event handler
document.getElementById('input-field').addEventListener('keypress', function (e) {
    // console.log(e.key)
    if (e.key === 'Enter') {
        processSearch(10);
    }
});
const tooggleSpinner = isLodding => {
    const loaderSection = document.getElementById('loader')
    if (isLodding) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    }
}
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
});
const loadPhonesDetailes = async (id) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    phoneDetailesDisplay(data.data)
}
const phoneDetailesDisplay = (phones) => {
    console.log(phones)
    const {
        name,
        brand,
        releaseDate,
        slug,
        image,
        mainFeatures
    } = phones

    const modalTitle = document.getElementById('phoneDetailesmodalLabel')
    modalTitle.innerText = name;
    const phoneDetailes = document.getElementById('phone-detailes')
    phoneDetailes.innerHTML = `
    <p> Release Date: ${releaseDate? releaseDate: 'no Release Date'}</p>
    <p> Features: ${mainFeatures? mainFeatures.storage: 'no Features added'}</p>
    <p> Sensore: ${mainFeatures? mainFeatures.sensors[0]: 'no Sensore added'}</p>
    `
}
loadPhones('apple')