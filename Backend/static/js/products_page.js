
// simulated code : 

const products = [
  {
    id: 1,
    productname: "Smart Buses",
    productcategory: "BUS",
    stock: 15,
    productimg: "evbus.jpg",
    cost: 35000,
    description: "Lightweight, compact, perfect for daily city commutes with zero emissions.",
    launch: "2025-01-10"
  },
  {
    id: 2,
    productname: "Electric Shuttle",
    productcategory: "SHU",
    stock: 10,
    productimg: "/frontend/img/evbus3.png",
    cost: 45000,
    description: "Comfortable and efficient for group travel and short city routes.",
    launch: "2025-02-15"
  },
  {
    id: 3,
    productname: "eScooters",
    productcategory: "SCO",
    stock: 50,
    productimg: "evscooter.jpg",
    cost: 1200,
    description: "Stylish and energy-efficient scooters ideal for daily urban mobility.",
    launch: "2025-03-05"
  },
  {
    id: 4,
    productname: "Cargo Vans",
    productcategory: "VAN",
    stock: 8,
    productimg: "evvan.jpg",
    cost: 28000,
    description: "Perfect for eco-friendly goods transportation within city limits.",
    launch: "2025-04-01"
  }
];

const productGrid = document.getElementById('productGrid');
const overlay = document.getElementById('overlay');
const form = document.getElementById('appointmentForm');

products.forEach(product => {
  const card = document.createElement('div');
  card.classList.add('product-card');

  card.innerHTML = `
    <img src="${product.productimg}" alt="${product.productname}" />
    <h3>${product.productname}</h3>
    <p>${product.description}</p>
    <p><strong>Category:</strong> ${product.productcategory}</p>
    <p><strong>Stock:</strong> ${product.stock}</p>
    <p><strong>Launch Date:</strong> ${product.launch}</p>
    <p><strong>Price:</strong> ₹${product.cost.toLocaleString()}</p>

    <!-- Book Appointment -->
    <button class="contact-btn" onclick='openForm(${JSON.stringify(product)})'>Book Appointment</button>

    <!-- View Product / More Info -->
    <button class="view-btn" onclick='viewProduct(${JSON.stringify(product)})'>View Product</button>
  `;

  productGrid.appendChild(card);
});

function openForm(product) {
  document.getElementById('productImage').value = product.productimg;
  document.getElementById('modelName').value = product.productname;
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
