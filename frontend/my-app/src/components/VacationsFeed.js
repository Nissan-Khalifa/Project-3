import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UseContext'
import Navbar from './Navbar';


const VacationsFeed = () => {
    const context = useContext(UserContext)
   
    return (
        <>
            <Navbar />
            <div className='vacation-feed-container'>
                <div className="feed">
                    {context.vacations.map((vacation) => {
                        const { id, discreption, destination, img_url, start_date, end_date, price, followers } = vacation
                        const startDate = start_date.split('T')[0]
                        const endDate = end_date.split('T')[0]
                        return (
                            <div key={id} className='vacation-card'>
                                <div className="card-img">
                                    <img className='vac-img' src={img_url} alt="" />
                                    <p className='card-price'>{price}$</p>
                                </div>
                                <h4 className='card-disc'>{discreption}</h4>
                                <p className='card-dest'>{destination}</p>
                                <p>from: {startDate} <br /> to: {endDate}</p>
                                <p>{followers} <i className="fa-solid fa-heart"></i></p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default VacationsFeed