function Cart(props) {
    return (
        <div>
            <h2>Cart</h2>
            {props.cart.map((item) => {
                return props.cartMap.has(item.name) && props.cartMap.get(item.name) > 0 ? (
                    <div className="cartItem">
                        <p>{item.name} ({props.cartMap.get(item.name)})</p>
                        <button onClick={() => props.click({ item })}>x</button>
                    </div>
                ) : <div></div>
            })}
            <h3>Total: ${props.total}</h3>
        </div>
    )
}

export default Cart;