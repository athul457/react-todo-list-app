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

export default Item ;