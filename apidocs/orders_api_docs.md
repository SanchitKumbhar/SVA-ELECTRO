
# 📦 Orders API Documentation

This API allows managing customer orders using Django REST Framework.

---

## 🔗 Base URL

```
/api/orders/
```

> All endpoints use `/api/orders/` as the base URL.

---

## 🔐 Authentication

This API uses **Bearer Token Authentication**.

### 🔑 Header format:
```
Authorization: Bearer <your_token_here>
```

---

## 📁 Endpoints

---

### 1. 🗂️ List All Orders

- **URL:** `/api/orders/`
- **Method:** `GET`
- **Auth Required:** ✅ Yes
- **Description:** Retrieve all orders.

#### ✅ Sample Response (200 OK)

```json
[
  {
    "id": 1,
    "order_id": "ORD001",
    "customer_name": 3,
    "product_name": 5,
    "quantity": 2,
    "order_date": "2025-06-04T12:00:00Z",
    "status": "Pending"
  }
]
```

---

### 2. 🔍 Retrieve a Single Order

- **URL:** `/api/orders/<id>/`
- **Method:** `GET`
- **Auth Required:** ✅ Yes
- **Description:** Fetch an individual order by its ID.

#### ✅ Sample Response (200 OK)

```json
{
  "id": 1,
  "order_id": "ORD001",
  "customer_name": 3,
  "product_name": 5,
  "quantity": 2,
  "order_date": "2025-06-04T12:00:00Z",
  "status": "Shipped"
}
```

---

### 3. ➕ Create a New Order

- **URL:** `/api/orders/`
- **Method:** `POST`
- **Auth Required:** ✅ Yes
- **Description:** Create a new order.

#### 📥 Sample Request Body

```json
{
  "order_id": "ORD002",
  "customer_name": 3,
  "product_name": 5,
  "quantity": 1,
  "status": "Pending"
}
```

#### ✅ Sample Response (201 Created)

```json
{
  "id": 2,
  "order_id": "ORD002",
  "customer_name": 3,
  "product_name": 5,
  "quantity": 1,
  "order_date": "2025-06-04T12:10:00Z",
  "status": "Pending"
}
```

---

### 4. ✏️ Update an Order

- **URL:** `/api/orders/<id>/`
- **Method:** `PUT`
- **Auth Required:** ✅ Yes
- **Description:** Fully update an existing order.

#### 📥 Sample Request Body

```json
{
  "order_id": "ORD002",
  "customer_name": 3,
  "product_name": 5,
  "quantity": 3,
  "status": "Delivered"
}
```

#### ✅ Sample Response (200 OK)

```json
{
  "id": 2,
  "order_id": "ORD002",
  "customer_name": 3,
  "product_name": 5,
  "quantity": 3,
  "order_date": "2025-06-04T12:10:00Z",
  "status": "Delivered"
}
```

---

### 5. ❌ Delete an Order

- **URL:** `/api/orders/<id>/`
- **Method:** `DELETE`
- **Auth Required:** ✅ Yes
- **Description:** Delete an order by ID.

#### ✅ Sample Response (204 No Content)

_No content returned on successful deletion._

---

## 🛠️ Fields Description

| Field         | Type           | Required | Notes                                |
|---------------|----------------|----------|--------------------------------------|
| order_id      | string         | ✅       | Must be unique                       |
| customer_name | integer (user id) | ✅    | ForeignKey to User model             |
| product_name  | integer (product id) | ✅  | ForeignKey to Product model          |
| quantity      | integer        | ✅       | Must be ≥ 1                          |
| status        | string enum    | ❌       | One of: `Pending`, `Shipped`, `Delivered`, `Cancelled` |
| order_date    | datetime       | ❌       | Auto-generated at creation           |

---

## 🚨 Error Responses

- `400 Bad Request` – Invalid input
- `401 Unauthorized` – Missing/invalid token
- `403 Forbidden` – Permission denied
- `404 Not Found` – Resource not found

