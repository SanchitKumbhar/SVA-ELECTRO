// currentUser will be populated dynamically from the fetch request.
let currentUser = null; 
let originalData = {}; 

// Field configurations remain the same as they describe the *desired* structure
// and how to access fields using dot notation (e.g., 'client_details.fullname').
const roleFields = {
    client: [
        { id: 'fullname', label: 'Full Name', type: 'text', key: 'client_profile.fullname' },
        { id: 'email', label: 'Email Address', type: 'email', key: 'email' },
        { id: 'phonenumber', label: 'Phone Number', type: 'tel', key: 'phonenumber' }
    ],
    business: [
        { id: 'businessName', label: 'Business Name', type: 'text', key: 'private_business.business_name' },
        { id: 'businessEmail', label: 'Business Email', type: 'email', key: 'email' },
        { id: 'businessRegNo', label: 'Business Registration No.', type: 'text', key: 'private_business.registration_no' },
        { id: 'phonenumber', label: 'Phone Number', type: 'tel', key: 'phonenumber' },
        { id: 'businessAddress', label: 'Business Address', type: 'textarea', key: 'private_business.address' }
    ],
    government: [
        { id: 'govEmail', label: 'Government Email', type: 'email', key: 'email' },
        { id: 'govDepartment', label: 'Department Name', type: 'text', key: 'government_details.department' },
        { id: 'govId', label: 'Government ID Code', type: 'text', key: 'government_details.gov_id' },
        { id: 'phonenumber', label: 'Phone Number', type: 'tel', key: 'phonenumber' }
    ]
};

const roleTitles = {
    client: '👤 Personal Information',
    business: '🏢 Business Information',
    government: '🏛️ Government Information'
};

// --- Core UI Initialization & Data Handling ---

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

/**
 * Initializes the profile UI based on the fetched currentUser data.
 */
function initializeProfile() {
    if (!currentUser) {
        console.error("currentUser data is not available for UI initialization.");
        return;
    }

    let profileName = '';
    // Determine the display name for the profile header based on the user's role.
    if (currentUser.role === 'client' && currentUser.client_profile && currentUser.client_profile.fullname) {
        profileName = currentUser.client_profile.fullname;
    } else if (currentUser.role === 'business' && currentUser.private_business && currentUser.private_business.business_name) {
        profileName = currentUser.private_business.business_name;
    } else if (currentUser.role === 'government' && currentUser.government_details && currentUser.government_details.department) {
        profileName = currentUser.government_details.department;
    } else {
        // Fallback to email if no specific name field is found for the role.
        profileName = currentUser.email || "User Profile"; // Uses the top-level email we will ensure is populated
    }

    document.getElementById('profileAvatar').textContent = getAvatarForRole(currentUser.role);
    document.getElementById('profileName').textContent = profileName;
    document.getElementById('profileRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) + " User";
    
    document.getElementById('formTitle').textContent = roleTitles[currentUser.role];
    
    generateFormFields();
    populateForm();
}

/**
 * Returns the appropriate avatar emoji for a given role.
 * @param {string} role - The user's role (e.g., 'client', 'business', 'government').
 * @returns {string} The emoji character for the avatar.
 */
function getAvatarForRole(role) {
    if (role === 'client') return '👤';
    if (role === 'business') return '🏢';
    if (role === 'government') return '🏛️';
    return '';
}

/**
 * Generates the dynamic form fields based on the currentUser's role.
 */
function generateFormFields() {
    if (!currentUser || !currentUser.role) return; 
    const formFieldsContainer = document.getElementById('formFields');
    const fieldsToGenerate = roleFields[currentUser.role];
    
    formFieldsContainer.innerHTML = ''; // Clear existing fields
    
    fieldsToGenerate.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        if (field.type === 'textarea') {
            formGroup.innerHTML = `
                <label for="${field.id}">${field.label}</label>
                <textarea id="${field.id}" rows="4"></textarea>
            `;
        } else {
            formGroup.innerHTML = `
                <label for="${field.id}">${field.label}</label>
                <input type="${field.type}" id="${field.id}">
            `;
        }
        
        // Apply special styling for business address to span full width.
        if (field.id === 'businessAddress') {
            formGroup.style.gridColumn = '1 / -1';
        }
        
        formFieldsContainer.appendChild(formGroup);
    });
}

/**
 * Populates the generated form fields with the currentUser's data.
 */
function populateForm() {
    if (!currentUser || !currentUser.role) return; 
    const fieldsToPopulate = roleFields[currentUser.role];
    
    fieldsToPopulate.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            const value = getNestedProperty(currentUser, field.key);
            if (value !== undefined) {
                element.value = value;
            }
        }
    });
}

/**
 * Safely retrieves a nested property from an object using a dot-notation path.
 * @param {object} obj - The object to search within.
 * @param {string} path - The dot-notation path (e.g., 'client_details.fullname').
 * @returns {*} The value of the nested property, or undefined if not found.
 */
function getNestedProperty(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Stores a deep copy of the current user data to allow for reverting changes.
 */
function storeOriginalData() {
    if (!currentUser) return; 
    originalData = JSON.parse(JSON.stringify(currentUser));
}

/**
 * Saves changes made in the profile form to the currentUser object.
 * In a real application, this data would then be sent to the backend.
 */
async function saveChanges() {
    if (!currentUser || !currentUser.role) {
        console.error("No current user data or role to save.");
        return;
    }

    // --- NEW: Get the current user's UUID ---
    const userUUID = currentUser.userId; // Assuming CustomUser's UUIDMixin provides 'id' as the PK.
                                    // If 'login' is the UUID from your API response, use currentUser.login.
                                    // You need to confirm which property holds the CustomUser's UUID.
    console.log(userUUID);
    
    if (!userUUID) {
        console.error("User UUID not found. Cannot construct update URL.");
        alert("Error: User ID not available for saving profile.");
        return;
    }

    const fieldsToSave = roleFields[currentUser.role];
    console.log(fieldsToSave);
    
    const dataToSend = {}; // Object to hold the data structured for the API

    fieldsToSave.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            const parts = field.key.split('.');
            let currentDataPart = dataToSend;
            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (!currentDataPart[part] || typeof currentDataPart[part] !== 'object') {
                    currentDataPart[part] = {};
                }
                currentDataPart = currentDataPart[part];
            }
            currentDataPart[parts[parts.length - 1]] = element.value;

            // Also update the currentUser object immediately for UI responsiveness
            setNestedProperty(currentUser, field.key, element.value);
        }
    });

    // New line to always include phonenumber in the top-level of dataToSend
    dataToSend.phonenumber = document.getElementById('phonenumber').value;

    console.log('Data prepared for API:', dataToSend);
    console.log(dataToSend.id)
    try {
        const token = await fetchJWTToken();

        if (!token) {
            throw new Error("Authentication token not available. Cannot save changes.");
        }

        // --- MODIFIED: Determine the correct API endpoint and include UUID ---
        let apiEndpoint = `/api/profile/${dataToSend.id}/`

        console.log(apiEndpoint);
        
        console.log(JSON.stringify(dataToSend));
        
        const response = await fetch(apiEndpoint, {
            
            
            method: 'PATCH', // --- CHANGED: Use PATCH method for partial updates ---
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.detail || `Failed to save changes: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('API Response after saving:', responseData);

        // Re-fetch and re-initialize UI after successful save.
        // This is crucial to get any server-side transformations or updated data.
        const fetchedData = await fetchUserTypeAndData();
        if (fetchedData && fetchedData.role && fetchedData.role !== 'unknown') {
            loadUserProfile(fetchedData);
            showSuccessMessage();
        } else {
            console.error("Successfully saved, but failed to re-fetch and re-initialize profile data.");
        }

    } catch (error) {
        console.error("Error saving profile changes:", error.message);
        alert(`Error saving profile: ${error.message}`);
        cancelChanges();
    }
}

/**
 * Safely sets a nested property in an object using a dot-notation path.
 * Creates intermediate objects if they don't exist.
 * @param {object} obj - The object to modify.
 * @param {string} path - The dot-notation path (e.g., 'client_details.fullname').
 * @param {*} value - The value to set.
 */
function setNestedProperty(obj, path, value) {
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part] || typeof current[part] !== 'object') {
            current[part] = {};
        }
        current = current[part];
    }
    current[parts[parts.length - 1]] = value;
}

/**
 * Reverts changes made in the form by restoring data from originalData.
 */
function cancelChanges() {
    if (!currentUser || !originalData || !currentUser.role) return; 

    // Clear existing properties from currentUser to ensure a clean restore.
    for (const key in currentUser) {
        if (currentUser.hasOwnProperty(key)) {
            delete currentUser[key];
        }
    }
    // Copy properties back from originalData.
    Object.assign(currentUser, JSON.parse(JSON.stringify(originalData)));
    
    populateForm();
    
    // Update the profile header name to reflect the cancelled changes.
    let cancelledProfileName = '';
    if (currentUser.role === 'client') {
        cancelledProfileName = currentUser.client_details ? currentUser.client_details.fullname : '';
    } else if (currentUser.role === 'business') {
        cancelledProfileName = currentUser.private_business_details ? currentUser.private_business_details.business_name : '';
    } else if (currentUser.role === 'government') {
        cancelledProfileName = currentUser.government_details ? currentUser.government_details.department : '';
    }
    document.getElementById('profileName').textContent = cancelledProfileName;
}

function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
    }, 3000);
}

/**
 * Shows the selected section (Profile, Password, Settings) and updates navigation.
 * @param {string} sectionName - The name of the section to show (e.g., 'profile', 'password').
 */
function showSection(sectionName) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Adds 'active' class to the clicked navigation item if the event target is valid.
    if (event && event.target && event.target.classList) {
        event.target.classList.add('active');
    }
    
    // Hides all sections.
    document.getElementById('profileSection').classList.add('hidden');
    document.getElementById('passwordSection').classList.add('hidden');
    document.getElementById('settingsSection').classList.add('hidden');
    
    // Shows the target section.
    document.getElementById(sectionName + 'Section').classList.remove('hidden');
}

/**
 * Simulates a logout process.
 */
// function logout() {
//     if (confirm('Are you sure you want to logout?')) {
//         alert('Logged out successfully! Redirecting to login page...');
//         // In a real app, you would clear local storage/cookies and redirect to the login page.
//         console.log('User logged out');
//     }
// }

// --- API Calls and Initial Page Load ---

/**
 * Fetches the JWT token from the backend.
 * @returns {Promise<string|null>} A promise that resolves with the JWT token or null if an error occurs.
 */
async function fetchJWTToken() {
  try {
    const res = await fetch('/get-jwt', { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch JWT token");
    }

    const data = await res.json();
    return data.access; // Assuming the JWT is returned in { access: "..." }
  } catch (error) {
    console.error("Error fetching JWT token:", error.message);
    return null;
  }
}

/**
 * Fetches the user's profile data, including their type and specific details, from the backend.
 * This function is now the primary entry point for getting user data.
 * @returns {Promise<object|null>} A promise that resolves with the user data object or null if an error occurs.
 */
async function fetchUserTypeAndData() {
  const token = await fetchJWTToken();

  if (!token) {
    console.error("No token received. Cannot fetch user type and data.");
    return null;
  }

  try {
    const response = await fetch(`/api/profile/check-type/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Error fetching profile data: ${response.status}`);
    }

    const apiResponse = await response.json();
    console.log("Raw API Response from /check-type/:", apiResponse);

    const transformedUserData = {};

    // 1. Determine the role (type)
    transformedUserData.role = apiResponse.type ? apiResponse.type.toLowerCase() : 'unknown';

    // Extract the CustomUser's UUID from the 'login' field in apiResponse.data
    transformedUserData.userId = apiResponse.data ? apiResponse.data.login : null;

    // 2. Populate nested detail objects
    transformedUserData.client_details = {};
    transformedUserData.private_business_details = {};
    transformedUserData.government_details = {};

    if (transformedUserData.role === 'client') {
        transformedUserData.client_profile = apiResponse.data || {};
    } else if (transformedUserData.role === 'business') {
        transformedUserData.private_business = apiResponse.data || {};
    } else if (transformedUserData.role === 'government') {
        transformedUserData.government_details = apiResponse.data || {};
    } else {
        console.warn(`Received unknown user type: ${apiResponse.type}. Data might not be mapped correctly.`);
    }

    // 3. Always use 'phonenumber' for the top-level key
    // Prefer top-level, then nested, and always map 'phone_number' to 'phonenumber'
    transformedUserData.phonenumber = apiResponse.phonenumber || '';
    
    // Remove phone_number from nested objects to avoid confusion
    if (transformedUserData.client_details.phone_number) {
        transformedUserData.client_details.phonenumber = transformedUserData.client_details.phone_number;
        delete transformedUserData.client_details.phone_number;
    }
    if (transformedUserData.private_business_details.phone_number) {
        transformedUserData.private_business_details.phonenumber = transformedUserData.private_business_details.phone_number;
        delete transformedUserData.private_business_details.phone_number;
    }
    if (transformedUserData.government_details.phone_number) {
        transformedUserData.government_details.phonenumber = transformedUserData.government_details.phone_number;
        delete transformedUserData.government_details.phone_number;
    }

    // 4. Email logic (unchanged)
    transformedUserData.email = apiResponse.email || '';
    if (!transformedUserData.email && transformedUserData.government_details.email) {
        transformedUserData.email = transformedUserData.government_details.email;
    }
    if (!transformedUserData.email && transformedUserData.client_details.email) {
        transformedUserData.email = transformedUserData.client_details.email;
    }
    if (!transformedUserData.email && transformedUserData.private_business_details.email) {
        transformedUserData.email = transformedUserData.private_business_details.email;
    }

    console.log("Transformed User Data for Frontend:", transformedUserData);
    return transformedUserData;

  } catch (error) {
    console.error("Error fetching user type and data:", error.message);
    return null;
  }
}

// ... (rest of your existing code, including saveChanges)

// Your saveChanges function already uses currentUser.userId, which is correct now:
// const userUUID = currentUser.userId; // This line will now correctly get the UUID
/**
 * Loads the fetched user data into the `currentUser` variable and initializes the UI.
 * @param {object} userData - The user profile data received from the API.
 */
function loadUserProfile(userData) {
    currentUser = userData; 
    console.log(currentUser.userId);
    
    // All necessary detail objects are already initialized by fetchUserTypeAndData
    
    initializeProfile();
    storeOriginalData();
}

// Immediately invoked async function to orchestrate the data fetching and UI initialization.
(async () => {
    const fetchedData = await fetchUserTypeAndData();

    // Check if data was fetched successfully and has a recognized role
    if (fetchedData && fetchedData.role && fetchedData.role !== 'unknown') { 
        loadUserProfile(fetchedData);
    } else {
        console.error("Failed to load user profile: Invalid or missing role from /api/profile/check-type/. Profile will not be displayed.");
        // Optionally, display an error message to the user, or redirect them.
    }
})();

// Add this function to handle password change
async function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Please fill in all password fields.");
        return;
    }
    if (newPassword !== confirmPassword) {
        alert("New passwords do not match.");
        return;
    }
    // if (newPassword.length < 8) {
    //     alert("New password must be at least 8 characters long.");
    //     return;
    // }

    const token = await fetchJWTToken();
    if (!token) {
        alert("Authentication error. Please log in again.");
        return;
    }

    try {
        const response = await fetch('/api/profile/change-password/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to change password.");
        }

        alert("Password changed successfully!");
        // Optionally clear fields
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    } catch (error) {
        alert("Error changing password: " + error.message);
    }
}


