# SKATCH

> Transform Ideas into Stunning Visuals Instantly

[![Last Commit](https://img.shields.io/github/last-commit/chaurasiyajitendra/Skatch?style=flat-square)](https://github.com/chaurasiyajitendra/Skatch)
[![JavaScript](https://img.shields.io/badge/JavaScript-99.5%25-yellow?style=flat-square)](https://github.com/chaurasiyajitendra/Skatch)
[![Languages](https://img.shields.io/badge/Languages-3-blue?style=flat-square)](https://github.com/chaurasiyajitendra/Skatch)

## 🎨 Overview

Skatch is an all-in-one developer toolset designed to accelerate the development of modern web applications, especially e-commerce platforms. It combines a fast, React-based front-end with a scalable Node.js backend, offering a seamless development experience for building secure, responsive, and feature-rich web applications.

## 🚀 Why Skatch?

This project aims to simplify building secure, responsive, and feature-rich web apps with modern development practices and cutting-edge technologies.

## ✨ Core Features

### 🎭 **Customizable Front-End**
- **React** for dynamic user interfaces
- **Tailwind CSS** for rapid styling
- **Vite** for lightning-fast development and hot module replacement
- Responsive design patterns built-in

### 🔐 **Secure Authentication**
- JWT-based authentication system
- Protected routes and middleware
- User session management
- Role-based access control

### 🛒 **E-Commerce Capabilities**
- Product management system
- Shopping cart functionality
- Order processing workflow
- Payment integration ready

### 💪 **Robust Backend**
- **Express.js** server architecture
- **MongoDB** database integration
- File upload handling
- RESTful API design
- Scalable microservices architecture

### 👨‍💻 **Developer-Centric**
- **ESLint** for code quality
- Modular architecture
- Hot reloading for fast development
- **Axios** for API communication
- Comprehensive error handling

## 🛠️ Built With

### Frontend Technologies
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

### Backend Technologies
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)

### Development Tools
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![JSON](https://img.shields.io/badge/-JSON-000000?style=flat-square&logo=json&logoColor=white)
![Markdown](https://img.shields.io/badge/-Markdown-000000?style=flat-square&logo=markdown&logoColor=white)
![npm](https://img.shields.io/badge/-npm-CB3837?style=flat-square&logo=npm&logoColor=white)

## 📁 Project Structure

Skatch/
├── Backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ └── server.js
├── frontEnd/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── utils/
│ │ └── App.jsx
│ ├── public/
│ └── package.json
└── README.md

text

## 🚀 Quick Start

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
git clone https://github.com/chaurasiyajitendra/Skatch.git
cd Skatch

text

2. **Install Backend Dependencies**
cd Backend
npm install

text

3. **Install Frontend Dependencies**
cd ../frontEnd
npm install

text

4. **Environment Setup**
Create `.env` file in Backend directory:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

text

5. **Start the Application**

**Backend** (Terminal 1):
cd Backend
npm start

text

**Frontend** (Terminal 2):
cd frontEnd
npm run dev

text

6. **Access the Application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 📖 API Documentation

### Authentication Endpoints

#### Register User
POST /api/auth/register
Content-Type: application/json

{
"name": "John Doe",
"email": "john@example.com",
"password": "securePassword123"
}

text

#### Login User
POST /api/auth/login
Content-Type: application/json

{
"email": "john@example.com",
"password": "securePassword123"
}

text

#### Get User Profile
GET /api/auth/profile
Authorization: Bearer <jwt_token>

text

### Product Endpoints

#### Get All Products
GET /api/products

text

#### Create Product
POST /api/products
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
"name": "Product Name",
"description": "Product Description",
"price": 99.99,
"category": "Electronics",
"image": "product-image-url"
}

text

#### Get Single Product
GET /api/products/:id

text

#### Update Product
PUT /api/products/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
"name": "Updated Product Name",
"price": 109.99
}

text

#### Delete Product
DELETE /api/products/:id
Authorization: Bearer <jwt_token>

text

### Order Endpoints

#### Create Order
POST /api/orders
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
"products": [
{
"product": "product_id",
"quantity": 2
}
],
"shippingAddress": {
"street": "123 Main St",
"city": "New York",
"zipCode": "10001"
}
}

text

#### Get User Orders
GET /api/orders/user
Authorization: Bearer <jwt_token>

text

## 🎯 Features in Detail

### Authentication System
- Secure JWT token-based authentication
- Password hashing with bcrypt
- Protected routes middleware
- Session management
- Password reset functionality

### E-Commerce Features
- Product catalog with search and filtering
- Shopping cart management
- Order tracking system
- User dashboard
- Admin panel for product management

### Developer Experience
- Hot module replacement with Vite
- Code formatting with ESLint
- Modular component architecture
- API integration with Axios
- Environment-based configurations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow ESLint configuration for code consistency
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Issue Reporting

If you encounter any bugs or have feature requests, please create an issue on GitHub with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jitendra Chaurasiya**
- GitHub: [@chaurasiyajitendra](https://github.com/chaurasiyajitendra)

## 🙏 Acknowledgments

- React team for the amazing frontend framework
- Express.js community for the robust backend framework
- MongoDB team for the flexible database solution
- All contributors who help improve this project

---

⭐ **Star this repository if you find it helpful!**
### Base URL
http://localhost:5000/api

text

### Response Format
All API responses follow this standard format:
{
"success": true,
"message": "Operation successful",
"data": {},
"error": null
}

text

## 🔐 Authentication

### Register New User
**Endpoint:** `POST /auth/register`

**Request Body:**
{
"name": "John Doe",
"email": "john.doe@example.com",
"password": "SecurePass123!",
"confirmPassword": "SecurePass123!"
}

text

**Success Response (201):**
{
"success": true,
"message": "User registered successfully",
"data": {
"user": {
"id": "64a7b8c9d1e2f3g4h5i6j7k8",
"name": "John Doe",
"email": "john.doe@example.com",
"role": "user",
"createdAt": "2024-01-15T10:30:00.000Z"
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
}

text

### User Login
**Endpoint:** `POST /auth/login`

**Request Body:**
{
"email": "john.doe@example.com",
"password": "SecurePass123!"
}

text

**Success Response (200):**
{
"success": true,
"message": "Login successful",
"data": {
"user": {
"id": "64a7b8c9d1e2f3g4h5i6j7k8",
"name": "John Doe",
"email": "john.doe@example.com",
"role": "user"
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"expiresIn": "24h"
}
}

text

### Get User Profile
**Endpoint:** `GET /auth/profile`

**Headers:**
Authorization: Bearer <jwt_token>

text

**Success Response (200):**
{
"success": true,
"message": "Profile retrieved successfully",
"data": {
"user": {
"id": "64a7b8c9d1e2f3g4h5i6j7k8",
"name": "John Doe",
"email": "john.doe@example.com",
"role": "user",
"avatar": "https://example.com/avatar.jpg",
"createdAt": "2024-01-15T10:30:00.000Z",
"lastLogin": "2024-01-20T14:25:00.000Z"
}
}
}

text

### Update User Profile
**Endpoint:** `PUT /auth/profile`

**Headers:**
Authorization: Bearer <jwt_token>

text

**Request Body:**
{
"name": "John Smith",
"avatar": "https://example.com/new-avatar.jpg"
}

text

### Logout User
**Endpoint:** `POST /auth/logout`

**Headers:**
Authorization: Bearer <jwt_token>

text

## 🛍️ Products

### Get All Products
**Endpoint:** `GET /products`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `search` (optional): Search in product name/description
- `sort` (optional): Sort by (price, name, createdAt)
- `order` (optional): asc or desc

**Example:**
GET /products?page=1&limit=12&category=electronics&sort=price&order=asc

text

**Success Response (200):**
{
"success": true,
"message": "Products retrieved successfully",
"data": {
"products": [
{
"id": "64a7b8c9d1e2f3g4h5i6j7k8",
"name": "Premium Headphones",
"description": "High-quality wireless headphones with noise cancellation",
"price": 2499.99,
"originalPrice": 2999.99,
"discount": 17,
"category": "electronics",
"images": [
"https://example.com/headphones-1.jpg",
"https://example.com/headphones-2.jpg"
]
"createdAt": "2024-01-15T10:30:00.000Z"
}
],
"pagination": {
"currentPage": 1,
"totalPages": 5,
"totalProducts": 48,
"hasNext": true,
"hasPrev": false
}
}
}

text

### Get Single Product
**Endpoint:** `GET /products/:productId`

**Success Response (200):**
{
"success": true,
"message": "Product retrieved successfully",
"data": {
"product": {
"id": "64a7b8c9d1e2f3g4h5i6j7k8",
"name": "Premium Headphones",
"description": "High-quality wireless headphones with advanced noise cancellation technology",
"category": "handbag",
"images": [
"https://example.com/headphones-1.jpg",
"https://example.com/headphones-2.jpg"
]
"createdAt": "2024-01-15T10:30:00.000Z",
"updatedAt": "2024-01-18T15:20:00.000Z"
}
}
}

text

### Create New Product
**Endpoint:** `POST /products`

**Headers:**
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

text

**Request Body:**
{
"name": "Smart Watch Pro",
"description": "Advanced smartwatch with health monitoring features",
"price": 15999.99,
"images": [
"https://example.com/watch-1.jpg",
"https://example.com/watch-2.jpg"
]}

text

### Update Product
**Endpoint:** `PUT /products/:productId`

**Headers:**
Authorization: Bearer <admin_jwt_token>

text

### Delete Product
**Endpoint:** `DELETE /products/:productId`

**Headers:**
Authorization: Bearer <admin_jwt_token>

text

## 🛒 Cart Management

### Get User Cart
**Endpoint:** `GET /cart`

**Headers:**
Authorization: Bearer <jwt_token>

text

**Success Response (200):**
{
"success": true,
"message": "Cart retrieved successfully",
"data": {
"cart": {
"id": "64a7b8c9d1e2f3g4h5i6j7k8",
"userId": "64a7b8c9d1e2f3g4h5i6j7k8",
"items": [
{
"productId": "64a7b8c9d1e2f3g4h5i6j7k8",
"product": {
"name": "Premium Headphones",
"price": 2499.99,
"image": "https://example.com/headphones-1.jpg"
},
"quantity": 2,
"price": 2499.99,
"totalPrice": 4999.98
}
],
"totalItems": 2,
"subtotal": 4999.98,
"tax": 899.99,
"shipping": 199.00,
"total": 6098.97,
"updatedAt": "2024-01-20T14:25:00.000Z"
}
}
}

text

### Add Item to Cart
**Endpoint:** `POST /cart/add`

**Headers:**
Authorization: Bearer <jwt_token>

text

**Request Body:**
{
"productId": "64a7b8c9d1e2f3g4h5i6j7k8",
"quantity": 2
}

text

### Update Cart Item
**Endpoint:** `PUT /cart/update/:itemId`

**Request Body:**
{
"quantity": 3
}

text

### Remove Item from Cart
**Endpoint:** `DELETE /cart/remove/:itemId`

### Clear Cart
**Endpoint:** `DELETE /cart/clear`

## 📦 Orders

### Create New Order
**Endpoint:** `POST /orders`

**Headers:**
Authorization: Bearer <jwt_token>

text

**Request Body:**
{
"items": [
{
"productId": "64a7b8c9d1e2f3g4h5i6j7k8",
"quantity": 2,
"price": 2499.99
}
],
"shippingAddress": {
"fullName": "John Doe",
"addressLine1": "123 Main Street",
"addressLine2": "Apartment 4B",
"city": "Mumbai",
"state": "Maharashtra",
"pincode": "400001",
"phone": "+91-9876543210"
},
"paymentMethod": "card",
"paymentDetails": {
"cardLast4": "1234",
"transactionId": "txn_abc123xyz"
}
}

text

**Success Response (201):**
{
"success": true,
"message": "Order created successfully",
"data": {
"order": {
"id": "64a7b8c9d1e2f3g4h5i6j7k8",
"orderNumber": "ORD-2024-001234",
"userId": "64a7b8c9d1e2f3g4h5i6j7k8",
"items": [
{
"productId": "64a7b8c9d1e2f3g4h5i6j7k8",
"productName": "Premium Headphones",
"quantity": 2,
"price": 2499.99,
"totalPrice": 4999.98
}
],
"subtotal": 4999.98,
"tax": 899.99,
"shipping": 199.00,
"total": 6098.97,
"shippingAddress": {
"fullName": "John Doe",
"addressLine1": "123 Main Street",
"city": "Mumbai",
"state": "Maharashtra",
"pincode": "400001"
},
"estimatedDelivery": "2024-01-25T00:00:00.000Z",
"createdAt": "2024-01-20T14:25:00.000Z"
}
}
}

text

### Get User Orders
**Endpoint:** `GET /orders`

**Headers:**
Authorization: Bearer <jwt_token>

text

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page


### Get Single Order
**Endpoint:** `GET /orders/:orderId`


text


## ❌ Error Responses

### Validation Error (400)
{
"success": false,
"message": "Validation failed",
"error": {
"code": "VALIDATION_ERROR",
"details": [
{
"field": "email",
"message": "Valid email is required"
},
{
"field": "password",
"message": "Password must be at least 8 characters"
}
]
}
}

text

### Authentication Error (401)
{
"success": false,
"message": "Authentication failed",
"error": {
"code": "UNAUTHORIZED",
"details": "Invalid or expired token"
}
}

text

### Permission Error (403)
{
"success": false,
"message": "Access denied",
"error": {
"code": "FORBIDDEN",
"details": "Admin privileges required"
}
}

text

### Not Found Error (404)
{
"success": false,
"message": "Resource not found",
"error": {
"code": "NOT_FOUND",
"details": "Product with given ID does not exist"
}
}

text

### Server Error (500)
{
"success": false,
"message": "Internal server error",
"error": {
"code": "SERVER_ERROR",
"details": "An unexpected error occurred"
}
}

text

## 🔒 Authentication Headers

All protected endpoints require JWT token in the header:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

text

## 📝 Status Codes

- **200** - OK (Success)
- **201** - Created (Resource created successfully)
- **400** - Bad Request (Invalid data)
- **401** - Unauthorized (Authentication required)
- **403** - Forbidden (Insufficient permissions)
- **404** - Not Found (Resource not found)
- **422** - Unprocessable Entity (Validation error)
- **500** - Internal Server Error
