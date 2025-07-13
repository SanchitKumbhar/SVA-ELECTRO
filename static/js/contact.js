const contactsTableBody = document.getElementById('contacts-table').querySelector('tbody');

/**
 * Renders contact data to the table
 * @param {Array} contactsArray - Parsed array of contact objects
 */
function renderContacts(contactsArray) {
  let tableRows = '';

  contactsArray.forEach(contact => {
    const { fullname, email, company, message } = contact.fields;
    const now = new Date().toLocaleString();

    tableRows += `
      <tr>
        <td>${fullname}</td>
        <td>${email}</td>
        <td>${company}</td>
        <td>${message}</td>
        <td>${now}</td>
      </tr>
    `;
  });

  contactsTableBody.innerHTML = tableRows;
}

/**
 * Fetch contact data from API and render
 */
function loadContacts() {
  fetch('https://sanchitkumbhar.pythonanywhere.com/get-contacts')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const contactsArray = JSON.parse(data.data);
      renderContacts(contactsArray);
    })
    .catch(error => {
      console.error('Failed to load contacts:', error);
    });
}

// Initial load
loadContacts();
