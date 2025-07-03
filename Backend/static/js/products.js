// DOM Elements
const productGrid = document.getElementById('productGrid');
const productInfoContent = document.getElementById('productInfoContent');
const productInfoOverlay = document.getElementById('productInfoOverlay');
const closeProductInfoModal = document.getElementById('closeProductInfoModal');

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
    const accessToken = tokenData.access;

    // 2. Use the obtained accessToken in the subsequent fetch
    const response = await fetch('/api/products/', {
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
    return [];
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
              <button class="buy-now-btn" data-product-id="${product.id}">
                Buy Now
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
          <button class="buy-from-info" data-product-id="${product.id}">
            Buy Now
          </button>
        </div>
      `;
}

// Store products globally after loading
let allProducts = [];

async function loadProducts() {
  try {
    const products = await fetchProducts();
    allProducts = products;

    // Clear loading state
    productGrid.innerHTML = '';

    // Create product cards
    products.forEach(product => {
      productGrid.innerHTML += createProductCard(product);
    });

  } catch (error) {
    productGrid.innerHTML = '<div style="text-align: center; color: #ff6b6b;">Error loading products. Please try again later.</div>';
  }
}

// Event delegation for productGrid
productGrid.addEventListener('click', function (e) {
  // View More Info
  if (e.target.classList.contains('view-info-btn')) {
    const productId = e.target.getAttribute('data-product-id');
    const product = allProducts.find(p => String(p.id) === String(productId));
    if (product) {
      showProductInfo(product);
    }
  }
  // Buy Now
  if (e.target.classList.contains('buy-now-btn')) {
    const productId = e.target.getAttribute('data-product-id');
    // Implement your buy logic here
    alert(`Buy Now clicked for product ID: ${productId}`);
  }
});

// Buy from info modal button
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('buy-from-info')) {
    const productId = e.target.getAttribute('data-product-id');
    closeProductInfoModalFunc();
    setTimeout(() => alert(`Buy Now clicked for product ID: ${productId}`), 50);
  }
});

// Modal Functions
function showProductInfo(product) {
  productInfoContent.innerHTML = createProductInfoModal(product);
  productInfoOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductInfoModalFunc() {
  productInfoOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Event Listeners
closeProductInfoModal.addEventListener('click', closeProductInfoModalFunc);

// Close modals when clicking overlay
productInfoOverlay.addEventListener('click', function (e) {
  if (e.target === productInfoOverlay) {
    closeProductInfoModalFunc();
  }
});

// Close modals with Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (productInfoOverlay.classList.contains('active')) {
      closeProductInfoModalFunc();
    }
  }
});

// Smooth scrolling for CTA button
const ctaBtn = document.querySelector('.cta-button');
if (ctaBtn) {
  ctaBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector('#productGrid');
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
  loadProducts();
});

// Scroll animations
function animateOnScroll() {
  const cards = document.querySelectorAll('.product-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach(card => observer.observe(card));
}

// Run animation setup after products load
setTimeout(animateOnScroll, 1000);