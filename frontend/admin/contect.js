const contactsTable = document.getElementById('contacts-table').querySelector('tbody');

// Example to simulate incoming contact request
function addContact(name, email, company, message) {
    const row = document.createElement('tr');
    const now = new Date();
    const dateTime = now.toLocaleString();

    row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${company}</td>
        <td>${message}</td>
        <td>${dateTime}</td>
    `;

    contactsTable.appendChild(row);
}

// Example Usage
addContact('John Doe', 'john@example.com', 'Tech Corp', 'Interested in partnership.');