    const inp = document.querySelector('#inp')
    let cloneData = []

function toggleMenu() {
    const dropdown = document.getElementById('dropdown');
    let icon = document.querySelector('.icon')
    dropdown.classList.toggle('hidden');
    icon.classList.toggle('rotat')
}
///////////////////////////////
function toggleDropdown(id) {
    const menu = document.getElementById(id);
    menu.classList.toggle('hidden');
}
///////////////////////////
document.getElementById('sidebar-toggle').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
  });
  //////////////////////
  const div = document.querySelectorAll('#more>div')
  const p = document.querySelectorAll('#more')
  p.forEach(val => {
    val.addEventListener('click', () => {
      div.forEach(item => {
        item.classList.toggle('display');
      });
    });
  });
  //////////////////////////
  document.querySelectorAll(".dropdown-btn").forEach(button => {
    button.addEventListener("click", function () {
      const menu = this.nextElementSibling;
      const icon = this.querySelector(".icon");
      
      document.querySelectorAll(".dropdown-menu").forEach(m => {
        if (m !== menu) m.classList.add("hidden");
      });

      document.querySelectorAll(".icon").forEach(i => {
        if (i !== icon) i.classList.remove("rotate-180");
      });

      menu.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-menu").forEach(m => m.classList.add("hidden"));
      document.querySelectorAll(".icon").forEach(i => i.classList.remove("rotate-180"));
    }
  });
  //////////////////////////
  let data;  // Declare a global variable

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(fetchedData => {
    data = fetchedData; 
    cloneData = data
    console.log(cloneData);
    const container = document.querySelector('.grid');
    data.forEach((product, index) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product-card', 'p-4', 'rounded-lg', 'bg-white','shop' );
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="w-full h-32 object-contain">
        <h3 class="text-sm font-semibold mt-2">${product.title}</h3>
        <p class="text-lg font-bold mt-2">$${product.price}</p>
        <button class="mt-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded" onclick="showDetails(${index})">Show More</button>
      `;
      container.appendChild(productDiv);
    });
  })
  .catch(error => console.error('Error fetching data:', error));

function showDetails(index) {
    let pop = document.querySelector('#popup')
    pop.classList.add('show');
    pop.style.display = 'block';
  const product = data[index];  // Access the global data variable
  document.getElementById('popup-title').innerText = product.title;
  document.getElementById('popup-category').innerText = product.category ;
  document.getElementById('popup-price').innerText = product.price + '$';
  document.querySelector('.rate').innerText = product.rating.rate;
  document.querySelector('.count').innerText = product.rating.count  + ' rate ';
  document.getElementById('popup-description').innerText = product.description;
  document.getElementById('popup-image').src = product.image;
  document.getElementById('popup').classList.remove('display');
   
}

    function closePopup() {
        const popup = document.getElementById('popup');
        popup.classList.remove('show');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }


/////////SEARCH FOR product//////////
inp.addEventListener('keyup',()=>{
    const container = document.querySelector('.grid');
    let temp = inp.value.trim()
    container.innerHTML = ''
    cloneData.forEach((product, index) => {
    if(
        product.title.indexOf(temp) >= 0
    ){
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card', 'p-4', 'rounded-lg', 'bg-white','shop' );
        productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="w-full h-32 object-contain">
          <h3 class="text-sm font-semibold mt-2">${product.title}</h3>
          <p class="text-lg font-bold mt-2">$${product.price}</p>
          <button class="mt-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded" onclick="showDetails(${index})">Show More</button>
        `;
        container.appendChild(productDiv);
    }
    });
})



  


