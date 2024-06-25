const ItemCompras = ({ order }) => {

    console.log(order)

    const timestamp = order.createdAt

    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">{order.productId}</div>
                    </div>
                </div>
            </td>
            <td>
                <p>{date.toLocaleDateString()}</p>
                <br />
                <span className="badge badge-ghost badge-sm">x {order.address}</span>
            </td>
            <td>{order.quantity}</td>
            <br />
            <td>{order.size}</td>
            <th>
                <button className="btn btn-ghost btn-xs">{order.totalPrice}</button>
            </th>
        </tr>
    )
}

export default ItemCompras