import Item from "./Item";
import { useState } from "react";

function PackingList({delitem,item ,handleToggleItems,handleClearList}){
  const [sortBy,setSortBy] = useState('quantity')

  let sortedArr =[];
  if(sortBy === 'quantity') sortedArr = item.slice().sort((a,b)=>a.quantity -b.quantity) ;

  if(sortBy === 'description') {
    sortedArr = item.slice().sort((a,b)=>a.description.localeCompare(b.description)) ;
  }
    
  
  if(sortBy === 'packed') {
    sortedArr = item.slice().sort((a,b)=>Number(b.packed) - Number(a.packed))
  }
  return (
    <div className="list">
        <ul>
        {
        sortedArr.map((i)=>(
          <Item itemObj= {i} key={i.id} 
          delitem={delitem} 
          handleToggleItems={handleToggleItems}/>
        ))
        }
        </ul>
        <div className="actions">
          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
            <option value='description'>Sort By description</option>
            <option value='quantity'>Sort By quantity</option>
            <option value='packed'>Sort By packed</option>
          </select>
        <button onClick={handleClearList}>clear list</button>
        </div>
    </div>
  )
}

export default PackingList ;