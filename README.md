# React and Firebase E-Commerce Website For Cloud Platform

This is a modern, responsive e-commerce application built using **React** for the frontend and **Firebase** for backend services like authentication, database, and hosting. The project demonstrates seamless integration between a React-based UI and Firebase functionalities to deliver an engaging shopping experience.

## Features

- **User Authentication**: Sign up, log in, and log out functionalities using Firebase Authentication.
- **Product Management**: Display of products with categories, filtering, and sorting options.
- **Cart System**: Add, remove, and update product quantities in the shopping cart.
- **Order Management**: Checkout process with order summary.
- **Real-time Database**: Use of Firebase Firestore for storing user and order data.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Hosting**: Deployed on IBM CLOUD.

## Tech Stack

- **Frontend**: React, React Router, Context API
- **Backend Services**: Firebase Authentication, Firebase Firestore
- **Styling**: CSS, tailwind css

## Installation

Follow the steps below to get a local copy up and running:

1. Clone the repository:
   ```bash
   git clone https://github.com/RealCifer/IBM-CLOUD.git
   ```

2. Navigate to the project directory:
   ```bash
   cd IBM-CLOUD
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up Firebase:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project and enable Authentication and Firestore.
   - Obtain your Firebase config object and replace the placeholder in `src/firebaseConfig.js`.

5. Start the development server:
   ```bash
   npm start
   ```

6. Open the application in your browser at `http://localhost:3000/`.

## Project Structure

```
React-And-Firebase-Ecommerce/
├── public/               # Static files
├── src/                  # Source files
│   ├── components/       # React components
│   ├── contexts/         # Context API setup
│   ├── firebaseConfig.js # Firebase configuration
│   ├── pages/            # Page components (Home, Login, Cart, etc.)
│   ├── styles/           # CSS files
│   ├── App.js            # Main App component
│   └── index.js          # React DOM rendering
├── .firebaserc           # Firebase project configuration
├── firebase.json         # Firebase hosting configuration
├── package.json          # Node.js dependencies
└── README.md             # Project documentation
```

## Deployment

1. Build the project for production:
   ```bash
   npm run build
   ```
2. How to Run the project:
   ```bash
   npm run dev
   ```
   
3. Deploy to Firebase Hosting:
   ```bash
   firebase deploy
   ```

Ensure you have Firebase CLI installed and configured with your Firebase project.


## Contribution

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

