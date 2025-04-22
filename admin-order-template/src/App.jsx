import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/Login";
import OrdersPage from "./pages/OrdersPage";

const App = () => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  console.log('isAtuh',isAuthenticated)

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={  <LoginPage />}
        />
        <Route
          path="/"
          element={ <OrdersPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
