# MERN Stack E-commerce Platform

A full-featured e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that provides a complete online shopping experience similar to Amazon.

## Features

### Frontend (React.js)
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Product Catalog**: Browse products with search, filtering, and sorting
- **Product Details**: Detailed product pages with image galleries and reviews
- **Shopping Cart**: Persistent cart with quantity management
- **User Authentication**: Login/register with JWT tokens
- **User Profile**: Manage personal information and view order history
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Backend (Node.js/Express.js)
- **RESTful API**: Well-structured API endpoints
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Error Handling**: Comprehensive error handling middleware

### Database (MongoDB)
- **User Management**: User profiles with roles (user/admin)
- **Product Management**: Products with categories, images, and reviews
- **Cart System**: Persistent shopping cart storage
- **Order Management**: Complete order processing and tracking

## Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Development**: Vite, Concurrently, Nodemon

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mern-ecommerce-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add the following:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database-name?retryWrites=true&w=majority

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d

   # Client Configuration
   CLIENT_URL=http://localhost:5173

   # API Configuration (for frontend)
   VITE_API_URL=http://localhost:5000/api
   ```

### MongoDB Atlas Setup

1. **Create a MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a New Cluster**
   - Click "Build a Database"
   - Choose the free tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Set up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and strong password
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Set up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development, you can click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add only your server's IP address

5. **Get Connection String**
   - Go to "Clusters" and click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your desired database name (e.g., "ecommerce")

6. **Update your .env file**
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

### Running the Application

1. **Start both frontend and backend**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:5173

2. **Or run them separately**
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

### Initial Setup

1. **Create an Admin User**
   - Register a new account through the frontend
   - Manually update the user's role to 'admin' in MongoDB Atlas:
     - Go to your cluster → Browse Collections
     - Find the 'users' collection
     - Edit your user document and change `role` from 'user' to 'admin'

2. **Add Sample Products**
   - Use the sample products data in `server/data/sampleProducts.js`
   - You can create products through the admin interface or import them directly

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filtering, sorting, pagination)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `POST /api/products/:id/reviews` - Add product review

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:productId` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/pay` - Update order to paid
- `GET /api/orders/admin/all` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Project Structure

```
mern-ecommerce-platform/
├── server/                 # Backend code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── data/              # Sample data
│   └── server.js          # Server entry point
├── src/                   # Frontend code
│   ├── components/        # React components
│   ├── contexts/          # React contexts
│   ├── pages/             # Page components
│   └── App.tsx            # Main App component
├── public/                # Static files
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=your-mongodb-connection-string

# JWT Configuration
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d

# Client Configuration
CLIENT_URL=http://localhost:5173

# API Configuration (for frontend)
VITE_API_URL=http://localhost:5000/api
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet for security headers
- Protected routes and role-based access

## Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Email notifications
- Advanced search with Elasticsearch
- Product recommendations
- Inventory management
- Multi-vendor support
- Real-time chat support
- Mobile app with React Native

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.