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

export default Status ;