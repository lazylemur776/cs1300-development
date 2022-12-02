function Checkbox(props) {
  return (
    <div className="checkbox-item">
      <p>{props.name}</p>
      <input type="checkbox" defaultChecked={props.state} onClick={props.toggleState}></input>
    </div>
  )
}

export default Checkbox;