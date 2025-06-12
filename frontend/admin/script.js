// ====== Auth Token and Product Container ======
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5NjYxNTI2LCJpYXQiOjE3NDk2NTc5MjYsImp0aSI6ImVmNjQ2NDE2OWU2YzRiNDA5NWI5ZmE2ZjZlYTUwYWZmIiwidXNlcl9pZCI6MjR9._b6poc1EaNUie1DNm1y72uhKjtaYyzFBM_5PYwtO9mM";
const productContainer = document.getElementById("products-grid");


// ====== Helper Functions ======
function getCategoryName(id) {
  const categories = {
    "1": "Electric Buses",
    "2": "Charging Equipment",
    "3": "Spare Parts",
    "4": "Accessories"
  };
  return categories[id] || "Unknown";
}



function renderProductCard(product) {
  return `
    <div class="product-card">
      <div class="product-image">
        <img src="https://sanchitkumbhar.pythonanywhere.com${product.productimg}" alt="${product.productname}">
      </div>
      <div class="product-details">
        <h3>${product.productname}</h3>
        <p class="product-id">ID: PRD-${String(product.id).padStart(3, '0')}</p>
        <p class="product-category">Category: ${getCategoryName(product.productcategory)}</p>
        <p class="product-price">$${product.cost.toLocaleString()}</p>
        <p class="product-stock">In Stock: ${product.stock} unit${product.stock > 1 ? 's' : ''}</p>
        <div class="product-features">
          <p>Description:</p>
          <ul>
            <li>${product.description}</li>
            <li>Launch Date: ${product.launch}</li>
          </ul>
        </div>
        <div class="product-actions">
          <button class="btn-primary edit-product" data-id="PRD-${product.id}">Edit</button>
          <button class="btn-secondary">View Details</button>
        </div>
      </div>
    </div>
  `;
}



async function loadProducts() {
  try {
    const response = await fetch("https://sanchitkumbhar.pythonanywhere.com/products/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();
    productContainer.innerHTML = products.map(renderProductCard).join("");
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    if (productContainer) productContainer.innerHTML = "<p style='color:red;'>Failed to load products. Please try again later.</p>";
  }
}



// ====== DOM Content Loaded ======
document.addEventListener("DOMContentLoaded", function () {
  loadProducts();

  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');
  navItems.forEach(item => {
    item.addEventListener('click', function () {
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
      const pageId = this.getAttribute('data-page');
      pages.forEach(page => {
        page.classList.toggle('active', page.id === pageId);
      });
    });
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  menuToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !e.target.closest('.sidebar') && !e.target.closest('.menu-toggle')) {
      sidebar.classList.remove('active');
    }
  });

  const orderSearch = document.getElementById('order-search');
  const statusSelect = document.getElementById('status-select');
  const ordersTable = document.getElementById('orders-table');
  if (orderSearch && statusSelect && ordersTable) {
    orderSearch.addEventListener('input', filterOrders);
    statusSelect.addEventListener('change', filterOrders);
    function filterOrders() {
      const searchValue = orderSearch.value.toLowerCase();
      const statusValue = statusSelect.value;
      const rows = ordersTable.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const [orderId, customerName, , , status] = Array.from(row.cells).map(cell => cell.textContent.toLowerCase());
        const matchesSearch = orderId.includes(searchValue) || customerName.includes(searchValue);
        const matchesStatus = statusValue === 'all' || status.includes(statusValue);
        row.style.display = matchesSearch && matchesStatus ? '' : 'none';
      });
    }
  }

  const productSearch = document.getElementById('product-search');
  const categorySelect = document.getElementById('category-select');
  const priceRange = document.getElementById('price-range');
  if (productSearch && categorySelect && priceRange && productContainer) {
    productSearch.addEventListener('input', filterProducts);
    categorySelect.addEventListener('change', filterProducts);
    priceRange.addEventListener('change', filterProducts);
    function filterProducts() {
      const search = productSearch.value.toLowerCase();
      const category = categorySelect.value;
      const priceVal = priceRange.value;
      const cards = productContainer.querySelectorAll('.product-card');
      cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const cat = card.querySelector('.product-category').textContent.toLowerCase();
        const priceText = card.querySelector('.product-price').textContent;
        const price = parseFloat(priceText.replace(/[^0-9.]+/g, ''));
        let matchName = name.includes(search);
        let matchCat = category === 'all' || cat.includes(category.toLowerCase());
        let matchPrice = true;
        if (priceVal !== 'all') {
          const [min, max] = priceVal.split('-').map(val => val === '+' ? Infinity : parseFloat(val));
          matchPrice = price >= min && (max === Infinity || price <= max);
        }
        card.style.display = matchName && matchCat && matchPrice ? '' : 'none';
      });
    }
  }

  const productImage = document.getElementById('product-image');
  const imagePreview = document.getElementById('image-preview');
  const fileName = document.getElementById('file-name');
  if (productImage && imagePreview && fileName) {
    productImage.addEventListener('change', function () {
      const reader = new FileReader();
      reader.onload = e => imagePreview.src = e.target.result;
      reader.readAsDataURL(this.files[0]);
      fileName.textContent = this.files[0].name;
    });
  }

  const editModal = document.getElementById('edit-product-modal');
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-product')) {
      const card = e.target.closest('.product-card');
      const id = e.target.getAttribute('data-id');
      const name = card.querySelector('h3').textContent;
      const categoryText = card.querySelector('.product-category').textContent.split(': ')[1];
      const categoryMap = {
        "Electric Buses": "buses",
        "Charging Equipment": "chargers",
        "Spare Parts": "parts",
        "Accessories": "accessories"
      };
      document.getElementById('edit-product-category').value = categoryMap[categoryText] || '';

      const price = card.querySelector('.product-price').textContent.replace('$', '');
      const stock = card.querySelector('.product-stock').textContent.split(': ')[1].replace(' units', '');
      const features = Array.from(card.querySelectorAll('.product-features li')).map(li => li.textContent).join('\n');
      const imgSrc = card.querySelector('img').src;

      document.getElementById('edit-product-id').value = id;
      document.getElementById('edit-product-name').value = name;
      // document.getElementById('edit-product-category').value = category.toLowerCase();
      document.getElementById('edit-product-price').value = price;
      document.getElementById('edit-product-stock').value = stock;
      document.getElementById('edit-product-features').value = features;
      document.getElementById('edit-image-preview').src = imgSrc;
      document.getElementById('edit-file-name').textContent = 'Current image';

      editModal.style.display = 'block';
    }
  });

  document.querySelectorAll('.close-modal, .close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => editModal.style.display = 'none');
  });
  window.addEventListener('click', (e) => {
    if (e.target === editModal) editModal.style.display = 'none';
  });

  const editProductImage = document.getElementById('edit-product-image');
  const editImagePreview = document.getElementById('edit-image-preview');
  const editFileName = document.getElementById('edit-file-name');
  if (editProductImage && editImagePreview && editFileName) {
    editProductImage.addEventListener('change', function () {
      const reader = new FileReader();
      reader.onload = e => editImagePreview.src = e.target.result;
      reader.readAsDataURL(this.files[0]);
      editFileName.textContent = this.files[0].name;
    });
  }

  const addProductForm = document.getElementById('add-product-form');
  if (addProductForm) {
    addProductForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData();
      formData.append('productname', document.getElementById('product-name').value);
      formData.append('productcategory', document.getElementById('product-category').value);
      formData.append('cost', document.getElementById('product-price').value);
      formData.append('stock', document.getElementById('product-stock').value);
      formData.append('description', document.getElementById('product-features').value);
      formData.append('launch', new Date().toISOString().split('T')[0]);

      const fileInput = document.getElementById('product-image');
      if (fileInput.files.length > 0) {
        formData.append('productimg', fileInput.files[0]);
      }

      try {
        const response = await fetch('https://sanchitkumbhar.pythonanywhere.com/products/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('❌ Failed to add product:', response.status, errorData);
          alert('Failed to add product. Please try again.');
        } else {
          const data = await response.json();
          console.log('✅ Product added:', data);
          alert('Product added successfully!');
          this.reset();
          document.getElementById('image-preview').src = 'https://via.placeholder.com/300x200?text=Product+Image';
          document.getElementById('file-name').textContent = 'No file chosen';
          loadProducts();
        }
      } catch (error) {
        console.error('❌ Error adding product:', error);
        alert('Something went wrong while adding the product.');
      }
    });
  }

  const editProductForm = document.getElementById('edit-product-form');
  if (editProductForm) {
    editProductForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const id = document.getElementById('edit-product-id').value.replace('PRD-', '');
      const name = document.getElementById('edit-product-name').value;
      const category = document.getElementById('edit-product-category').value;
      const price = document.getElementById('edit-product-price').value;
      const stock = document.getElementById('edit-product-stock').value;
      const description = document.getElementById('edit-product-features').value;

      const fileInput = document.getElementById('edit-product-image');
      const submitBtn = editProductForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Saving...";

      const formData = new FormData();
      formData.append('productname', name);
      formData.append('productcategory', category);
      formData.append('cost', price);
      formData.append('stock', stock);
      formData.append('description', description);
      formData.append('launch', new Date().toISOString().split('T')[0]);

      if (fileInput.files.length > 0) {
        formData.append('productimg', fileInput.files[0]);
      }

      try {
        const response = await fetch(`https://sanchitkumbhar.pythonanywhere.com/products/${id}/`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        submitBtn.disabled = false;
        submitBtn.textContent = "Save Changes";

        if (!response.ok) {
          const error = await response.json();
          console.error('❌ Failed to update product:', error);
          alert(`Failed to update product:\n${JSON.stringify(error, null, 2)}`);
        } else {
          const updated = await response.json();
          console.log('✅ Product updated:', updated);
          alert('Product updated successfully!');
          editModal.style.display = 'none';
          loadProducts();
        }
      } catch (error) {
        console.error('❌ Network error:', error);
        alert('An error occurred. Please try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = "Save Changes";
      }
    });
  }
});
