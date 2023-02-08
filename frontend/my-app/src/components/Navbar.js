import React, { useContext } from 'react'
import { UserContext } from '../UseContext'

const Navbar = () => {
    const context = useContext(UserContext)

    return (
        <>
            <nav className='navbar'>
                <div className='nav-header'>
                    <h1>Travelers</h1>
                </div>
                <div className='navbar-elements'>
                    <span className='nav-element'>
                        <a className='nav-link' href="vacation-feed">home page</a>
                    </span>
                    <span className='nav-element'>
                        <a className='nav-link' href="about">about</a>
                    </span>
                    <span className='nav-logout-element'>
                        <button className='nav-logout-btn' onClick={() => context.logout()}>Log Out</button>
                    </span>
                </div>
            </nav>
        </>
    )
}

export default Navbar