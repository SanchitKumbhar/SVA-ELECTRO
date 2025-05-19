
# 🔐 JWT Authentication API Documentation (DRF + SimpleJWT)

## 🧰 Base URL

```
https://your-domain.com/api/
```

---

## 1. 🪙 Obtain JWT Token Pair

### `POST /api/token/`

Obtain access and refresh tokens by providing valid user credentials.

### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

### Response

**Success (200 OK):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOi...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOi..."
}
```

**Failure (401 UNAUTHORIZED):**
```json
{
  "detail": "No active account found with the given credentials"
}
```

---

## 2. 🔁 Refresh Access Token

### `POST /api/token/refresh/`

Use the refresh token to get a new access token.

### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "refresh": "your_refresh_token"
}
```

### Response

```json
{
  "access": "new_access_token"
}
```

---

## 3. ✅ Verify Token Validity

### `POST /api/token/verify/`

Check if a token is still valid (access or refresh).

### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "token": "your_access_or_refresh_token"
}
```

### Response

**Valid Token (200 OK):**
```json
{}
```

**Invalid Token (401 UNAUTHORIZED):**
```json
{
  "detail": "Token is invalid or expired",
  "code": "token_not_valid"
}
```

---

## 4. 🔒 Use Access Token to Call Protected APIs

Include the `access` token in the `Authorization` header of your requests to secured endpoints.

### Headers:
```
Authorization: Bearer <your_access_token>
```

### Example:
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOi...
```


---

## 📌 Example Usage

### 🔹 1. Obtain Token

**Request:**
```bash
curl -X POST https://your-domain.com/api/token/ \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "testpassword"}'
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOi...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOi..."
}
```

---

### 🔹 2. Refresh Token

**Request:**
```bash
curl -X POST https://your-domain.com/api/token/refresh/ \
-H "Content-Type: application/json" \
-d '{"refresh": "your_refresh_token"}'
```

**Response:**
```json
{
  "access": "new_access_token"
}
```

---

### 🔹 3. Verify Token

**Request:**
```bash
curl -X POST https://your-domain.com/api/token/verify/ \
-H "Content-Type: application/json" \
-d '{"token": "your_access_or_refresh_token"}'
```

**Response (valid):**
```json
{}
```

**Response (invalid):**
```json
{
  "detail": "Token is invalid or expired",
  "code": "token_not_valid"
}
```

---

### 🔹 4. Access Protected API

**Request:**
```bash
curl -H "Authorization: Bearer your_access_token" \
https://your-domain.com/api/protected-endpoint/
```

**Response:**
```json
{
  "message": "You have accessed a protected route!"
}
```
