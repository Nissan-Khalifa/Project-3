import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';



export const UserContext = React.createContext({});

export function ContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [jwt, setJwt] = useState('')
  const navigate = useNavigate()
  const [vacations, setVacations] = useState([])

  const logout = () => {
    alert('are you sure you want to logout?')
    Cookies.remove('token')
    navigate('/');
  }

  async function fetchVacations() {
    setIsLoading(true)
    const token = Cookies.get('token')
    if (!token) {
      navigate('/')
      return
    }
    await axios({
      method: 'get',
      url: 'http://localhost:6969/vacations',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setVacations(res.data)
        navigate('/vacation-feed');
        setIsLoading(false)
      }
      )
      .catch(error => {
        console.error(error);
      })
  }

  useEffect(() => {
    fetchVacations()
  }, [])


  return (
    <UserContext.Provider value={{ jwt, setJwt, fetchVacations, vacations, setVacations, logout, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
}
