        // // Product data
        
        // // making request for products data
        // async function productRequest() {
        //     try {
        //         const response = await fetch("https://sanchitkumbhar.pythonanywhere.com/products/", {
        //             method: "GET",
        //             headers: {
        //                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5MjI4ODkzLCJpYXQiOjE3NDkyMjUyOTMsImp0aSI6Ijg1NDVlOWViYTQ0YjQ2ZjJhMmNmMDZhOGY5Y2Y1ZjNhIiwidXNlcl9pZCI6MjR9.eQZNvH6ZLCD89kOJCgjkD341EvFDl7eeGZ57Bb0Q7PQ",  // Replace with your actual token
        //                 "Content-Type": "application/json"
        //             }
        //         });
        
        //         const data = await response.json();  // Await here!
        //         console.log(data);
        
        //     } catch (error) {
        //         console.log("Error fetching products:", error);
        //     }
        // }
        
        // productRequest()




    
        const products = [
            {
                icon: 'fas fa-car',
                title: 'Brake System Parts',
                description: 'Complete brake system components including pads, discs, calipers, and brake fluid.',
                price: '$299',
                features: [
                    'OEM Quality Parts',
                    'All Vehicle Models',
                    'Professional Installation',
                    'Warranty Included',
                    '24/7 Emergency Service'
                ]
            },
            {
                icon: 'fas fa-cog',
                title: 'Engine Components',
                description: 'High-performance engine parts including pistons, gaskets, filters, and timing belts.',
                price: '$899',
                features: [
                    'Premium Materials',
                    'Extended Warranty',
                    'Expert Installation',
                    'Performance Testing',
                    'Free Diagnostics'
                ]
            },
            {
                icon: 'fas fa-wrench',
                title: 'Suspension System',
                description: 'Complete suspension parts including shocks, struts, springs, and bushings.',
                price: '$699',
                features: [
                    'Improved Handling',
                    'Ride Comfort',
                    'OE Specifications',
                    'Professional Fitting',
                    'Road Test Included'
                ]
            },
            {
                icon: 'fas fa-bolt',
                title: 'Electrical Systems',
                description: 'Automotive electrical components including batteries, alternators, and wiring harnesses.',
                price: '$399',
                features: [
                    'Latest Technology',
                    'Computer Diagnostics',
                    'Quality Assurance',
                    'Expert Technicians',
                    'System Integration'
                ]
            },
            {
                icon: 'fas fa-tachometer-alt',
                title: 'Transmission Parts',
                description: 'Transmission components and fluids for manual and automatic transmissions.',
                price: '$1,299',
                features: [
                    'Smooth Operation',
                    'Fluid Change Service',
                    'Seal Replacement',
                    'Performance Upgrade',
                    'Extended Service Life'
                ]
            },
            {
                icon: 'fas fa-tools',
                title: 'Exhaust Systems',
                description: 'Complete exhaust system parts including mufflers, catalytic converters, and pipes.',
                price: '$549',
                features: [
                    'Emission Compliance',
                    'Performance Enhancement',
                    'Stainless Steel',
                    'Custom Fitting',
                    'Sound Optimization'
                ]
            }
        ];

        // DOM elements
        const productGrid = document.getElementById('productGrid');
        const overlay = document.getElementById('overlay');
        const closeBtn = document.getElementById('closeBtn');
        const appointmentForm = document.getElementById('appointmentForm');

        // Load products dynamically
        function loadProducts() {
            productGrid.innerHTML = '';
            products.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card fade-in';
                productCard.style.animationDelay = `${index * 0.1}s`;
                
                productCard.innerHTML = `
                    <div class="product-icon">
                        <i class="${product.icon}"></i>
                    </div>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${product.price}</div>
                    <ul class="product-features">
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <button class="product-btn" onclick="openModal('${product.title}')">Schedule Service</button>
                `;
                
                productGrid.appendChild(productCard);
            });
        }

        // Modal functions
        function openModal(productTitle = '') {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Pre-fill service if product title is provided
            if (productTitle) {
                const serviceSelect = document.getElementById('service');
                const serviceMap = {
                    'Brake System Parts': 'brake-assembly',
                    'Engine Components': 'engine-parts',
                    'Suspension System': 'suspension',
                    'Electrical Systems': 'electrical',
                    'Transmission Parts': 'transmission',
                    'Exhaust Systems': 'exhaust'
                };
                
                if (serviceMap[productTitle]) {
                    serviceSelect.value = serviceMap[productTitle];
                }
            }
        }

        function closeModal() {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            appointmentForm.reset();
            clearErrors();
        }

        // Event listeners for modal
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeModal();
            }
        });

        // Form validation
        function validateForm() {
            let isValid = true;
            clearErrors();

            // Full Name validation
            const fullName = document.getElementById('fullName').value.trim();
            if (!fullName) {
                showError('fullNameError', 'Full name is required');
                isValid = false;
            } else if (fullName.length < 2) {
                showError('fullNameError', 'Full name must be at least 2 characters');
                isValid = false;
            }

            // Email validation
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Phone validation
            const phone = document.getElementById('phone').value.trim();
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phone) {
                showError('phoneError', 'Phone number is required');
                isValid = false;
            } else if (!phoneRegex.test(phone) || phone.length < 10) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }

            // Vehicle Info validation
            const vehicleInfo = document.getElementById('vehicleInfo').value.trim();
            if (!vehicleInfo) {
                showError('vehicleInfoError', 'Vehicle information is required');
                isValid = false;
            } else if (vehicleInfo.length < 5) {
                showError('vehicleInfoError', 'Please provide complete vehicle information');
                isValid = false;
            }

            // Service validation
            const service = document.getElementById('service').value;
            if (!service) {
                showError('serviceError', 'Please select a service');
                isValid = false;
            }

            // Date validation
            const date = document.getElementById('date').value;
            if (!date) {
                showError('dateError', 'Please select a date');
                isValid = false;
            } else {
                const selectedDate = new Date(date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    showError('dateError', 'Please select a future date');
                    isValid = false;
                }
            }

            // Time validation
            const time = document.getElementById('time').value;
            if (!time) {
                showError('timeError', 'Please select a time');
                isValid = false;
            }

            return isValid;
        }

        function showError(errorId, message) {
            const errorElement = document.getElementById(errorId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function clearErrors() {
            const errorElements = document.querySelectorAll('.form-error');
            errorElements.forEach(element => {
                element.style.display = 'none';
                element.textContent = '';
            });
        }

        // Form submission
        appointmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            const submitBtn = document.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Booking...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Success message
                alert('Service appointment scheduled successfully! We will contact you to confirm the details and prepare the required parts.');
                closeModal();
            } catch (error) {
                alert('Error booking appointment. Please try again.');
            } finally {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });

        // Scroll animations
        function handleScrollAnimations() {
            const elements = document.querySelectorAll('.fade-in');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Smooth scrolling for banner CTA
        document.querySelector('.banner-cta').addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#productGrid');
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });

        // Set minimum date to today
        function setMinDate() {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const dateInput = document.getElementById('date');
            dateInput.min = tomorrow.toISOString().split('T')[0];
        }

        // Initialize app
        document.addEventListener('DOMContentLoaded', () => {
            loadProducts();
            setMinDate();
            handleScrollAnimations();
        });

        // Handle scroll events
        window.addEventListener('scroll', handleScrollAnimations);

        // Handle window resize
        window.addEventListener('resize', () => {
            // Recalculate animations on resize
            handleScrollAnimations();
        });

        // Add click event to make global openModal function accessible
        window.openModal = openModal;