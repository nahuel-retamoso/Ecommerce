const ItemCompras = ({ order }) => {

    console.log(order)

    const timestamp = order.createdAt

    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-light">Order ID: {order.id}</div>
                        <div className="text-sm font-light opacity-50">Cant - Tipo articulos: {order.cartItems.length}</div>
                        <div className="text-sm font-light opacity-50">Total: $ {order.totalPrice}</div>
                    </div>
                </div>
            </td>
            <td>
                <p className="font-extralight">{date.toLocaleDateString()}</p>
                <p className="font-extralight">{order.address}</p>
            </td>
            <th>
                {order?.cartItems.map((item) => {
                    return (
                        <div className="font-extralight border-b">
                            <p>Item ID: {item.productId}</p>
                            <p>x {item.quantity}</p>
                            <p>Subtotal: $ {item.price * item.quantity}</p>
                        </div>
                    )
                })}
            </th>
        </tr>
    )
}

export default ItemCompras