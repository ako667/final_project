# 🍰 SweetDelight - Full Stack Cake Shop Application

A modern, full-stack web application for managing and ordering custom cakes. Built with Express.js, React-like vanilla JavaScript UI, and MongoDB, this project demonstrates a complete production-ready implementation of authentication, authorization, and CRUD operations.

## 📋 Project Overview

SweetDelight is a two-tier cake shop application where:
- **Customers** can browse cakes, add them to their cart, and place orders
- **Admin users** can manage the cake catalog, add new cakes, and view all orders
- **Authentication** is secured with JWT tokens and role-based access control

This is a demonstration of a complete full-stack architecture with proper separation of concerns, secure authentication, and a responsive user interface.

---

## ✨ Features

### For Customers
✅ User registration and login with JWT authentication  
✅ Browse available cakes with details and pricing  
✅ Add cakes to cart with order management  
✅ View order history and status  
✅ Responsive design that works on mobile and desktop  
✅ Secure password hashing with bcryptjs  

### For Admins  
✅ Admin-only dashboard for cake management  
✅ Add new cakes to the catalog  
✅ Delete cakes from the catalog  
✅ View all customer orders  
✅ Track order status and manage orders  
✅ Role-based access control prevents unauthorized access  

### Technical Features
✅ JWT-based authentication with 1-day token expiration  
✅ Password validation and confirmation  
✅ Automatic role assignment (admin role for specific email)  
✅ MongoDB with proper data relationships  
✅ Clean MVC architecture  
✅ Error handling and validation  
✅ CORS enabled for cross-origin requests  

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.x** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with custom animations
- **Bootstrap 5** - Responsive UI framework
- **Vanilla JavaScript** - Dynamic interactions
- **jQuery** - DOM manipulation and AJAX

### Deployment
- **Render** - Backend hosting
- **Git/GitHub** - Version control

---

## 📁 Project Structure

```
assik8/
├── controllers/
│   ├── authController.js      # Auth logic (register, login)
│   ├── cakeController.js      # Cake CRUD operations
│   └── orderController.js     # Order CRUD operations
├── models/
│   ├── User.js                # User schema
│   ├── Cake.js                # Cake schema
│   └── Order.js               # Order schema
├── routes/
│   ├── auth.js                # Auth endpoints
│   ├── cakes.js               # Cake endpoints
│   └── orders.js              # Order endpoints
├── middleware/
│   ├── authMiddleware.js      # JWT verification
│   └── adminMiddleware.js     # Admin-only access check
├── public/
│   ├── index.html             # Home page
│   ├── account.html           # Login/Registration
│   ├── admin.html             # Admin dashboard
│   ├── menu.html              # Cake catalog
│   ├── cart.html              # Shopping cart
│   ├── about.html             # About us
│   ├── contact.html           # Contact info
│   ├── css/
│   │   └── style.css          # Global styles
│   └── js/
│       ├── auth.js            # Auth functions (legacy)
│       ├── account.js         # Registration/Login handler
│       ├── admin.js           # Admin dashboard logic
│       └── script.js          # Cart and payment logic
├── server.js                  # Express app setup
├── .env                       # Environment variables (not in git)
├── render.yaml                # Render deployment config
└── package.json               # Dependencies
```

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,                 // User's full name
  email: String (unique),       // Email address
  password: String (hashed),    // Bcrypted password
  role: String,                 // "user" or "admin"
  createdAt: Date,
  updatedAt: Date
}
```

### Cakes Collection
```javascript
{
  _id: ObjectId,
  name: String,                 // Cake name
  price: Number,                // Price in tenge
  description: String,          // Short description
  image: String,                // Image URL
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  cake: ObjectId (ref: Cake),   // Reference to cake
  quantity: Number,             // Quantity ordered
  customerName: String,         // Customer full name
  address: String,              // Delivery address
  status: String,               // "pending", "completed", "cancelled"
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login and get JWT token | No |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Login Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "user"
}
```

---

### Cake Routes (`/api/cakes`)

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|-----------|
| GET | `/` | Get all cakes | No | No |
| POST | `/` | Create new cake | Yes | Yes |
| PUT | `/:id` | Update cake | Yes | Yes |
| DELETE | `/:id` | Delete cake | Yes | Yes |

**Create Cake Request:**
```json
{
  "name": "Chocolate Dreams",
  "price": 5000,
  "description": "Rich chocolate cake with ganache",
  "image": "https://example.com/chocolate.jpg"
}
```

---

### Order Routes (`/api/orders`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create order | No |
| GET | `/` | Get all orders | Yes |
| GET | `/:id` | Get single order | Yes |
| PUT | `/:id` | Update order status | Yes |
| DELETE | `/:id` | Cancel order | Yes |

**Create Order Request:**
```json
{
  "cake": "507f1f77bcf86cd799439011",
  "quantity": 2,
  "customerName": "John Doe",
  "address": "123 Main St, Almaty"
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ako667/final_project.git
cd final_project
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file** in the root directory
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
PORT=3000
NODE_ENV=development
```

4. **Start the server**
```bash
npm start
```

The application will run at `http://localhost:3000`

---

## 📖 How to Use Locally

### As a Regular User
1. Go to `http://localhost:3000/account.html`
2. Click "Регистрация" (Register)
3. Fill in your details and create an account
4. You're logged in! Visit `http://localhost:3000` to browse
5. Go to "Торты" (Menu) to see available cakes
6. Add cakes to cart and checkout

### As an Admin
1. Register with email: **`akuan07@mail.ru`**
2. The system automatically assigns admin role to this email
3. After login, you'll be redirected to `http://localhost:3000/admin.html`
4. Manage cakes: add new ones, delete existing ones
5. View all customer orders and their status

### Testing the API with Postman
1. Download [Postman](https://www.postman.com/downloads/)
2. Import the API collection (see Postman Collection below)
3. Set the `base_url` variable to `http://localhost:3000`
4. Test all endpoints

---

## 🧪 Development Commands

```bash
# Start server (production mode)
npm start

# Start with auto-reload (requires nodemon)
npm run dev

# Install dependencies
npm install

# Check node version
node --version
```

---

## 🌐 Deployment

### Deploying to Render

1. **Push code to GitHub**
```bash
git add .
git commit -m "Deploy to Render"
git push origin main
```

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repo
   - Select your repository and branch

3. **Configure deployment**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Runtime: Node

4. **Set Environment Variables**
   - In Render dashboard, go to "Environment"
   - Add these variables:
     - `MONGO_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
   - Click "Deploy"

5. **Get Your Public URL**
   - Once deployed, Render assigns you a URL like: `https://cake-shop-abc123.onrender.com`
   - Your app is now live! 🎉

---

## 📊 Key Features Explained

### Authentication Flow
```
User Registration/Login → Password Hashed (bcryptjs) → JWT Token Generated → 
Token Stored in localStorage → Sent in API requests → Token Verified on Backend
```

### Role-Based Access (RBAC)
```
JWT Token Contains Role → 
If role === "admin" → Access admin-only endpoints/pages → 
If role === "user" → Access public pages and user features
```

### Automatic Admin Assignment
```
Registration Email === "akuan07@mail.ru" → Role automatically set to "admin"
Registration Email !== "akuan07@mail.ru" → Role default set to "user"
```

---

## ⚠️ Security Considerations

✅ **Password Security**: Passwords are hashed with bcryptjs (10 salt rounds)  
✅ **JWT Tokens**: Tokens expire after 24 hours for enhanced security  
✅ **Environment Variables**: Sensitive data stored in `.env`, not in code  
✅ **Input Validation**: All endpoints validate required fields  
✅ **Admin Protection**: Admin routes check JWT role before allowing access  
✅ **CORS**: Cross-origin requests are enabled but can be restricted  

---

## 🐛 Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
```

### "MongoDB connection error"
- Check your `MONGO_URI` in `.env`
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify username and password are correct (url-encoded if needed)

### "Invalid token" during login
- Clear localStorage: Run in browser console: `localStorage.clear()`
- Re-login to get a fresh token

### Admin page shows "Access denied"
- Only `akuan07@mail.ru` gets admin role
- Register with this email to access admin features

### "Port 3000 already in use"
```bash
# On Windows (PowerShell):
netstat -ano | findstr :3000

# Then kill the process:
taskkill /PID <PID> /F
```

---

## 📝 API Response Examples

### Successful Login
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWJjZGVmMTIzNDU2Nzg5MCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjA1M...",
  "role": "user"
}
```

### Error Response
```json
{
  "message": "Invalid credentials"
}
```

### Get All Cakes
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Chocolate Dreams",
    "price": 5000,
    "description": "Rich chocolate cake",
    "image": "https://example.com/cake.jpg"
  }
]
```

---

## 📚 Project Highlights

- **MVC Architecture**: Cleanly separated Models, Views, and Controllers
- **JWT Authentication**: Stateless authentication using JSON Web Tokens
- **Role-Based Access**: Admin and user roles with different permissions
- **Responsive Design**: Mobile-first approach using Bootstrap 5
- **Database Relationships**: Orders reference Cakes using MongoDB refs
- **Error Handling**: Comprehensive try-catch blocks throughout
- **Form Validation**: Server-side validation on all endpoints

---

## 🎯 What This Project Demonstrates

This project is a complete example of:
1. ✅ Full-stack web development (frontend + backend)
2. ✅ RESTful API design
3. ✅ User authentication and authorization
4. ✅ Database modeling and relationships
5. ✅ Frontend-backend integration
6. ✅ Production deployment
7. ✅ Error handling and validation
8. ✅ Security best practices

---

## 📞 Contact & Support

- **GitHub**: [ako667/final_project](https://github.com/ako667/final_project)
- **Issue Tracker**: GitHub Issues
- **Questions**: Create an issue with detailed description

---

## 📄 License

This project is open source and available under the ISC License.

---

## 🙌 Acknowledgments

- **Bootstrap** for responsive UI framework
- **MongoDB** for reliable database
- **Render** for easy deployment
- **Express.js** community for excellent documentation

---

**Made with ❤️ for learning full-stack development**

Last Updated: February 2026
