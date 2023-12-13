import React, { useEffect, useRef } from "react";
import "./Todos.css";
import { useState } from "react";

import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";

function Todos() {
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState([]);
  const[editId,setEditId]=useState(0)

  // prevent form
  const handleSubmit = (e) => {
    e.preventDefault();
  };
// add
  const addTodo = () => {
    if(todo!==""){
    setTodos([...todos, {list:todo,id:Date.now(),status:false}]);
    console.log(todos);
    setTodo("");
    }
    if(editId){
      const editTodo=todos.find((todo)=>todo.id===editId)
      const updateTodo=todos.map((to)=>to.id===editTodo.id
      ? (to={id:to.id,list:todo})
      :(to={id:to.id,list:to.list}))
      setTodos(updateTodo);
      setEditId(0);
      setTodo("");
    }
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });
// delete
const onDelete=(id)=>{
  setTodos(todos.filter((to)=>to.id!=id))
}
// complete
const onComplete=(id)=>{
let complete=todos.map((list)=>{
  if(list.id===id){
    return({...list,status:!list.status})
  }
  return(list)
})
setTodos(complete)
}
// edit
const onEdit=(id)=>{
const editTodo=todos.find((to)=>to.id===id)
setTodo(editTodo.list)
setEditId(editTodo.id)
}




  return (
    <div className="container">
      <h2>Todo App</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your todo"
          className="form-control"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
          ref={inputRef}
        />
        <button onClick={addTodo}>{editId?'EDIT':'ADD'}</button>
      </form>

      <div className="list">
        <ul>
          {todos.map((to) => (
            <li className="list-items">
             <div className="list-item-list" id={to.status?"list-item":''}>{to.list}</div> 
              <span>
                <IoMdDoneAll className="list-item-icons" id="complete" title="complete" onClick={()=>onComplete(to.id)}/>
                <FaRegEdit className="list-item-icons" id="edit" title="edit" onClick={()=>onEdit(to.id)}/>
                <RiDeleteBinLine className="list-item-icons" id="delete" title="delete" onClick={()=>onDelete(to.id)}/>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
