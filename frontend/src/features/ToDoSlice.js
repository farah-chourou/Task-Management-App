import { createSlice,current } from "@reduxjs/toolkit";
import axios from "axios"

const ToDoSlice = createSlice({
  name: "LIST_TODO",
  initialState :{
  list :[]
  } ,
  reducers: {
    listAdded(state, action) {
      state.list.push(action.payload);  //payload  contains the data we need to pass to the reducers.
      },
   deleteItem(state,action){
     console.log(current(state)) //to not get  a proxy state
     state.list = state.list.filter((item)=> item._id !== action.payload)
    },

    editItem(state,action){
    const id = action.payload._id;
    state.list.map((item) => {
      if(item._id == id){
        item.toDo= action.payload.toDo;
   }

    })
  },
  getToDos(state,action){
    state.list =action.payload;
  },
  checkIfDo(state,action){
    const id = action.payload._id;
    state.list.map((item) => {
      if(item._id == id){
        item.do= action.payload.do;
   }

    })
  },
  clearState(state,action){
    state.list =[];
  },


  },
})

export const getToDoList = (listId) => async dispatch => {
  try {
    const response =  await axios.get('http://localhost:3001/getToDos/'+listId)
    dispatch(getToDos(response.data))
  }catch(err){
    console.log(err)
  }
}

export const editToDoList = (id, newToDo) => async dispatch => {
  try {
    console.log("step 1 ")
    console.log(newToDo)
    const response =  await axios.patch('http://localhost:3001/edit/' +id , { toDo : newToDo}  )
    console.log("step 2 ")
    console.log(response.data)
    dispatch(editItem(response.data))
    console.log("step 3 ")

  }catch(err){
    console.log(err)
  }
}

export const deleteToDoList = (idd) => async dispatch => {
  try {

    await axios.delete('http://localhost:3001/delete/' +idd )
    dispatch(deleteItem(idd))

  }catch(err){
    console.log(err)
  }
}

export const addToDoList = (ToDo,listId) => async dispatch => {
  try {
    console.log(ToDo+"******"+ listId)

   const response =  await axios.post('http://localhost:3001/add/'+listId , {toDo:ToDo})
   console.log("step2")

    dispatch(listAdded(response.data))
    console.log(ToDo+"******"+ listId)

  }catch(err){
    console.log(err)
  }
}



export const checkToDoList = (id, check) => async dispatch => {
  try {
    const response =  await axios.patch('http://localhost:3001/ckeckIfDo/' +id , { do : check}  )
    dispatch(checkIfDo(response.data))
  }catch(err){
    console.log(err)
  }
}

export const { listAdded,deleteItem,editItem,getToDos,checkIfDo,clearState } = ToDoSlice.actions;
export default ToDoSlice.reducer;