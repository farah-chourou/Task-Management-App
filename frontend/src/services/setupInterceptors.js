import axios from "axios"


const setup = () => {
    axios.interceptors.response.use((response) => {
        return response
      }, async function (error) {
        const originalRequest =  error.config;
        if (error.config.url != "http://localhost:3001/user/refreshtoken" && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry =   true;
            console.log("step2")
            const refreshToken= localStorage.getItem("user").refreshToken
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
  
  };
  
  export default setup;