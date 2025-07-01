const orderForm = document.getElementById('order-form');
const ordersTable = document.getElementById('orders-table').querySelector('tbody');

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('order-name').value;
    const quantity = document.getElementById('order-quantity').value;
    const customerName = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('delivery-address').value;
    const remarks = document.getElementById('order-remarks').value;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${quantity}</td>
        <td>${customerName}</td>
        <td>${phone}</td>
        <td>${address}</td>
        <td>${remarks}</td>
    `;

    ordersTable.appendChild(row);
    orderForm.reset();
});