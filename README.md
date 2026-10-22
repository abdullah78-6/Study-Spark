# 🎓 Study Spark — AI-Powered Online Learning Platform

Study Spark is a full-stack online learning platform built using the MERN stack. It provides a digital learning environment where students can access courses and educational resources, while teachers can manage and publish learning content.

## ✨ Features

- 🔐 **Authentication:** JWT authentication and Google sign-in.
- 👨‍🎓 **Student & Teacher Accounts:** Separate experiences for students and teachers.
- 📚 **Course Management:** Teachers can create and manage courses.
- 📝 **Study Notes:** Access educational notes and learning materials.
- 📄 **Previous Year Questions (PYQs):** Access and preview previous-year question papers.
- 💳 **Online Payments:** Razorpay payment gateway integration.
- 📊 **Dashboard:** Manage courses, resources, and learning activities.
- 📑 **PDF Preview:** Preview educational documents within the platform.
- ☁️ **File Storage:** Integration with cloud file-storage services used by the application.
- 📱 **Responsive UI:** User-friendly interface for different screen sizes.

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Authentication & Services**
- JWT Authentication
- Google Authentication / Firebase
- Razorpay Payment Gateway
- ImageKit / Cloudinary, where configured

## 📁 Project Structure

```text
AI-ONLINE-LEARNING-PLATFORM/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── firebase.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── README.md
```

## ⚙️ Prerequisites

Before running this project, install:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)
- MongoDB or a MongoDB Atlas database

Check your installations:

```bash
node -v
npm -v
git --version
```

## 🚀 Installation & Setup

### 1. Clone the repository

Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub details.

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Configure frontend environment variables

Create a `.env` file inside the `client` folder.

Example:

```env
VITE_API_URL=http://localhost:5000
```

Use the variable name expected by your frontend code. If your application currently uses a different API URL variable, configure that name instead.

If Google Authentication is enabled, configure your Firebase project settings according to your `firebase.js` implementation.

### 4. Start the frontend

From the `client` directory, run:

```bash
npm run dev
```

The frontend will usually be available at:

```text
http://localhost:5173
```

Open the URL printed in your terminal if it differs.

### 5. Install backend dependencies

Open a **second terminal** at your project root and run:

```bash
cd server
npm install
```

### 6. Configure backend environment variables

Create a `.env` file inside the `server` folder.

Example configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173

RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

Add any additional environment variables required by your application, including cloud storage credentials if applicable.

**Important:** These are example variable names. Check `server.js`, your database connection, and your controllers to ensure they match the actual variables used in your code.

Never share or commit your real secret keys.

### 7. Start the backend

From the `server` directory, run the command defined in your `server/package.json`.

If the project defines a `dev` script:

```bash
npm run dev
```

If it defines a `start` script instead:

```bash
npm start
```

The backend should start on the configured port, for example `5000`.

## ▶️ Running the Complete Project

Keep two terminals open.

**Terminal 1 — Frontend**

```bash
cd client
npm run dev
```

**Terminal 2 — Backend**

```bash
cd server
npm run dev
```

If your backend does not have a `dev` script, use its configured start command.

Make sure the frontend API URL matches the backend port and that the backend CORS configuration allows your frontend origin.

## 💳 Razorpay Payment Integration

This project supports Razorpay integration for online course payments.

For local testing:

1. Create a Razorpay account.
2. Enable test mode and obtain test API credentials.
3. Configure the credentials in the backend `.env` file.
4. Test order creation and payment verification.
5. Verify payment signatures on the backend.

Never expose your Razorpay secret key in frontend code or commit payment credentials to GitHub.

## 🌐 Deployment

The frontend and backend can be deployed separately.

- **Frontend:** Build using `npm run build` inside `client`.
- **Backend:** Deploy the Node.js application using the start script configured in `server/package.json`.
- Configure the frontend with the deployed backend API URL.
- Configure backend CORS to allow your deployed frontend domain.
- Add environment variables through your hosting provider's environment settings.
- Configure Firebase authorized domains for production authentication.
- Use Razorpay test credentials while testing and live credentials only when ready for production.

## 🔒 Security

- Never upload `.env` files or secret credentials to GitHub.
- Keep database credentials and JWT secrets private.
- Keep payment secrets exclusively on the backend.
- Configure CORS appropriately.
- Validate requests and verify payment signatures on the server.
- Do not commit `node_modules`; dependencies can be installed with `npm install`.

## 🤝 Contributing

Contributions and suggestions are welcome!

1. Fork this repository.
2. Create a new branch.
3. Make your changes.
4. Test your changes.
5. Submit a pull request.

## 📄 License

No license has been specified yet. Add a `LICENSE` file if you intend to publish this project under an open-source license.

---

**Study Spark** — Making online learning more accessible through technology. 🎓
