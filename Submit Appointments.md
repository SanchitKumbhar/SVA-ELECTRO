📄 Create Product Appointment API Documentation
🔗 Endpoint

POST /api/product-appointments/

📖 Description

This API is used to create a new product appointment. Users can book a product-related appointment by uploading vehicle details, selecting a slot (morning, afternoon, or evening), and providing a purpose and location.

Useful for scheduling product demos, installations, or related services.
📥 Headers

Content-Type: multipart/form-data
X-CSRFToken: <your_csrf_token_here>

    💡 If you're using JavaScript (e.g., Axios or Fetch) in the frontend, include the CSRF token in the headers.
### 📋 Required Fields for Creating Product Appointment

| Field             | Type      | Required | Description                                                                 |
|------------------|-----------|----------|-----------------------------------------------------------------------------|
| `product`         | Integer   | ✅ Yes   | ID of the associated product (must exist in DB).                            |
| `vehicleimage`    | File      | ✅ Yes   | Image of the user's vehicle (uploaded as a file).                           |
| `modelname`       | String    | ✅ Yes   | Name of the vehicle model.                                                  |
| `description`     | Text      | ✅ Yes   | Detailed issue or reason for the appointment.                               |
| `qty`             | Integer   | ✅ Yes   | Quantity of product involved in the appointment.                            |
| `user`            | Integer   | ✅ Yes   | ID of the logged-in user creating the appointment.                          |
| `appointmentdate` | Date      | ✅ Yes   | Appointment date in `YYYY-MM-DD` format.                                    |
| `slot`            | String    | ✅ Yes   | Appointment time slot (`M`, `A`, `E`).                                      |
| `location`        | String    | ✅ Yes   | Location where the appointment will take place.                             |
| `purpose`         | String    | ✅ Yes   | Purpose of the appointment (e.g., servicing, installation, demo, etc.).     |
| `message`         | Text      | ✅ Yes   | Additional message or comments.                                             |

---

### ⏱ Slot Choices

| Code | Meaning   |
|------|-----------|
| `M`  | Morning   |
| `A`  | Afternoon |
| `E`  | Evening   |


📦 Example Request (using multipart/form-data)

POST /api/product-appointments/

Headers:

Content-Type: multipart/form-data
X-CSRFToken: FaKeCsRfToKeN123456

Form Data:
Key	Value
product	1
vehicleimage	(file upload) mycar.jpg
modelname	"Honda City"
description	"Engine noise when starting"
qty	2
user	3
appointmentdate	2025-05-15
slot	A
location	"Service Center A"
purpose	"Free Service"
message	"Please check brake pads too"
✅ Success Response (201 Created)

{
  "id": 12,
  "product": 1,
  "vehicleimage": "/media/vehicleimg/mycar.jpg",
  "modelname": "Honda City",
  "description": "Engine noise when starting",
  "qty": 2,
  "user": 3,
  "appointmentdate": "2025-05-15",
  "slot": "A",
  "location": "Service Center A",
  "purpose": "Free Service",
  "message": "Please check brake pads too"
}

❌ Error Response Examples
400 Bad Request (missing or invalid fields)

{
  "qty": ["This field is required."],
  "product": ["Invalid product ID."]
}

403 Forbidden (missing CSRF token)

{
  "detail": "CSRF Failed: CSRF token missing or incorrect."
}

📌 Notes

    You must include the CSRF token in the request headers if you're not using Django REST Framework.

    Use multipart/form-data to send file uploads (like vehicleimage).

    Slots:
    M = Morning,
    A = Afternoon (default),
    E = Evening

    This endpoint assumes you're logged in and have access to the authenticated user's ID.