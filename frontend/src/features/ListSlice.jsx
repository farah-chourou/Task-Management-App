import { createSlice,current } from "@reduxjs/toolkit";
import axios from "axios"


const ListSlice = createSlice({
 name:"COLLECTION_TODO",
 initialState:{
    list:[]
 },

 reducers:{
     getAllCollection(state,action){
        state.list = action.payload
     }, 
     addCollection(state,action){
        state.list.push(action.payload)
     }
 }

})

export const getColection = () => async dispatch => {
    try {
      const response = await axios.get('http://localhost:3001/list/getAllList')

      dispatch(getAllCollection(response.data))
      console.log(response.data)
        
    } catch (error) {
        console.log(error)
    }
}


export const AddCollection  =(name, description) => {
 return async dispatch => {
    try {
        console.log("step1")
        const response = await axios.post('http://localhost:3001/list/addList',{name:name, description:description})
        console.log("step2")
        dispatch(addCollection(response.data))
        console.log(response.data)
          
      } catch (error) {
          console.log(error)
      }

}}
export const {getAllCollection,addCollection} = ListSlice.actions
export default ListSlice.reducer;