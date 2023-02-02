import React, { useContext } from 'react'
import { UserContext } from './UseContext'

const Navbar = () => {
    const context = useContext(UserContext)


    return (

        <div>{context.data.message}</div>

    )
}

export default Navbar