import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e)=>{
    setshowfinished(!showfinished);
  }

  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newtodos)
    savetoLS()    
  }
  const handleDelete = (e,id)=>{
    let newtodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newtodos)
    savetoLS()
  }
  const handleAdd = ()=>{
    setTodos([...todos,{id: uuidv4(), todo, isComplete:false}])
    setTodo("")
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newtodos = [...todos];
    newtodos[index].isComplete = !newtodos[index].isComplete;
    setTodos(newtodos)
    savetoLS()
  }

  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto bg-violet-100 my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-3 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} type="text" className='w-full rounded-2xl px-2 py-1'/>
        <button onClick={handleAdd} disabled={todo.length <= 1} className='bg-violet-800 hover:bg-violet-950 rounded-md  disabled:bg-violet-500 text-white text-sm font-bold p-3 py-1'>Save</button>
        </div>
          <input className='my-5' onClick={toggleFinished} type="checkbox" checked={showfinished} /> Show Finished
          <h2 className='text-lg font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='m-5'>No Todos to display</div> }
            {todos.map(item=>{
              return (showfinished || !item.isComplete) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
                <div className='flex gap-3'> 
                  <input name = {item.id} onChange={handleCheckbox} type="checkbox" checked={item.isComplete} id='' />
                  <div className={item.isComplete === false ? "" : "line-through"}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 rounded-md mx-1 text-white text-sm font-bold p-3 py-1'><FaEdit /></button>
                  <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 rounded-md mx-1 text-white text-sm font-bold p-3 py-1'><MdDelete /></button>
                </div>
              </div>
            })}
          </div>
      </div>
    </>
  )
}

export default App
