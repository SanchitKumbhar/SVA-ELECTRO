// simulated code : 

document.addEventListener('DOMContentLoaded', () => {
  const productContentDiv = document.getElementById('product-content');
  const storedProduct = localStorage.getItem('selectedProduct');

  if (!storedProduct) {
    productContentDiv.innerHTML = "<p>No product selected.</p>";
    return;
  }

  const product = JSON.parse(storedProduct);

  const productHTML = `
    <div class="product-container">
      <img src="${product.image}" alt="${product.title}">
      <div class="product-details">
        <h2>${product.title}</h2>
        <p class="price">Contact for Pricing</p>
        <p>${product.description}</p>
      </div>
    </div>
    <div class="appointment-section">
      <form class="appointment-form">
        <h3>Book Appointment</h3>
        <label for="name">Name:</label>
        <input type="text" id="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" required>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" required>
        <label for="message">Message:</label>
        <textarea id="message" rows="4" placeholder="I want to order ${product.title}..."></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  `;

  productContentDiv.innerHTML = productHTML;
});



// // getting form server api code

// document.addEventListener('DOMContentLoaded', async () => {
//   const productContentDiv = document.getElementById('product-content');
//   const productId = localStorage.getItem('selectedProductId');

//   if (!productId) {
//     productContentDiv.innerHTML = "<p>No product selected.</p>";
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:8000/api/products/`);
//     const products = await response.json();
//     const product = products.find(p => p.id == productId);

//     if (!product) {
//       productContentDiv.innerHTML = "<p>Product not found.</p>";
//       return;
//     }

//     const productHTML = `
//       <div class="product-container">
//         <img src="http://localhost:8000${product.productimg}" alt="${product.productname}">
//         <div class="product-details">
//           <h2>${product.productname}</h2>
//           <p class="price">₹${product.cost}</p>
//           <p>${product.description}</p>
//           <ul>
//             <li>Category: ${product.productcategory}</li>
//             <li>In Stock: ${product.stock}</li>
//             <li>Launch Date: ${product.launch}</li>
//           </ul>
//         </div>
//       </div>
//       <div class="appointment-section">
//         <form class="appointment-form">
//           <h3>Book Appointment</h3>
//           <label for="name">Name:</label>
//           <input type="text" id="name" required>
//           <label for="email">Email:</label>
//           <input type="email" id="email" required>
//           <label for="phone">Phone:</label>
//           <input type="tel" id="phone" required>
//           <label for="message">Message:</label>
//           <textarea id="message" rows="4" placeholder="I want to order ${product.productname}..."></textarea>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     `;

//     productContentDiv.innerHTML = productHTML;

//   } catch (error) {
//     console.error('Error loading product:', error);
//     productContentDiv.innerHTML = "<p>Error loading product.</p>";
//   }
// });
