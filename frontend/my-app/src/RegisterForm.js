import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserContext } from './UseContext'



const RegisterForm = () => {
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
        const data = {
            first_name: formReturn.first_name,
            last_name: formReturn.last_name,
            username: formReturn.username,
            password: formReturn.password
        }
        console.log(data);

        await axios({
            method: 'post',
            url: 'http://localhost:6969/users/register',
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
                <form className='register-container' onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <input className='form-input' placeholder='First Name:' type="text" {...register("first_name")} />
                    </label>
                    <label>
                        <input className='form-input' placeholder='Last Name:' type="text" {...register("last_name")} />
                    </label>
                    <label>
                        <input className='form-input' placeholder='Username:' type="text" {...register("username")} />
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
                    <button className='form-submit-btn' type='submit'> Sign Up</button>
                    <a className='change-form-link' href="/">Already have an account? Sign In</a>
                </form>
            </div>
        </>
    )
}

export default RegisterForm