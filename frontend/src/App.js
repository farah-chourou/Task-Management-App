import { Route, BrowserRouter as Router,Routes,useNavigate} from "react-router-dom";
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import "./style.css";
import Lists from "./components/Lists";
import  Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {

  return (
  <Router>
    <Routes>
        <Route   path='/' element={<Login/>}>
        </Route>
        <Route   path='/register' element={<Register/>}>
        </Route>
        <Route   path='/toDo' element={<ToDoList/>}>
        </Route>
        <Route   path='/list' element={<Lists/>}>
        </Route>

        <Route  exact path='/add' element={<AddToDo/>}>
        </Route>
        <Route  exact path='/edit-user' element={<h1> edit user </h1>}>
        </Route>
    </Routes>
  </Router>
  );
}

export default App;
