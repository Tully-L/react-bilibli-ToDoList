import { useEffect,useState } from "react";
import './styles.css';

import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";

export default function App(){
  const [todos,setTodos]=useState(()=>{
    const localValue=localStorage.getItem("ITEM");

    if(!localValue)return [];
    return JSON.parse(localValue);
  });

  useEffect(()=>{
    localStorage.setItem("ITEM",JSON.stringify(todos));
  },[todos]);

  function addTodos(title){
    setTodos((current)=>[...current,{id:crypto.randomUUID(),title,completed:false}]);
  }

  function toggleTodo(id,completed){
    setTodos((current)=>{
      return current.map((todo)=>{
        if(todo.id===id)return{...todo,completed};
  
        return todo;
      })
  });
  }

  function deleteTodo(id){
    setTodos((current)=>current.filter((todo)=>todo.id!==id));
  }

  return(
    <>
      <NewTodoForm addTodos={addTodos}/>

      <h1 className="header">Todo List</h1>

      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  );
}