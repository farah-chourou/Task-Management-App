import React from 'react'
import {Col , Row , Container, Form} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import {deleteItem, editItem, getToDoList,editToDoList,deleteToDoList,checkToDoList} from '../features/ToDoSlice';
import { useState, useEffect } from 'react';
import axios from "axios";
import AddToDo from './AddToDo';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
function ToDoList() {
    const toDos = useSelector((state) => state.toDo.list);
    const [newToDo, setnewToDo] = useState("")
    const [Id, setId] = useState()
    const [edit, setedit] = useState(false)
    const dispatch = useDispatch();
    const [Add, setAdd] = useState(false)
    const [check, setcheck] = useState(false)
    
  
    useEffect(() => {
      dispatch(getToDoList(localStorage.getItem("listId")))
     
    }, [dispatch])
    

  return (
    <div >
     <h1 style={{fontFamily:"Patrick Hand",fontWeight:"bold",textAlign:"center"}}> My To Do List</h1>

     <Container>
      <Row className="add">
      <Col xs={2}> 
      <IconButton aria-label="edit"  onClick={()=>setAdd(true)} size="large">
      <AddCircleIcon/>
      </IconButton>
      </Col>
   
     </Row>
     {Add ? <AddToDo/> : null }

        {toDos.map((item,index) => 
       <Row className='justify-content-center list shadow rounded  ' key={index} >
       <Col xs={1}> 
      <input className="form-check-input checkBox" name="check"  type="checkbox" checked={item.do}  
       onChange={(e)=>setcheck(e.target.checked)}
       onClick={()=> {dispatch(checkToDoList(item._id, !item.do))}}
      />


      </Col>
        <Col  xs="10" className='toDo' style={item.do ? { textDecoration: 'line-through' , backgroundColor:"blue"}:{}}>
            <Row>  
              <Col md="9"> 
              { item._id === Id && edit ? 
                <input value={newToDo} name="newToDo"  onChange={(e)=> setnewToDo(e.target.value)} /> 
                :  item.toDo }        
              
               </Col>
              <Col md="1">
              <IconButton aria-label="delete" onClick={()=> {  dispatch(deleteToDoList(item._id   ))}}>
              <DeleteIcon />
              </IconButton> 
              </Col>
              <Col md="1">
              {edit && item._id === Id ? 
               <IconButton aria-label="edit"  onClick={()=> {  dispatch(editToDoList( item._id ,  newToDo)); setedit(false);setId(); setnewToDo()}}>
               <SaveIcon/>
               </IconButton>
                    :
                    <IconButton aria-label="edit"onClick={()=> {   setedit(true);setId(item._id)}}>
                    <EditIcon/>
                    </IconButton>
}
               
              </Col>


            </Row>
      
        </Col>
       
        <Col xs lg="2"> </Col>

        </Row>

)}
        
     </Container>



    </div>
  )
}

export default ToDoList