# **Wolkite University**  
## Clearance Management System - Employee  

Welcome to the **Clearance Management System** designed specifically for Wolkite University employees. This system streamlines the clearance process, ensuring a seamless and efficient experience for employees leaving or transitioning within the university. Built with modern technologies, this project features a **Next.js frontend**, a **Node.js backend**, and a **MongoDB database**, all wrapped in a clean and responsive design using **HTML** and **CSS**.  

---

## 🌟 Key Features  
- **Employee-Friendly Interface**: A user-friendly dashboard for employees to initiate and track clearance requests.  
- **Automated Workflow**: Automated notifications and reminders for pending tasks.  
- **Secure Authentication**: Role-based access control to ensure data security.  
- **Real-Time Updates**: Real-time status updates for clearance requests.  
- **Responsive Design**: Optimized for both desktop and mobile devices.  

---

## 🛠️ Technologies Used  
- **Frontend**: Next.js (React-based framework for server-side rendering).  
- **Backend**: Node.js with Express.js for robust API development.  
- **Database**: MongoDB for flexible and scalable data storage.  
- **Styling**: HTML and CSS for a clean and modern UI.  
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication.  

---

## 🚀 How to Run the Project  

### **Prerequisites**  
- **Node.js** (v16 or higher) installed.  
- **MongoDB** installed and running.  
- **Git** for cloning the repository.  

### Step 1: Clone the Repository  
git clone https://github.com/your-username/clearance-management-system.git  
cd clearance-management-system

### **Step 2: Set Up the Backend**  
**1. Navigate to the backend folder:**  
   cd backend
**Install dependencies:**
npm install  
**Create a .env file in the backend folder and add the following environment variables:**
**env**
- PORT=5000  
- MONGODB_URI=mongodb+srv://Yoni1234:Yoni1234@cluster0.mtfbx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0  
- NEXTAUTH_SECRET=xK1laZE1FUGziLHcVncc2JGQGtDdLnMr6hzXx9cFXK4=  
- NEXTAUTH_URL=http://localhost:3000  
- EMAIL_SERVER=smtp.gmail.com  
- EMAIL_USER=wkuecms@gmail.com  
- EMAIL_PASSWORD=xbvi achd rtes hstg  
**npm start**

### **Step 3: Set Up the Frontend
**Navigate to the frontend folder:**
cd ../frontend  
**Install dependencies:**
npm install  
**Create a .env.local file in the frontend folder and add the following environment variables:**
**env**
NEXT_PUBLIC_API_URL=http://localhost:5000  
**Start the frontend development server:**
**npm run dev**  
### **Step 4: Access the Application
Open your browser and navigate to:
http://localhost:3000  
### **🧩 Database Schema
**The MongoDB database consists of the following collections:**

Users: Stores employee and admin details.

ClearanceRequests: Tracks clearance requests and their status.

Departments: Manages department-specific clearance tasks.

### **📂 Project Structure

### **clearance-management-system/  
**├── backend/               # Node.js backend**  
**│   ├── controllers/       # Business logic**  
**│   ├── models/            # MongoDB models**  
**│   ├── routes/            # API routes**  
**│   └── server.js          # Entry point**  
**├── frontend/              # Next.js frontend**  
**│   ├── components/        # Reusable components**  
**│   ├── pages/             # Application pages**  
**│   ├── styles/            # CSS files**  
**│   └── utils/             # Utility functions**  
**└── README.md              # Project documentation**  
### **🤝 Contributing
###**We welcome contributions! If you'd like to contribute to this project, please follow these steps:**

Fork the repository.

Create a new branch for your feature or bugfix.

Commit your changes and push to your branch.

Submit a pull request with a detailed description of your changes.

### **📄 License
**This project is licensed under the MIT License. See the LICENSE file for details.**

### **🙏 Acknowledgments
**Special thanks to the Wolkite University team for their support and feedback during the development of this system.**

###### **Get started today and experience a hassle-free clearance process! 🎉
