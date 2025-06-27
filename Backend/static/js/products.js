// DOM Elements
const productGrid = document.getElementById('productGrid');
const appointmentOverlay = document.getElementById('appointmentOverlay');
const productInfoOverlay = document.getElementById('productInfoOverlay');
const closeAppointmentModal = document.getElementById('closeAppointmentModal');
const closeProductInfoModal = document.getElementById('closeProductInfoModal');
const appointmentForm = document.getElementById('appointmentForm');
const productSelect = document.getElementById('productInterest');
const productInfoContent = document.getElementById('productInfoContent');

// Utility Functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getCategoryName(categoryId) {
  const categories = {
    '1': 'Electronics',
    '2': 'Automotive',
    '3': 'Home & Garden',
    '4': 'Technology',
    '5': 'Fashion'
  };
  return categories[categoryId] || 'General';
}

async function fetchProducts() {
  try {
    // 1. Await the fetch for the access token
    const tokenResponse = await fetch('/get-jwt');
    if (!tokenResponse.ok) {
      throw new Error(`Failed to get JWT! Status: ${tokenResponse.status}`);
    }
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access; // Now accessToken will have the value

    // 2. Use the obtained accessToken in the subsequent fetch
    const response = await fetch('http://127.0.0.1:8000/api/products/', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Product List:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return []; // Return empty array on error to prevent further issues
  }
}

// Create product card HTML
function createProductCard(product) {
  return `
        <div class="product-card" data-product-id="${product.id}">
          <div class="product-image" style="background-image: url('https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=600')">
            <span class="stock-badge">${product.stock} in stock</span>
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.productname}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${formatCurrency(product.cost)}</div>
            <div class="product-launch">Launch: ${formatDate(product.launch)}</div>
            <div class="product-actions">
              <button class="view-info-btn" data-product-id="${product.id}">
                View More Info
              </button>
              <button class="book-appointment" data-product-id="${product.id}">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      `;
}
// Create product info modal content
function createProductInfoModal(product) {
  return `
        <div class="product-info-header">
          <div class="product-info-image" style="background-image: url('https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=600')"></div>
          <div class="product-info-details">
            <h3>${product.productname}</h3>
            <div class="product-info-price">${formatCurrency(product.cost)}</div>
            <span class="product-info-stock">${product.stock} in stock</span>
          </div>
        </div>
        
        <div class="product-info-content">
          <div class="info-section">
            <h4>Description</h4>
            <p>${product.description}</p>
          </div>
          
          <div class="product-specs">
            <div class="spec-item">
              <div class="spec-label">Product ID</div>
              <div class="spec-value">#${product.id}</div>
            </div>
            <div class="spec-item">
              <div class="spec-label">Category</div>
              <div class="spec-value">${getCategoryName(product.productcategory)}</div>
            </div>
            <div class="spec-item">
              <div class="spec-label">Launch Date</div>
              <div class="spec-value">${formatDate(product.launch)}</div>
            </div>
            <div class="spec-item">
              <div class="spec-label">Availability</div>
              <div class="spec-value">${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
            </div>
          </div>
          
          <div class="info-section">
            <h4>Features</h4>
            <p>This premium product offers cutting-edge technology and innovative design. Perfect for modern users who demand quality and performance.</p>
          </div>
        </div>
        
        <div class="product-info-actions">
          <button class="book-from-info" data-product-id="${product.id}">
            Book Appointment
          </button>
        </div>
      `;
}

// Store products globally after loading
let allProducts = [];

async function loadProducts() {
  try {
    const products = await fetchProducts();
    allProducts = products; // Store globally for event delegation

    // Clear loading state
    productGrid.innerHTML = '';

    // Populate product select dropdown
    productSelect.innerHTML = '<option value="">Select a product</option>';

    // Create product cards
    products.forEach(product => {
      productGrid.innerHTML += createProductCard(product);

      // Add to select dropdown
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.productname;
      productSelect.appendChild(option);
    });

    // No need to call addProductEventListeners anymore!
  } catch (error) {
    productGrid.innerHTML = '<div style="text-align: center; color: #ff6b6b;">Error loading products. Please try again later.</div>';
  }
}

// Event delegation for productGrid
productGrid.addEventListener('click', function (e) {
  // View More Info
  console.log('e.target:', e.target);
  
  if (e.target.classList.contains('view-info-btn')) {
    console.log("2");
    
    const productId = (e.target.getAttribute('data-product-id'));
    console.log(productId);
    console.log(allProducts);
    
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      console.log('Product Info:', product);
      
      showProductInfo(product);
    }
  }
  // Book Appointment
  if (e.target.classList.contains('book-appointment')) {
    const productId = e.target.getAttribute('data-product-id');
    openAppointmentModal(productId);
  }
});

// Book from info modal button (keep this as is)
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('book-from-info')) {
    const productId = e.target.getAttribute('data-product-id');
    closeProductInfoModalFunc();
    setTimeout(() => openAppointmentModal(productId), 50);
  }
});

// Modal Functions
function showProductInfo(product) {
  productInfoContent.innerHTML = createProductInfoModal(product);
  productInfoOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openAppointmentModal(productId = '') {
  appointmentOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (productId) {
    productSelect.value = productId;
  }
}

function closeAppointmentModalFunc() {
  appointmentOverlay.classList.remove('active');
  document.body.style.overflow = '';
  appointmentForm.reset();
  clearErrors();
}

function closeProductInfoModalFunc() {
  productInfoOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Form Validation
function validateField(field, errorElement, validator) {
  const isValid = validator(field.value);
  if (!isValid) {
    field.style.borderColor = '#ff6b6b';
    errorElement.style.display = 'block';
    return false;
  } else {
    field.style.borderColor = '#1DB954';
    errorElement.style.display = 'none';
    return true;
  }
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  const inputElements = document.querySelectorAll('input, select, textarea');

  errorElements.forEach(error => error.style.display = 'none');
  inputElements.forEach(input => input.style.borderColor = '#191414');
}

// product.js

// function validateForm() {
//     // Only select elements that are actually present in your HTML
//     const productInterest = document.getElementById('productInterest');
//     const modelName = document.getElementById('modelName');
//     const description = document.getElementById('description');
//     const qty = document.getElementById('qty');
//     const fromDate = document.getElementById('fromDate');
//     const toDate = document.getElementById('toDate'); // Corrected ID for 'To Date'
//     const location = document.getElementById('location');
//     const purpose = document.getElementById('purpose');

//     const productError = document.getElementById('productError');
//     const modelNameError = document.getElementById('modelNameError');
//     const descriptionError = document.getElementById('descriptionError');
//     const qtyError = document.getElementById('qtyError');
//     const fromDateError = document.getElementById('fromDateError');
//     const toDateError = document.getElementById('toDateError'); // Corrected ID for 'To Date' error
//     const locationError = document.getElementById('locationError');
//     const purposeError = document.getElementById('purposeError');

//     let isValid = true;

//     // Validate product selection
//     isValid = validateField(productInterest, productError, (value) => value !== '') && isValid;

//     // Validate Model Name
//     isValid = validateField(modelName, modelNameError, (value) => value.trim().length >= 1) && isValid;

//     // Validate Description
//     isValid = validateField(description, descriptionError, (value) => value.trim().length >= 1) && isValid;

//     // Validate Quantity
//     isValid = validateField(qty, qtyError, (value) => value > 0 && value !== '') && isValid; // Quantity must be a positive number

//     // Validate From Date
//     isValid = validateField(fromDate, fromDateError, (value) => {
//         const selectedDate = new Date(value);
//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison
//         return selectedDate >= today;
//     }) && isValid;

//     // Validate To Date (assuming toDate is not before fromDate and is future/current)
//     isValid = validateField(toDate, toDateError, (value) => {
//         const selectedToDate = new Date(value);
//         const selectedFromDate = new Date(fromDate.value); // Get the value of fromDate for comparison

//         selectedToDate.setHours(0, 0, 0, 0); // Reset time
//         selectedFromDate.setHours(0, 0, 0, 0); // Reset time

//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         // To date must be today or in the future, AND must be greater than or equal to fromDate
//         return selectedToDate >= today && selectedToDate >= selectedFromDate;
//     }) && isValid;

//     // Validate Location
//     isValid = validateField(location, locationError, (value) => value.trim().length >= 1) && isValid;

//     // Validate Purpose
//     isValid = validateField(purpose, purposeError, (value) => value.trim().length >= 1) && isValid;

//     return isValid;
// }

// Event Listeners
closeAppointmentModal.addEventListener('click', closeAppointmentModalFunc);
closeProductInfoModal.addEventListener('click', closeProductInfoModalFunc);

// Close modals when clicking overlay
appointmentOverlay.addEventListener('click', function (e) {
  if (e.target === appointmentOverlay) {
    closeAppointmentModalFunc();
  }
});

productInfoOverlay.addEventListener('click', function (e) {
  if (e.target === productInfoOverlay) {
    closeProductInfoModalFunc();
  }
});

// Close modals with Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (appointmentOverlay.classList.contains('active')) {
      closeAppointmentModalFunc();
    }
    if (productInfoOverlay.classList.contains('active')) {
      closeProductInfoModalFunc();
    }
  }
});

// Form submission
appointmentForm.addEventListener('submit', async function (e) { // Make the event listener async
  e.preventDefault(); // Prevent default form submission

  // --- START FIX: Await the token fetch ---
  let accessToken = '';
  try {
    const tokenResponse = await fetch('/get-jwt'); // Await the JWT fetch
    if (!tokenResponse.ok) {
      throw new Error(`Failed to get JWT! Status: ${tokenResponse.status}`);
    }
    const tokenData = await tokenResponse.json();
    accessToken = tokenData.access; // Assign accessToken after it's fetched
  } catch (tokenError) {
    console.error('Error fetching access token:', tokenError);
    alert('Failed to get authorization token. Please try again.');
    // It's crucial to stop execution here if the token can't be obtained
    return;
  }
  // --- END FIX ---

  // if (validateForm()) { // Keep your validation if you have it
  const submitButton = document.querySelector('.submit-button'); // Select the button
  submitButton.disabled = true;
  submitButton.textContent = 'Booking...';

  try {
    // Get form data and convert to a plain object
    const formData = new FormData(appointmentForm);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    console.log(data);

    // Make the fetch POST request
    const response = await fetch('http://127.0.0.1:8000/api/appointment/', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken, // accessToken is now guaranteed to be available
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      // Attempt to read error message from server response
      const errorData = await response.json();
      throw new Error(errorData.detail || `Server error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Success:', result);
    alert('Appointment booked successfully! We will contact you soon.');
    closeAppointmentModalFunc();

  } catch (error) {
    console.error('Error:', error);
    alert(`Failed to book appointment: ${error.message || 'Please check your input and try again.'}`);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Book Appointment';
  }
  // }
});

// Smooth scrolling for CTA button
document.querySelector('.cta-button').addEventListener('click', function (e) {
  e.preventDefault();
  const target = document.querySelector('#productGrid');
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// Initialize
document.addEventListener('DOMContentLoaded', function () {
  loadProducts();

  // Set minimum date for appointment to today
  // const today = new Date().toISOString().split('T')[0];
  // document.getElementById('appointmentDate').setAttribute('min', today);
});

// Scroll animations
function animateOnScroll() {
  const cards = document.querySelectorAll('.product-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach(card => observer.observe(card));
}

// Run animation setup after products load
// A slight delay ensures elements are in place after DOMContentLoaded and product loading
setTimeout(animateOnScroll, 1000);