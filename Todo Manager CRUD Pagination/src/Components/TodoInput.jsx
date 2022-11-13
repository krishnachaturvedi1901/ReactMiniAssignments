import React from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import axios from "axios"

const TodoInput = ({getTodos}) => {
  const [text, setText] = React.useState("");
  const [erase, setErase] = React.useState(false);
  if (erase) {
    document.getElementById("inputId").value = "";
    setErase(false);
    if (document.getElementById("inputId").value === "") {
      setText("");
    }
  }

  const handleAdd = (text) => {
    if (text === "") {
      return;
    }
    axios.post(`http://localhost:5000/todosData`,{
      title: text,
      status: false,

    }).then((res)=>{
      console.log("response form axios after post",res)
      getTodos()
    })
     .catch((err)=>console.log("Error from post-->",err))

  };


  return (
    <div className="inputDiv">
      <input
        id="inputId"
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setText(e.target.value)}
      />
      <button
        id="addBtn"
        onClick={() => {
          setErase(true);
          handleAdd(text);
        }}
      >
        <ControlPointIcon />
      </button>
    </div>
  );
};
export { TodoInput };
