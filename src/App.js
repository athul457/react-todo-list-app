// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];


import { useState } from "react";

// ! <---------------App------------------->

function App(){
  const [items,setItem] = useState([]) ;

  function handleToggle(id){
    setItem(items=>items.map(item=>item.id === id ? {...item ,packed : !item.packed} : item))
  }

  function handleDeleteItems(id){
    setItem((items)=>items.filter(newItems=>newItems.id !== id));
  }

  function handleAddItems(newItems){
    // setItem((preItem)=>[...preItem,newItems])
    setItem((items)=>[...items,newItems])
  }



  return (
    <>
      <div className="app">
        <Logo />
        <Form addItems={handleAddItems}/>
        <PackingList 
        item={items} 
        handleDeleteItems={handleDeleteItems} 
        handleToggle={handleToggle}/>
        <Status items={items}/>
      </div>
    </>
  )
};

// ! <-------------------Logo------------------------>

function Logo(){
  
  return (
    <>
      <h1>🌴 FAR AWAY 👜</h1>
    </>
  )
};

function PackingList({handleDeleteItems,item,handleToggle}){
  
  return(
    <>
      <div className="list">
        <ul>
          {
            item.map(item=>(
              <Item itemObj={item} key={item.id} 
              handleDeleteItems={handleDeleteItems} 
              handleToggle={handleToggle}/>
            ))
          }
        </ul>
      </div>
    </>
  )
};

// ! <-------------------Item------------------------------>

function Item({itemObj,handleDeleteItems,handleToggle}){
return (
  <>
    <li >
    <input type="checkbox" value={itemObj.packed} onClick={()=>{handleToggle(itemObj.id)}}/>
    <span className={itemObj.packed ? "decoration" : ""}>
    {itemObj.quantity} {itemObj.description} 
    <button onClick={()=>handleDeleteItems(itemObj.id)}>❌</button></span>
    </li>
  </>
)
};

// ! <--------------------Form------------------------------->

function Form({addItems}){

  const [description,setDescription] = useState('') ;
  const [quantity,setQuantity] = useState(1) ;

  function handleSubmit(e){
    e.preventDefault() ;
    if(!description) return ;
    const previousItems = {description,quantity,id:Date.now(),packed:false}
    addItems(previousItems)
    setDescription('');
    setQuantity(1);
  } 

   return (
     <form className="add-form" onSubmit={handleSubmit}>
     <h3>What do you need for your trip</h3>
       <select value={quantity} onChange={(e)=>setQuantity(e.target.value)}>
        {Array.from({length : 10} ,(_,i)=>i+1).map((num)=>(
          <option value={num} key={num} >
            {num}
          </option>
        ))}
       </select>
       <input type="text" placeholder="item...." value={description} onChange={(e)=>setDescription((e.target.value))}  ></input>
       <button>Add</button>
     </form>
   )
};

// ! <---------------status------------------------------>

function Status({items}){
  const itemLength= items.length ;
  const itemPacked = items.filter(item=>item.packed).length
  const completdPercentage = Math.round((itemPacked / itemLength ) * 100 )
  return (
    <footer className="stats">
      <em>You have {itemLength} items on your list , And you already packed {itemPacked} ({completdPercentage} %)</em>
    </footer>
  )
};

export default App;
