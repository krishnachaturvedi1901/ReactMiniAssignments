import { useRef, useState } from "react";
import "../App.css";
import axios from "axios"
import DisplayForm from "./DisplayForm";

const Form = () => {
  const [loading,setLoading]=useState(false)
  const [formObj, setFormObj] = useState({})
  const inputRef = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
   
    name==="age"||name==="salary"?setFormObj({ ...formObj, [name]: +value }):setFormObj({ ...formObj, [name]: value })
    if(name==="img"){
      const formData=new FormData()
      console.log("formData prior--",formData)
      formData.append("image",e.target.files[0])
      console.log("formData later--",formData)
      console.log("e.target.files==",e.target.files)

      axios.post(`https://api.imgur.com/3/image/account/{{710krishna}}/`,{
        headers:{
          Authorization:"Client-ID:6b2a69b8f84727c"
        },
        body:formData
      })
      .then((res)=>{
        console.log("Resp from imgur",res)
      })
      .catch((err)=>{console.log("Error from imgur",err)})

    }
    
  };
//   console.log(formObj);

  const handleSubmit = (e, formObj) => {
    e.preventDefault();
    setLoading(true)
    axios.post(`http://localhost:3001/employee`,{...formObj})
    .then((res)=>{
      console.log("resp from post",res)
         e.target.reset();
        })
    .catch((err)=>console.log(err))
    .finally(()=>{setLoading(false)})
  };

  const handleFocus = (e) => {
    const eName=e.target.name
    inputRef.current.map((ele)=>{
      return eName===ele.name?ele.focus():null
    })
  };
  if(loading){return <h3>Submitting...</h3>}

  return (
    <div className="mainFormDiv" >
     <div className="formDiv" >
        <form
        id="formElement"
        onSubmit={(e) => {
          handleSubmit(e, formObj);
        }}
      > <h2>Add Employee Detail</h2>
       <div>
         <label>Profile Image</label><br/>
         <input 
           className="inputClass"
           required
           type="file"
           name="img"
           ref={el=>{inputRef.current[4]=el}}
           placeholder="Choose image"
           onChange={(e) => {
             handleChange(e);
           }}
           onClick={(e)=>handleFocus(e)}
         />
       </div>
        
       <div>
         <label>Name:</label>
         <input
           className="inputClass"
           required
           type="text"
           name="name"
           placeholder="Enter name"
           ref={el=>{inputRef.current[0]=el}}
           onChange={(e) => {
             handleChange(e);
           }}
           onClick={handleFocus}
         />
       </div>
       <div>
       <label>Gender</label>
         <select
           required
           name="gender"
           onChange={(e) => {
             handleChange(e);
           }}
         >
           <option value="">Select gender</option>
           <option value="male">Male</option>
           <option value="female">Female</option>
           <option value="other">Other</option>
          </select>
        </div><br/>
        <div>
          <label>Department:</label>
          <select
            required
            name="department"
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option value="">Select Department</option>
            <option value="web developer">Web developer</option>
            <option value="app developer">App developer</option>
            <option value="data analyst">Data analyst</option>
          </select>
        </div>
        
        <fieldset className="inputClass">
          <legend>Marital status</legend>
          <div>
            <input
              required
              type="radio"
              id="married"
              name="maritalStatus"
              value="married"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor="married">Married</label>
          </div>
          <div>
            <input
              required
              type="radio"
              id="unmarried"
              name="maritalStatus"
              value="unmarried"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor="unmarried">Unmarried</label>
          </div>
        </fieldset>

        <div>
        <label>Age:</label>
          <input 
            className="inputClass"
            required
            type="number"
            name="age"
            ref={el=>{inputRef.current[1]=el}}
            placeholder="Enter age"
            onChange={(e) => {
              handleChange(e);
            }}
            onClick={handleFocus}
          />
        </div>
        <div>
        <label>Salary:</label>
          <input 
            className="inputClass"
            required
            type="number"
            name="salary"
            ref={el=>{inputRef.current[2]=el}}
            placeholder="Enter salary"
            onChange={(e) => {
              handleChange(e);
            }}
            onClick={handleFocus}
          />
        </div>
        <div>
        <label>Address:</label>
          <input 
            className="inputClass"
            required
            type="text"
            name="address"
            ref={el=>{inputRef.current[3]=el}}
            placeholder="Enter address"
            onChange={(e) => {
              handleChange(e);
            }}
            onClick={handleFocus}
          />
        </div>




        <input className="inputClass" type="submit" value="Submit" />
        </form>
     </div>
     <div className="displayFormDiv">
      <DisplayForm/>
     </div>
    </div>
  );
};
export default Form;
