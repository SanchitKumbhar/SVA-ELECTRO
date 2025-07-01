// Tab switching
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const switchToRegister = document.getElementById('switch-to-register');
        const switchToLogin = document.getElementById('switch-to-login');
    
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        });
    
        registerTab.addEventListener('click', () => {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            registerTab.click();
        });
    
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            loginTab.click();
        });
    
        // Role switch logic
        const roleOptions = document.querySelectorAll('.role-option');
        const roleFlag = document.getElementById('role-flag');
    
        const clientFields = document.getElementById('client-fields');
        const businessFields = document.getElementById('business-fields');
        const governmentFields = document.getElementById('government-fields');
    
        function disableAllInputs() {
            clientFields.querySelectorAll('input').forEach(input => input.disabled = true);
            businessFields.querySelectorAll('input').forEach(input => input.disabled = true);
            governmentFields.querySelectorAll('input').forEach(input => input.disabled = true);
        }
    
        function enableInputs(container) {
            container.querySelectorAll('input').forEach(input => input.disabled = false);
        }
    
        roleOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Update active class
                roleOptions.forEach(o => o.classList.remove('active'));
                option.classList.add('active');
    
                // Set role flag
                const flag = option.getAttribute('data-flag');
                roleFlag.value = flag;
    
                // Hide all and disable inputs
                clientFields.classList.add('hidden');
                businessFields.classList.add('hidden');
                governmentFields.classList.add('hidden');
                disableAllInputs();
    
                // Show relevant field and enable inputs
                if (flag === '1') {
                    businessFields.classList.remove('hidden');
                    enableInputs(businessFields);
                } else if (flag === '2') {
                    governmentFields.classList.remove('hidden');
                    enableInputs(governmentFields);
                } else {
                    clientFields.classList.remove('hidden');
                    enableInputs(clientFields);
                }
            });
        });
    
        // Form submission safety
        registerForm.addEventListener('submit', (e) => {
            // Ensure only the selected role's inputs are enabled
            const flag = roleFlag.value;
            if (flag !== '3') disableInputs(clientFields);
            if (flag !== '1') disableInputs(businessFields);
            if (flag !== '2') disableInputs(governmentFields);
        });