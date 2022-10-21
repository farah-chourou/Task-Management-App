import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {userLogin, userRegister} from "../../features/authSlice"


const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email("invalid email"),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(40, 'Password must not exceed 40 characters'),
  confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Confirm Password does not match'),
}).required();

export default function Register() {

  const dispatch = useDispatch()

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) =>{
    console.log(data);

    dispatch(userRegister({name: data.name, email: data.email, password : data.password}))
  } 

  return (
    <div >
    <h1> Register</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      name: 
      <input type="text" {...register("name")} className={`form-control ${errors.name? 'is-invalid' : ''}`} />
      <p  className="invalid-feedback"> {errors.name?.message}</p>
       email:
      <input {...register("email")}  className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
      <p  className="invalid-feedback">{errors.email?.message}</p>
       password:
      <input type="password" {...register("password")} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
      <p  className="invalid-feedback">{errors.password?.message}</p>
      confirmPassword:
      <input  type="password" {...register("confirmPassword")} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
      <p  className="invalid-feedback">{errors.confirmPassword?.message}</p>

      <input type="submit" />
    </form>
    </div> 
  );
}