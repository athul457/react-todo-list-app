import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

function App() {
  const [item,setItems] = useState([]) ;

  function handleToggleItems(id){
    setItems((item)=>item.map((i)=>i.id === id ? {...i,packed:!i.packed} : item))
  }

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
        <PackingList 
        item={item} 
        delitem={handleDeleteItems} 
        handleToggleItems={handleToggleItems}/> 
        <Status item={item}/>
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

function PackingList({delitem,item ,handleToggleItems}){
  
  return (
    <div className="list">
        <ul>
        {
        item.map((i)=>(
          <Item itemObj= {i} key={i.id} 
          delitem={delitem} 
          handleToggleItems={handleToggleItems}/>
        ))
        }
        </ul>
    </div>
  )
}

function Item({delitem,itemObj,handleToggleItems}){
  return <li>
      <input 
      type="checkbox" value={itemObj.id} onClick={()=>handleToggleItems(itemObj.id)}/>
      <span 
      className={itemObj.packed ?("decoration"):("")}>{itemObj.description} {itemObj.quantity}</span>
      {/* <span style={itemObj.packed ? {textDecoration: "line-through"} : {}}>{itemObj.description} {itemObj.quantity}</span> */}
      <button 
      onClick={()=>delitem(itemObj.id)}>❌</button>
    </li>
}

function Status({item}){
  const numsOfItems = item.length ;
  const numItemPacked = item.filter((item)=>item.packed).length
  const packedPercentage = Math.round((numItemPacked / numsOfItems) *100)
  return (
    <footer className="stats">
      <em>You have {numsOfItems} items on your list , And you already packed {numItemPacked} ({packedPercentage} %)</em>
    </footer>
  )
}

export default App;
