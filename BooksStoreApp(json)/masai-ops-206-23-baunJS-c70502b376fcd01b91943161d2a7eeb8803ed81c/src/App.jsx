import {useState} from "react"
import Fiction from "./components/Fiction";
import NonFiction from "./components/NonFiction";

function App() {
  const [showFiction,setShowFiction]=useState(true)
  return (
    <div style={{textAlign:"center"}} >
      <h1>Mini Book Store</h1>

      <button data-testid="toggle-btn" onClick={()=>setShowFiction(!showFiction)} >{showFiction?"Show Non-Fiction Books":"Show Fictional Books"}</button>

      <div data-testid="conditional-container" >
        {showFiction?<Fiction/>:<NonFiction/>}
      </div>
    </div>
  );
}

export default App;
