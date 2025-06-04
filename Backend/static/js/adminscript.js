// // Wait for DOM to load
// document.addEventListener('DOMContentLoaded', function() {
//     // Loader animation
//     setTimeout(() => {
//         document.querySelector('.loader').classList.add('hidden');
//         document.body.style.overflow = 'visible';
//     }, 3000);

//     // Custom cursor
//     const cursor = document.querySelector('.cursor');
    
//     document.addEventListener('mousemove', (e) => {
//         cursor.style.left = e.clientX + 'px';
//         cursor.style.top = e.clientY + 'px';
//     });

//     document.addEventListener('mousedown', () => {
//         cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
//     });

//     document.addEventListener('mouseup', () => {
//         cursor.style.transform = 'translate(-50%, -50%) scale(1)';
//     });

//     // Header scroll effect
//     const header = document.querySelector('header');
    
//     window.addEventListener('scroll', () => {
//         if (window.scrollY > 100) {
//             header.classList.add('scrolled');
//         } else {
//             header.classList.remove('scrolled');
//         }
//     });

//     // Mobile menu toggle
//     const hamburger = document.querySelector('.hamburger');
//     const navLinks = document.querySelector('.nav-links');
    
//     hamburger.addEventListener('click', () => {
//         hamburger.classList.toggle('active');
//         navLinks.classList.toggle('active');
//     });

//     // Close mobile menu when clicking a link
//     document.querySelectorAll('.nav-links a').forEach(link => {
//         link.addEventListener('click', () => {
//             hamburger.classList.remove('active');
//             navLinks.classList.remove('active');
//         });
//     });

//     // Scroll reveal animations
//     const revealElements = document.querySelectorAll('.reveal-text, .reveal-image, .reveal-card, .reveal-form, .reveal-line');
    
//     function checkReveal() {
//         const triggerBottom = window.innerHeight * 0.8;
        
//         revealElements.forEach(element => {
//             const elementTop = element.getBoundingClientRect().top;
            
//             if (elementTop < triggerBottom) {
//                 element.classList.add('active');
//             }
//         });
//     }
    
//     window.addEventListener('scroll', checkReveal);
//     checkReveal(); // Check on initial load

//     // Counter animation
//     const counters = document.querySelectorAll('.counter');
//     let hasRun = false;
    
//     function runCounters() {
//         if (hasRun) return;
        
//         const statsSection = document.querySelector('.stats-container');
//         const statsSectionTop = statsSection.getBoundingClientRect().top;
//         const triggerBottom = window.innerHeight * 0.8;
        
//         if (statsSectionTop < triggerBottom) {
//             counters.forEach(counter => {
//                 const target = +counter.dataset.target;
//                 const count = +counter.innerText;
//                 const increment = target / 100;
                
//                 if (count < target) {
//                     counter.innerText = Math.ceil(count + increment);
//                     setTimeout(() => runCounters(), 20);
//                 } else {
//                     counter.innerText = target;
//                 }
//             });
            
//             hasRun = true;
//         }
//     }
    
//     window.addEventListener('scroll', runCounters);

//     // Product slider
//     const productCards = document.querySelectorAll('.product-card');
//     const dots = document.querySelectorAll('.dot');
//     const prevBtn = document.querySelector('.prev-btn');
//     const nextBtn = document.querySelector('.next-btn');
//     let currentIndex = 0;
    
//     // Hide all product cards except the first one
//     productCards.forEach((card, index) => {
//         if (index !== 0) {
//             card.style.display = 'none';
//         }
//     });
    
//     function showProduct(index) {
//         productCards.forEach(card => {
//             card.style.display = 'none';
//         });
        
//         dots.forEach(dot => {
//             dot.classList.remove('active');
//         });
        
//         productCards[index].style.display = 'grid';
//         dots[index].classList.add('active');
//         currentIndex = index;
//     }
    
//     dots.forEach((dot, index) => {
//         dot.addEventListener('click', () => {
//             showProduct(index);
//         });
//     });
    
//     prevBtn.addEventListener('click', () => {
//         currentIndex = (currentIndex - 1 + productCards.length) % productCards.length;
//         showProduct(currentIndex);
//     });
    
//     nextBtn.addEventListener('click', () => {
//         currentIndex = (currentIndex + 1) % productCards.length;
//         showProduct(currentIndex);
//     });

//     // Form animation
//     const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
//     formInputs.forEach(input => {
//         input.addEventListener('focus', () => {
//             input.parentElement.classList.add('focused');
//         });
        
//         input.addEventListener('blur', () => {
//             input.parentElement.classList.remove('focused');
//         });
//     });

//     // Form submission
//     const contactForm = document.querySelector('.contact-form');
    
//     contactForm.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         // Simulate form submission
//         const submitBtn = contactForm.querySelector('.submit-btn');
//         const originalText = submitBtn.innerText;
        
//         submitBtn.innerText = 'Sending...';
//         submitBtn.disabled = true;
        
//         setTimeout(() => {
//             submitBtn.innerText = 'Message Sent!';
//             contactForm.reset();
            
//             setTimeout(() => {
//                 submitBtn.innerText = originalText;
//                 submitBtn.disabled = false;
//             }, 2000);
//         }, 1500);
//     });
// });




// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Loader animation
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 3000);

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-image, .reveal-card, .reveal-form, .reveal-line');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    let hasRun = false;
    
    function runCounters() {
        if (hasRun) return;
        
        const statsSection = document.querySelector('.stats-container');
        const statsSectionTop = statsSection.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;
        
        if (statsSectionTop < triggerBottom) {
            counters.forEach(counter => {
                const target = +counter.dataset.target;
                const count = +counter.innerText;
                const increment = target / 100;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => runCounters(), 20);
                } else {
                    counter.innerText = target;
                }
            });
            
            hasRun = true;
        }
    }
    
    window.addEventListener('scroll', runCounters);

    // Product slider
    const productCards = document.querySelectorAll('.product-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    // Hide all product cards except the first one
    productCards.forEach((card, index) => {
        if (index !== 0) {
            card.style.display = 'none';
        }
    });
    
    function showProduct(index) {
        productCards.forEach(card => {
            card.style.display = 'none';
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        productCards[index].style.display = 'grid';
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showProduct(index);
        });
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + productCards.length) % productCards.length;
        showProduct(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % productCards.length;
        showProduct(currentIndex);
    });

    // Form animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerText = 'Message Sent!';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
});