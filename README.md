# MERN CRUD Practice Project

**Developed by: Nikhil Parmar**

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Active-success)

This is a full-stack **MERN (MongoDB, Express, React, Node.js) CRUD application** built to demonstrate real-world frontend and backend integration. The project showcases how data is created, read, updated, and deleted using a **RESTful API** with a **MongoDB Atlas cloud database** and a modern **React-based user interface**.

---

## 🚀 Live Demo Features

- **Create**: Add new user records with real-time validation (Name, Email, Age, Gender).
- **Read**: View all users in a structured, paginated table format.
- **Update**: Edit existing user details instantly via modal popups.
- **Delete**: Remove users with confirmation dialogs (secured).
- **Real-time**: Updates are reflected instantly without page reloads.

---

## 🛠️ Technology Stack

### **Frontend**
- **React.js**: Component-based UI architecture.
- **Semantic UI**: Professional and responsive styling.
- **Axios**: HTTP client for API communication.
- **Socket.io-client**: Real-time event handling.

### **Backend**
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building REST APIs.
- **Mongoose**: ODM for MongoDB interaction.
- **Socket.io**: Real-time bidirectional communication.

### **Database**
- **MongoDB Atlas**: Cloud-hosted NoSQL database for secure data storage.

---

## 📂 Project Structure

```
mern-crud/
├── models/             # Mongoose database schemas
├── routes/             # Express API routes
├── react-src/          # React Frontend Source
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── App.js      # Main application logic
│   │   └── ...
├── server.js           # Backend entry point
├── package.json        # Backend dependencies
└── README.md           # Project documentation
```

---

## 🔧 Installation & Setup Guide

To run this project locally on your machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nbparmar103-arch/mern-crud-practice.git
    cd mern-crud-practice
    ```

2.  **Install Backend Dependencies:**
    ```bash
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd react-src
    npm install
    cd ..
    ```

4.  **Configure Environment Variables:**
    - Create a `.env` file in the root directory.
    - Add your MongoDB connection string:
      ```
      MONGO_URI=your_mongodb_connection_string
      ```

5.  **Run the Application:**
    ```bash
    npm run dev
    ```
    - The **Backend** will start on port `3000`.
    - The **Frontend** will start on port `4200`.
    - Automatically opens in your browser at `http://localhost:4200`.

---

## 🎯 Purpose

This project was developed by **Nikhil Parmar** to demonstrate proficiency in:
- **Full-stack MERN Development**: Connecting React with Node/Express.
- **API Integration**: Handling RESTful services (GET, POST, PUT, DELETE).
- **Database Management**: Working with Cloud NoSQL databases.
- **State Management**: Managing application state effectively.
- **Professional Workflow**: Using Git, GitHub, and clean code practices.

---

## 👨‍💻 Author

**Nikhil Parmar**  
*Full-Stack Web Developer*  
[GitHub Profile](https://github.com/nbparmar103-arch) | [LinkedIn](www.linkedin.com/in/nikhil-frontend-dev)

---

&copy; 2026 Nikhil Parmar. All Rights Reserved.
