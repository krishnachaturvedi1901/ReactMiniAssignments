import { SnowshoeingOutlined } from "@mui/icons-material";
import  { useEffect,useState } from "react";
import { v4 as uuid } from "uuid";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import axios from "axios"
import TodoPages from "./TodoPages";

const Todo = () => {
  const [loading,setLoading]=useState(true)
  const [todos, setTodos] = useState([]);
  const [error,setError]= useState(false)
  const [page,setPage]=useState(1)
  const [finalPage,setFinalPage]=useState()
  const todosPerPage=5

  useEffect(()=>{getTodos()},[page])

  const getTodos=()=>{
    setLoading(true)
    axios.get(`http://localhost:5000/todosData?_page=${page}&_limit=${todosPerPage}`)
    .then((res)=>{
      console.log("res from getTodo call-->",res)
      console.log("no of todos --->", res.headers["x-total-count"])
      let lastPage=Math.ceil(+res.headers["x-total-count"]/todosPerPage)

      setTodos(res.data)
      setFinalPage(lastPage)
    })
    .catch(()=>setError(true))
    .finally(()=>setLoading(false))
  }

  const handleUpdate = (id) => {
    setLoading(true)
    const modifyMe = todos.filter((elem) =>(
            elem.id === id 
     ) );
     let newStatus=!modifyMe[0].status

    axios.patch(`http://localhost:5000/todosData/${id}`,{
      status:newStatus
    })
    .then(()=>getTodos())
    .catch(()=>setError(true))

  };

  const handleDelete = (id) => {
    setLoading(true)
    axios.delete(`http://localhost:5000/todosData/${id}`)
    .then(()=>getTodos())
    .catch(()=>setError(true))

  };

  const handlePageChange=(payload)=>[
    setPage(page+payload)
  ]

  if(loading)return <h2>Loading ...</h2>
  if(error)return <h2>Oops error...Learn coding to resolve,contact masai</h2>

  return (
    <div className="todoParentDiv">
      <h2>TODO MANAGER</h2>
      <TodoList
        todos={todos}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      <TodoInput getTodos={getTodos} />
      <TodoPages page={page} handlePageChange={handlePageChange} finalPage={finalPage} />
    </div>
  );
};
export { Todo };
