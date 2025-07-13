📄 GET All Products API Documentation
🔗 Endpoint

GET /api/products/

📖 Description

This API returns a list of all available products in the system. Each product includes its name, category, stock status, image URL, cost, description, and launch date.

It's useful for showing product listings in dashboards, stores, catalogs, or admin panels.

| Field             | Type    | Description                                                                 |
| ----------------- | ------- | --------------------------------------------------------------------------- |
| `id`              | Integer | Unique identifier of the product.                                           |
| `productname`     | String  | Name/title of the product.                                                  |
| `productcategory` | String  | Product category, represented by a code (you can map it to readable names). |
| `stock`           | Integer | Number of items available in stock.                                         |
| `productimg`      | URL     | Path or URL to the uploaded image of the product.                           |
| `cost`            | Integer | Cost/price of the product in your base currency.                            |
| `description`     | String  | Detailed description of the product.                                        |
| `launch`          | Date    | Product launch date (format: YYYY-MM-DD).                                   |


📥 Request Example
Method:

GET

Headers:

Content-Type: application/json

(Optional) Authorization header if required:

Authorization: Token your_token_here

✅ Success Response
Status Code: 200 OK

[
  {
    "id": 1,
    "productname": "Smartphone X",
    "productcategory": "MOB",
    "stock": 20,
    "productimg": "/media/productimg/smartphone.jpg",
    "cost": 49999,
    "description": "Latest model with high-end specs.",
    "launch": "2025-05-14"
  },
  {
    "id": 2,
    "productname": "Laptop Pro",
    "productcategory": "LAP",
    "stock": 10,
    "productimg": "/media/productimg/laptop.jpg",
    "cost": 89999,
    "description": "Powerful laptop with extended battery life.",
    "launch": "2025-04-20"
  }
]

❌ Error Responses
401 Unauthorized

{
  "error": "Authentication credentials were not provided."
}

500 Internal Server Error

{
  "error": "Something went wrong on the server."
}

📝 Notes

    productcategory values are stored as choices (e.g., '1', '2'). Consider mapping these codes to human-readable values on the frontend.

    The productimg path can be converted to a full URL using your domain (e.g., http://localhost:8000/media/productimg/...).

    You can add pagination or filtering if the list grows large.

