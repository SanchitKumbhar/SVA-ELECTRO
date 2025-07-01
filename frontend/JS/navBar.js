

const profileToggle = document.getElementById('profileToggle');
const profileMenu = document.getElementById('profileMenu');

profileToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event bubbling
    profileMenu.style.display = (profileMenu.style.display === 'flex') ? 'none' : 'flex';
});

// Hide dropdown if clicked outside
document.addEventListener('click', (e) => {
    if (!profileMenu.contains(e.target) && e.target !== profileToggle) {
        profileMenu.style.display = 'none';
    }
});

// Example logout action
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
    alert("You have been logged out!");
    window.location.href = "/auth";
});