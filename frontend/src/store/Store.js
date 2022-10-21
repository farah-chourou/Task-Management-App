import { configureStore } from "@reduxjs/toolkit";
import ToDoSlice from "../features/ToDoSlice";
import ListSlice  from "../features/ListSlice";
import authSlice from "../features/authSlice"

export default configureStore({
  reducer: {
    toDo :ToDoSlice,
    collection: ListSlice,
    auth: authSlice,


    
  },
});