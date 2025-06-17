import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

function App() {
  const [item,setItems] = useState([]) ;

  function handleAddItems(newItems){
    setItems((item)=>[...item,newItems])
  }

  function handleDeleteItems(id){
    setItems(item=> item.filter((i)=> i.id !== id))
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAdditems={handleAddItems}/> 
        <PackingList item={item} delitem={handleDeleteItems}/> 
        <Status />
      </div>
    </>
  );
}

function Logo(){
  return (
    <h1>🌴 FAR AWAY 👜</h1>
  )
}

function Form({onAdditems}){

  const [description,setDescription] = useState("");
  const [quantity,setQuantity] = useState(1);

  function handleSubmit(e){
    e.preventDefault() ;
    if(!description) return ;
    const newItems = {description,quantity,packed :false ,id :Date.now()}
    console.log(newItems)
    onAdditems(newItems)
    setDescription("");
    setQuantity(1)
  }



  return (
    <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do you need for your trip</h3>
      <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
        {Array.from({length : 20} ,(_,i)=>i+1).map((num)=>(
          <option value={num} key={num} >
            {num}
          </option>
        ))}
      </select>
      <input type="text" 
      placeholder="item....." 
      value={description} 
      onChange={(e)=>setDescription(e.target.value)}></input>
      <button>Add</button>
    </form>
  )
}

function PackingList({delitem,item}){
  
  return (
    <div className="list">
        <ul>
        {
        item.map((i)=>(
          <Item itemObj= {i} key={i.id} delitem={delitem}/>
        ))
        }
        </ul>
    </div>
  )
}

function Item({delitem,itemObj}){
  return <li>
      <></><span className={itemObj.packed ?
      ("decoration"):
      ("")}>{itemObj.description} {itemObj.quantity}</span>
      {/* <span style={itemObj.packed ? {textDecoration: "line-through"} : {}}>{itemObj.description} {itemObj.quantity}</span> */}
      <button onClick={()=>delitem(itemObj.id)}>❌</button>
    </li>
}

function Status(){
  return (
    <footer className="stats">
      <em>You have X items on your list , And you already packed X (x %)</em>
    </footer>
  )
}
export default App;
