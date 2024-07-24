import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import Todoitems from './Todoitems'


const Todo = () => {

const [todolist,setTodolist]=useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")):[]);

const inputRef = useRef();

const add =()=>{
  const inputText=inputRef.current.value;

  const newTodo={
    id:Date.now(),
    text:inputText,
    isComplete:false,
  }
  setTodolist((prev)=>[...prev,newTodo]);
  inputRef.current.value="";

}

//delete todoitem
const deleteTodo =()=>{
   setTodolist((prevtodos)=>{
    return prevtodos.filter((todo)=>todo.id!==id)
   })
}

const toggle = (id) => {
  setTodolist((prevtodos) => {
    return prevtodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo; // Ensure the function returns the todo if it doesn't match the id
    });
  });
};


useEffect(()=>{
  localStorage.setItem("todos", JSON.stringify(todolist))
},[todolist])


  return (
    <div className='flex justify-center items-center min-h-screen'>
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
  
      {/*-----title----*/}
<div className='mt-7'>
  <div className='flex items-center gap-2'>
    <img className='w-8' src={todo_icon} alt="Todo Icon" />
    <h1 className='text-black text-3xl font-semibold'>Todo list</h1>
  </div>
  </div>

  {/*------input-box--------*/}
  <div className='flex items-center my-7 bg-orange-600 rounded-full'>
    <input ref={inputRef}
      className='bg-teal-100 border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600 text-black rounded-l-full '
      type='text'
      placeholder='Add your task'
    />
    <button onClick={add}className='text-black border-none rounded-full text-lg font-medium cursor-pointer bg-orange-600 px-4 py-2'>
      Add +
    </button>
    </div>

      {/*------todo list--------*/}

    <div>

      {todolist.map((item,index)=>{
        return<Todoitems key={index} text={item.text} id={item.id} isComplete={isComplete} deleteTodo={deleteTodo}/>
      })}
      
    </div>



 </div>

</div>
  )
}

export default Todo
