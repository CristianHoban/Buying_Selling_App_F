import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import MainPage from './MainPage';
import Profile from './Profile';
import UserOffers from './UserOffers'; // Import the UserOffers component
import UserContext from './UserContext';
import Register from './Register';
import AddProduct from './AddProduct';
import Transactions from './Transactions';
import Reviews from './Reviews';
import LeaveReview from './LeaveReview';
import AdminPage from './AdminPage';

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}> 
      <Router>
          <div className="App">
              <main>
                  <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />}/>
                      <Route path="/mainPage" element={<MainPage />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/userOffers" element={<UserOffers />} /> 
                      <Route path="/addProduct" element={<AddProduct />} />
                      <Route path="/transactions" element={<Transactions />} /> 
                      <Route path="/reviews" element={<Reviews />} /> 
                      <Route path="/leaveReview" element={<LeaveReview />} />
                      <Route path="/adminPage" element={<AdminPage />} />
                      <Route path="/" element={<Navigate replace to="/login" />} />
                  </Routes>
              </main>
          </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
