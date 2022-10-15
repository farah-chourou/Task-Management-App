import React,{useState,useEffect} from 'react'
import { Container ,Row,Form,Col,Button} from 'react-bootstrap'
import ControlPointIcon from '@mui/icons-material/ControlPoint';    
import IconButton from '@mui/material/IconButton';
import Modal from 'react-bootstrap/Modal';
import {getColection,AddCollection} from "../features/ListSlice"
import { clearState} from "../features/ToDoSlice"
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { useNavigate,  Link ,
} from 'react-router-dom'; 


function Lists() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const list = useSelector(state => state.collection.list)
    const [Activity, setActivity] = useState("")
    const [Name, setName] = useState("")
    const [description, setdescription] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
      dispatch(clearState())
      dispatch(getColection())
    }, [dispatch])
    
 
  const handleClick = (id) =>{
    localStorage.setItem("listId", JSON.stringify(id));
    navigate('/toDo') // maaaaaadch useHistory n7iiil mo5iii tfouuh 
  }

  return (
    <Container className='mt-5'>
      <Row className='m-auto text-center' > 
       <Col> 
        <h1 > My To-Do-List Collections</h1> 
         </Col> 
      </Row>

      <Row> 
      
     {list.map((item) =>


      <Col md={2} key={item._id} className="border rounded shadow p-3 text-center m-3 collection" type="button"  onClick={ () => handleClick(item._id)} >
      <p> icon</p>
      <h2> {item.name}</h2>
      <p> description</p>
      </Col>

     )}

      <Col md={2}   onClick={()=> setShow(true)} className="border rounded shadow  m-3  collection d-flex justify-content-center align-items-center"type="button" >
       <IconButton  color="primary" > 
        <ControlPointIcon style={{height:35,width: 35}} />
       </IconButton>
      </Col>
      </Row>






      
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New List </Modal.Title>
        </Modal.Header>
        <Modal.Body  className='m-2'
>
        <b>  Choose activity</b>

        <Form.Select size="sm" name="Activity" value={Activity} onChange={(e)=>setActivity(e.target.value)}  className='m-1'
>
        {list.map((item, i)=>
                <option key={item._id}>
                  {item.name}
                </option>

        )}
             <option>
                  Other
             </option>
  
      </Form.Select>

      {Activity==="Other" ? 
      <> 
      <b>  Name of list </b>
       <Form.Control
          size="sm"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          name="Name"
          placeholder='put name of the list here'
          className='m-1'
          value={Name}
          onChange={(e)=> setName(e.target.value)}

        />
     <b>  Description </b>
       <Form.Control
          className='m-1'
         size="sm"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          name="description"
          placeholder='put description if you want'
          value={description}
          onChange={(e)=> setdescription(e.target.value)}

        />
        </>
        : null }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {dispatch(AddCollection(Name, description));setShow(false);}}>
            Add List
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Lists