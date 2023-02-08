import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { UserContext } from '../UseContext'
import Cookies from 'js-cookie'




const LoginForm = () => {

    const [passwordType, setPasswordType] = useState('password');
    const [eyeIcon, setEyeIcon] = useState('fa-eye');
    const handleEyeClick = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
        setEyeIcon(eyeIcon === 'fa-eye' ? 'fa-eye-slash' : 'fa-eye')
    };

    const { register, handleSubmit } = useForm();
    const context = useContext(UserContext)

    const onSubmit = async (formReturn) => {
        context.setIsLoading(true)

        if (!formReturn) return
        const data = { username: formReturn.username, password: formReturn.password }

        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:6969/users/login',
                data: data
            });

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
            <div className='login-component'>
                <div className="form-page-title">
                    <h1>Travelers</h1>
                </div>
                <form className='login-container' onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <input
                            className='form-input'
                            placeholder='Username:'
                            type="text"
                            name="username"
                            {...register("username")}
                            required
                        />
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
                    <button className='form-submit-btn' type='submit'>Log In</button>
                    <a className='change-form-link' href="/register">Don't have an account? Sign Up</a>
                </form>
            </div>
        </>
    )
}

export default LoginForm