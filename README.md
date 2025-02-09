# E-commerce Application

## Project Setup

This project is an e-commerce application that uses a MERN stack architecture, integrating React.js for the frontend, Express.js for the backend, and MongoDB for the database. Payment integration is handled using Braintree.

---

## Environment Variables

Make sure to set the following environment variables in a `.env` file in the root directory:

```env
PORT=8002
DEV_MODE=development
REACT_APP_API=http://localhost:8002
```

---

## Getting Started

### Backend Setup

1. Install dependencies:
    ```bash
    npm install
    ```

2. Start the development server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1. Navigate to the `client` directory:
    ```bash
    cd client
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

---

## Features

- User Authentication (JWT-based)
- Product Management (CRUD operations)
- Payment Gateway Integration using Braintree
- Secure API endpoints
- State management with Redux

---

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user and issue a JWT

### Products
- `GET /api/products`: Fetch all products
- `POST /api/products`: Add a new product (Admin only)
- `PUT /api/products/:id`: Update a product (Admin only)
- `DELETE /api/products/:id`: Delete a product (Admin only)

### Payments
- `POST /api/payments`: Process a payment with Braintree

---

## Dependencies

### Backend
- Express.js
- MongoDB
- Braintree
- JWT for Authentication

### Frontend
- React.js
- Redux
- Axios
- Tailwind CSS (optional)

---

## Deployment

1. Configure environment variables for production.
2. Build the frontend:
    ```bash
    npm run build
    ```
3. Deploy the backend server and serve the built frontend.

---

## Security Notes

- Never expose sensitive environment variables in public repositories.
- Use environment variable management tools in production environments.

---

## Contributors
- Kishan Kumar

