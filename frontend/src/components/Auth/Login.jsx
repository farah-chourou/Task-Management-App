import React, { useState , useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {userLogin} from  "../../features/authSlice"
import * as yup from 'yup';

    
const schema = yup.object({
  email: yup.string().required("email is required").email("invalid email"),
  password: yup.string().required('Password is required')
})

function Login() {

    const refInput = useRef(null)
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { register, handleSubmit, formState:{ errors } } = useForm({
      resolver: yupResolver(schema)
    });
    const onLogin = (data) =>{
      console.log(data.email)
      console.log(data.password)
      dispatch(userLogin( {email: data.email, password: data.password} ))

    } 
  

    const loadUser = async () => {
      try{
       const response =  await axios.get("http://localhost:3001/user/me")
       console.log(response.data)
 
      }catch(e){
       console.log(e)
      }
     }
  return (
    <div>
        <h1> Login </h1> 
      <form onSubmit={handleSubmit(onLogin)}>

      <input {...register("email")}  className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
      <p  className="invalid-feedback">{errors.email?.message}</p>


      <input type="password" {...register("password")} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
      <p  className="invalid-feedback">{errors.password?.message}</p>

      <button onClick={loadUser}> me </button>

        

        <input type="submit" />
    </form>

     






    </div>
  )
}

export default Login