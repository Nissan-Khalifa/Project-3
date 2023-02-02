import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm';
import VacationsFeed from './VacationsFeed';
import { ContextProvider } from './UseContext'
import Navbar from './Navbar';


function App() {
  return (
    <ContextProvider>
      <h1>TravelO</h1>
      <Navbar />
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='register' element={<RegisterForm />} />
        <Route path='vacation-feed' element={<VacationsFeed />} />
      </Routes>
    </ContextProvider>
  )
}

export default App;
