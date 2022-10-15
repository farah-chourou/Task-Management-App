import { configureStore } from "@reduxjs/toolkit";
import ToDoSlice from "../features/ToDoSlice";
import ListSlice  from "../features/ListSlice";

export default configureStore({
  reducer: {
    toDo :ToDoSlice,
    collection: ListSlice

    
  },
});