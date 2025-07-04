// Store your token globally
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxNjg0MTE4LCJpYXQiOjE3NTE2NDgxMTgsImp0aSI6IjI3MjgwNWY4ZDk5YzRmYTA4ZTZhYjQzNDUyMDQ5ZTU0IiwidXNlcl9pZCI6IjYyYzliZDY0LTA3OTktNDZkMS1iMDg2LWNhZDlhZGIxOTU4NiJ9.3ER8ECZjejVGxU1PUXWLtqlGhNQHDT57IHcxCETvbms";

const ordersTableBody = document.getElementById('orders-table').querySelector('tbody');

// Function to render table rows
function renderOrders(orders) {
    let tableRows = '';

    orders.forEach(order => {
        tableRows += `
            <tr>
                <td>${order.id}</td>
                <td>${order.order_id ?? '-'}</td>
                <td>${order.product_name}</td>
                <td>${order.quantity}</td>
                <td>${order.customer_name}</td>
                <td>${order.status}</td>
                <td>${new Date(order.order_date).toLocaleString()}</td>
            </tr>
        `;
    });

    ordersTableBody.innerHTML = tableRows;
}

// Fetch orders from API
function loadOrders() {
    fetch("https://sanchitkumbhar.pythonanywhere.com/api/order/", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        renderOrders(data);
    })
    .catch(error => {
        console.error("Error fetching orders:", error);
    });
}

// Load orders on page load
loadOrders();
