import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm';
import VacationsFeed from './components/VacationsFeed';
import { ContextProvider } from './UseContext'


function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='register' element={<RegisterForm />} />
        <Route path='vacation-feed' element={<VacationsFeed />} />
        <Route path='home-page' element={<VacationsFeed />} />
        <Route path='about' element={<About />} />
      </Routes>
    </ContextProvider>
  )
}

export default App;
