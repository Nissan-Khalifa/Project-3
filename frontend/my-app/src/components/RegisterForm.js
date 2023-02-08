import React, { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Cookies from 'js-cookie'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserContext } from '../UseContext'



const RegisterForm = () => {

    const [passwordType, setPasswordType] = useState('password');
    const [eyeIcon, setEyeIcon] = useState('fa-eye');
    const handleEyeClick = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
        setEyeIcon(eyeIcon === 'fa-eye' ? 'fa-eye-slash' : 'fa-eye')
    };

    const context = useContext(UserContext)

    const formValidation = yup.object().shape({
        username: yup.string().required('Username is required').max(20, 'Username must be less than 20 characters'),
        password: yup.string().required('Password is required').max(16).min(8)
            .matches(/[A-Z]/, 'must have at least one uppercase letter')
            .matches(/[a-z]/, 'must have at least one lowercase letter')
            .matches(/\d{2}/, 'must have at least two digits')
            .notOneOf([' ', '\t'], 'cannot contain spaces or tabs')
    })
    const { register, handleSubmit } = useForm({ resolver: yupResolver(formValidation) })

    const onSubmit = async (formReturn) => {
        context.setIsLoading(true)
        if (!formReturn) return
        const data = {
            first_name: formReturn.first_name,
            last_name: formReturn.last_name,
            username: formReturn.username,
            password: formReturn.password
        }
        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:6969/users/register',
                data: data
            })
            const accessToken = res.data.accessToken;
            Cookies.set('token', `${accessToken}`, { expires: 1 })
            context.setJwt(accessToken);

            if (accessToken) {
                await context.fetchVacations(accessToken);
                context.setIsLoading(false)
            } else {
                console.error('not authorized');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <>
            <div className='register-component'>
                <div className="form-page-title">
                    <h1>Travelers</h1>
                </div>
                <form className='register-container' onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <input
                            className='form-input'
                            placeholder='First Name:'
                            type="text"
                            {...register("first_name")}
                        />
                    </label>
                    <label>
                        <input
                            className='form-input'
                            placeholder='Last Name:'
                            type="text"
                            {...register("last_name")} />
                    </label>
                    <label>
                        <input
                            className='form-input'
                            placeholder='Username:'
                            type="text"
                            {...register("username")} />
                    </label>
                    <label className='password-container'>
                        <input
                            className='form-input'
                            placeholder='Password:'
                            type={passwordType}
                            name="password"
                            {...register("password")}
                        />
                        <i className={`fa-solid ${eyeIcon}`} id="eye" onClick={handleEyeClick}></i>
                    </label>
                    <button className='form-submit-btn' type='submit'> Sign Up</button>
                    <a className='change-form-link' href="/">Already have an account? Sign In</a>
                </form>
            </div>
        </>
    )
}

export default RegisterForm