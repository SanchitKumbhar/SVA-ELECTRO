doc_content = """
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
  {~
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
