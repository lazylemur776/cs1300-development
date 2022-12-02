function BakeryItem(props) {
  return (
    <div className='BakeryItem'>
      <h4>{props.name} — {props.price}</h4>
      <img src={props.image} alt={props.name} />
      {props.description}
      <button onClick={() => {
        props.click(props)
      }}>Add To Cart</button>
    </div>
  )
}

export default BakeryItem;
