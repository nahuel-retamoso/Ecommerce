const ItemCompras = ({order}) => {

    console.log(order)

    const timestamp = order.createdAt
      
      const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      
    return (
        <div className="flex flex-col justify-center bg-white w-3/4 border-b-2 border-black p-8">
            {order.cartItems.map((item, index) => {
                return (<div className="flex w-full text-xl mb-5">
                    <p key={index} className="w-3/6">{item.productId}</p>
                    <p key={index} className="w-1/6">{item.quantity}</p>
                    <p key={index} className="w-1/6">{item.size}</p>
                    <p key={index} className="w-1/6">$ {item.price}</p>
                </div>)
            })}
            <p className="font-semibold">Fecha: {date.toLocaleDateString()}</p>
            <p className="font-semibold">Direccion: {order.address}</p>
            <p className="text-2xl font-bold">Total: $ {order.totalPrice}</p>
        </div>
    )
}

export default ItemCompras