document.addEventListener('DOMContentLoaded', function() {
    const profileToggle = document.getElementById('profileToggle');
    const profileMenu = document.getElementById('profileMenu');
    const logoutBtn = document.getElementById('logoutBtn');

    if (profileToggle && profileMenu) {
        profileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            // Toggle with a class for better CSS control
            profileMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!profileMenu.contains(e.target) && e.target !== profileToggle) {
                profileMenu.classList.remove('show');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            alert("You have been logged out!");
            window.location.href = "/auth";
        });
    }
});