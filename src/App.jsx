import { useState ,useEffect, useActionState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(false)
  useEffect(() => {
    if(todos.length>=0){
    localStorage.setItem('todos',JSON.stringify(todos))
    }
  }, [todos])
  
  useEffect(() => {
    let todostring=localStorage.getItem('todos')
    if(todostring){
      let todos=JSON.parse(localStorage.getItem('todos'))
      settodos(todos)
    }
   
    
   
  }, [])

  
 

    
  
  
  const handleedit=(e,id)=>{
    let t=todos.filter(i=>{
      return i.id===id;
      
    })
    settodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!==id
    })
    settodos(newtodos)
    
  }
 
  
  const handledelete=(e,id)=>{
   
    let index=todos.findIndex(item=>{
      return item.id===id
      
      }
    )
    let newtodos=todos.filter(item=>{
      return item.id!==id
    })
    settodos(newtodos)
    
  }
  
  
  const handlechange=(e)=>{
    settodo(e.target.value)


  }
  const handleadd=()=>{
    settodos([...todos,{ id:uuidv4(),  todo, isCompleted:false}])
    settodo("")
   


  }
  const handlecheckbox=(e) => {
    let id=e.target.name
    let index=todos.findIndex(item=>{
      return item.id===id
      
      }
    )
    let newtodos=[...todos]
    newtodos[index].isCompleted=!newtodos[index].isCompleted
    settodos(newtodos)
    
  }
  const showtods=()=>{
    setshowfinished(!showfinished)


  }
  const handlesave=()=>{
    settodos([...todos, {id:uuidv4(),todo, isCompleted:false}])
    settodo("")

  }

  



  return (
    <>
    <Navbar />
    <div className="container mx-auto my-5 rounded-xl bg-slate-400 p-6 min-h-[90vh] md:w-full w-full">
       <h1 className='font-bold text-base text-center py-3 md:py-2  md:text-2xl pb-4'>UTASK – Simplify, Organize, Achieve!</h1>
      <div className="add">
        <h1 className='md:text-lg font-bold text-base'>Add Todo</h1>
      </div>
      <div className="flex gap-2">
      <input type="text" onChange={handlechange} value={todo} className='border-2 rounded-xl w-1/2'/>
      <button onClick={handleadd} disabled={todo.length<3} className='cursor-pointer bg-purple-900 hover:bg-purple-950 text-white rounded-md p-1.5 mx-5'>Add</button>
      </div>
      <div className='w-1/2 text-center p-2.5'><button disabled={todo.length<3} onClick={handlesave} value={todo} className="save bg-purple-900 hover:bg-purple-950 p-1 rounded-md text-white cursor-pointer px-1.5 ">Save</button></div>
      <div className='font-semibold'><input type="checkbox" checked={showfinished}  onChange={showtods} /> Show Finished Todos</div>
      
        <h1 className='text-lg font-bold py-2.5'>Your Todos</h1>
    
      <div className="todos">
        {todos.length===0 && <div className="text-center font-bold py-1">No Todos To Display</div>}
        {todos.map(item=>{
          

       
         return (showfinished || !item.isCompleted) && <div key={item.id} className="todo items-center flex justify-between md:w-1/2 p-2 w-full">
          <div className='flex gap-5 items-center flex-grow overflow-hidden'>
          <input onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id='' />
          
          <div className={item.isCompleted? "line-through break-words w-full":"break-words w-full" }>{item.todo}</div>
          </div>
          <div className="buttons1 px-4.5">

          <div className="button flex gap-4 h-full shrink-0 ">
          <button onClick={(e)=>{handleedit(e,item.id)}} className='bg-purple-900 hover:bg-purple-950 p-1.5 rounded-md text-white cursor-pointer'><FaRegEdit /></button>
          <button onClick={(e)=>{handledelete(e,item.id)}} className='bg-purple-900 hover:bg-purple-950 p-1.5 rounded-md text-white cursor-pointer'><MdDelete /></button>
          </div>
          </div>
        </div>
         })}
      </div>
      </div>
    
      
    </>
  )
}

export default App
