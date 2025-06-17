import { useState } from "react";
import Logo  from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Status from "./components/Status";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

// ! <-------------App---------------------------->

function App() {
  const [item,setItems] = useState([]) ;

  function handleToggleItems(id){
    setItems((item)=>item.map((i)=>i.id === id ? {...i,packed:!i.packed} : i))
  }

  function handleAddItems(newItems){
    setItems((item)=>[...item,newItems])
  }

  function handleDeleteItems(id){
    setItems(item=> item.filter((i)=> i.id !== id))
  }

  function handleClearList(e){
    e.preventDefault();
    setItems((item)=> item = []);
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAdditems={handleAddItems}/> 
        <PackingList 
        item={item} 
        delitem={handleDeleteItems} 
        handleToggleItems={handleToggleItems}
        handleClearList={handleClearList}
        /> 
        <Status item={item}/>
      </div>
    </>
  );
}

export default App;
