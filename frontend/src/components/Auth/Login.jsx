import React, { useState , useRef} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
function Login() {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const refInput = useRef(null)
    const navigate = useNavigate()

    async function   login  (){
      refInput.current.focus()
    try {
        const response = await  axios.post('http://localhost:3001/user/login', {email : Email, password : Password})
        const refreshToken = response.data.refreshToken
        localStorage.setItem("refreshToken", refreshToken)
        localStorage.setItem("accessToken", response.data.accessToken)

        console.log(response.data.accessToken)
        //sets authorization headers for all requests
        axios.defaults.headers.common['authorization'] = `Bearer ${response.data.accessToken}`;

      //  await  loadUser()
       // navigate('/list')
        
    } catch (error) {
        console.log(error)
        
    }

    }
    axios.interceptors.response.use((response) => {
      return response
    }, async function (error) {
      console.log("step1")
      const originalRequest =  error.config;
       console.log(originalRequest._retry)
      if (error.config.url != "http://localhost:3001/user/refreshtoken" && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry =   true;
          console.log("step2")
          const refreshToken= localStorage.getItem("refreshToken")
          console.log(refreshToken)
          axios.defaults.headers.common['authorization'] = await `Bearer ${refreshToken}`;
          console.log(`Bearer ${refreshToken}`);
          await axios.post('http://localhost:3001/user/refreshtoken').then((response) => {
            // TODO: mettre à jour l'accessToken dans le localStorage
            console.log("step3")
         
            originalRequest.headers['authorization'] = `Bearer ${response.data.accessToken}` ;
            axios.defaults.headers.common['authorization'] = `Bearer ${response.data.accessToken}`; 
            console.log(`Bearer ${response.data.accessToken}`)

          })
          return axios(originalRequest);
        
      }
      return Promise.reject(error);
    }); 

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

        <input type="email"  ref={refInput} name='Email' onChange={(e)=> setEmail(e.target.value)}/> <br></br> 
        <input type="password"  name='Password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={login}> log in </button>

        <button onClick={loadUser}> me </button>

        


     






    </div>
  )
}

export default Login