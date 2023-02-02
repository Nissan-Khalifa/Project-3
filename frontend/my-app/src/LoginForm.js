import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { UserContext } from './UseContext'



const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const context = useContext(UserContext)

    const onSubmit = async (formReturn) => {
        const data = { username: formReturn.username, password: formReturn.password }
        console.log(data);
        //
        await axios({
            method: 'post',
            url: 'http://localhost:6969/users/login',
            data: data
        })
            .then(res => {
                console.log(res);
                console.log(res.data.accessToken);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <>
            <div >
                <p>{context.data.message}</p>
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
                            type={context.passwordType}
                            name="password"
                            {...register("password")}
                        />
                        <i className="fa-solid fa-eye" id="eye" onClick={context.handleEyeClick}></i>
                    </label>
                    <button className='form-submit-btn' type='submit'>Log In</button>
                    <a className='change-form-link' href="/register">Don't have an account? Sign Up</a>
                </form>
            </div>
        </>
    )
}

export default LoginForm