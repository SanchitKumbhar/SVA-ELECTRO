
# Product API Documentation

Base URL: `http://127.0.0.1:8000/api/products/`

---

## Product Model Fields

| Field           | Type       | Description                         | Notes                                           |
|-----------------|------------|-----------------------------------|-------------------------------------------------|
| `id`            | Integer    | Unique identifier (auto-generated)| Read-only                                       |
| `productname`   | String     | Name of the product                | Max length: 100                                 |
| `productcategory` | String   | Category of the product            | Choices:<br> - `"1"` = Electric Buses <br> - `"2,"` = Charging Equipment <br> - `"3"` = Spare Parts <br> - `"4"` = Accessories |
| `stock`         | Integer    | Quantity in stock                  | Default: 0                                      |
| `productimg`    | Image      | Image of the product               | Upload path: `static/productimg`                |
| `cost`          | Integer    | Cost of the product                |                                                 |
| `description`   | Text       | Description of the product         |                                                 |
| `launch`        | Date       | Launch date                       | Default: current date (format: `YYYY-MM-DD`)    |

---

## Endpoints

### 1. Get All Products

- **URL:** `GET /api/products/`
- **Description:** Retrieve a list of all products.
- **Response:**

```json
[
  {
    "id": 1,
    "productname": "Electric Bus Model X",
    "productcategory": "1",
    "stock": 10,
    "productimg": "/static/productimg/bus.jpg",
    "cost": 50000,
    "description": "Electric Bus for city transport.",
    "launch": "2025-05-01"
  }
]
```

---

### 2. Get Product Details

- **URL:** `GET /api/products/{id}/`
- **Description:** Retrieve details of a product by ID.
- **URL Params:**
  - `id` — Product ID (integer)
- **Response:**

```json
{
  "id": 1,
  "productname": "Electric Bus Model X",
  "productcategory": "1",
  "stock": 10,
  "productimg": "/static/productimg/bus.jpg",
  "cost": 50000,
  "description": "Electric Bus for city transport.",
  "launch": "2025-05-01"
}
```

---

### 3. Create a New Product

- **URL:** `POST /api/products/`
- **Description:** Add a new product.
- **Request Body (JSON):**

```json
{
  "productname": "Charging Station Z",
  "productcategory": "2,",
  "stock": 50,
  "productimg": "<image file or base64>",
  "cost": 2000,
  "description": "Fast charging station.",
  "launch": "2025-06-15"
}
```

- **Response:**
  - **201 Created** with created product data.

---

### 4. Update Entire Product (PUT)

- **URL:** `PUT /api/products/{id}/`
- **Description:** Replace entire product data by ID.
- **Request Body (JSON):** Must include **all fields** (except `id`).

```json
{
  "productname": "Charging Station Z Updated",
  "productcategory": "2,",
  "stock": 60,
  "productimg": "<image file or base64>",
  "cost": 2100,
  "description": "Updated fast charging station.",
  "launch": "2025-06-20"
}
```

- **Response:**
  - **200 OK** with updated product data.

---

### 5. Partial Update Product (PATCH)

- **URL:** `PATCH /api/products/{id}/`
- **Description:** Update one or more fields of a product by ID.
- **Request Body (JSON):**

```json
{
  "stock": 70,
  "cost": 2200
}
```

- **Response:**
  - **200 OK** with updated product data.

---

### 6. Delete Product

- **URL:** `DELETE /api/products/{id}/`
- **Description:** Delete a product by ID.
- **Response:**
  - **204 No Content** on success.
  - **404 Not Found** if product does not exist.

---

## Notes

- **Image Upload:**
  - `productimg` should be uploaded via `multipart/form-data` (file upload) or as a base64 encoded string depending on your API setup.
- **Product Categories:**
  - Must be one of the following string choices:
    - `"1"` — Electric Buses
    - `"2,"` — Charging Equipment
    - `"3"` — Spare Parts
    - `"4"` — Accessories
- **Date Format:**
  - Use `YYYY-MM-DD` for the `launch` field.

---

## Example cURL Commands

### Create Product

```bash
curl -X POST http://127.0.0.1:8000/api/products/ \
-H "Content-Type: application/json" \
-d '{
  "productname": "Charging Station Z",
  "productcategory": "2,",
  "stock": 50,
  "cost": 2000,
  "description": "Fast charging station.",
  "launch": "2025-06-15"
}'
```

### Partial Update (PATCH)

```bash
curl -X PATCH http://127.0.0.1:8000/api/products/1/ \
-H "Content-Type: application/json" \
-d '{
  "stock": 70,
  "cost": 2200
}'
```

---
