import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { listAdded ,addToDoList} from '../features/ToDoSlice';
import Table from "react-bootstrap/Table";
import {Col , Row , Container, Form} from "react-bootstrap"
function AddToDo() {
    const [ToDo, setToDo] = useState("")
    const [Error, setError] = useState("")
    const dispatch = useDispatch();
    const toDos = useSelector((state) => state.toDo.list);
    const [listId, setlistId] = useState()
    
    useEffect(() => {
     setlistId(localStorage.getItem("listId"))
    
    }, )
    

    const handleClick = () => {
      console.log(ToDo)
        if (ToDo) {
          console.log(listId)
          dispatch( addToDoList(ToDo,listId ));
    
        } else {
          setError("Fill in all fields");
        }
    
        setToDo("");
      };

  return (
    <div>
    <Row className='justify-content-center add' > 
    <Col xs={9}> 
    <Form.Control
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name="ToDo"
           placeholder='add to do '
            value={ToDo} onChange={(e) => setToDo(e.target.value)}
        />
    </Col>
    <Col xs={2}> 
    <button  type="button" className='btn btn-primary ' onClick={handleClick}  style={{marginLeft:"30px"}}>  Add </button>     
    </Col>
     <Col xs={1}> 
     <button  type="button" className='btn btn-primary'  onClick={()=>setToDo("")}>  Clean </button>
     </Col>   
    </Row>
    </div>
  )
}

export default AddToDo