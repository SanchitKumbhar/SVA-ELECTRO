
// simulated code : 

const products = [
    {
      image: 'evbus.jpg',
      title: 'Smart Buses',
      description: 'Lightweight, compact, perfect for daily city commutes with zero emissions.'
    },
    {
      image: '/frontend/img/evbus3.png',
      title: 'Electric Shuttle',
      description: 'Comfortable and efficient for group travel and short city routes.'
    },
    {
      image: 'evscooter.jpg',
      title: 'eScooters',
      description: 'Stylish and energy-efficient scooters ideal for daily urban mobility.'
    },
    {
      image: 'evvan.jpg',
      title: 'Cargo Vans',
      description: 'Perfect for eco-friendly goods transportation within city limits.'
    }
  ];

  const productGrid = document.getElementById('productGrid');
  const overlay = document.getElementById('overlay');
  const form = document.getElementById('appointmentForm');

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>${product.description}</p>

      <!-- Book Appointment -->
      <button class="contact-btn" onclick='openForm(${JSON.stringify(product)})'>Book Appointment</button>

      <!-- View Product / More Info -->
      <button class="view-btn" onclick='viewProduct(${JSON.stringify(product)})'>View Product</button>
    `;

    productGrid.appendChild(card);
  });

  function openForm(product) {
    document.getElementById('productImage').value = product.image;
    document.getElementById('modelName').value = product.title;
    document.getElementById('description').value = product.description;

    overlay.style.display = 'flex';
  }

  function viewProduct(product) {
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = 'viewProduct.html';
}


  function closeForm() {
    overlay.style.display = 'none';
  }






// Fetch products from the API and display them

// document.addEventListener('DOMContentLoaded', async () => {
//   const productGrid = document.getElementById('productGrid');

//   try {
//     const response = await fetch('http://localhost:8000/api/products/');
//     const products = await response.json();

//     products.forEach(product => {
//       const card = document.createElement('div');
//       card.classList.add('product-card');

//       card.innerHTML = `
//         <img src="http://localhost:8000${product.productimg}" alt="${product.productname}" />
//         <h3>${product.productname}</h3>
//         <p>${product.description}</p>
//         <button class="view-btn" onclick="viewProduct(${product.id})">View Product</button>
//       `;

//       productGrid.appendChild(card);
//     });

//   } catch (error) {
//     console.error('Error fetching products:', error);
//     productGrid.innerHTML = "<p>Failed to load products.</p>";
//   }
// });

// function viewProduct(productId) {
//   localStorage.setItem('selectedProductId', productId);
//   window.location.href = 'viewProduct.html';
// }
