import CarritoItem from './CarritoItem';
import CartContext from '../context/CartContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Carrito = () => {

    const { cartItems, removeItemFromCart, clearCart } = useContext(CartContext);

    const [totalPrice, setTotalPrice] = useState();

    useEffect (() => {
        const totalPriceFunction = () => {
            let total = 0;
            cartItems.forEach((item) => {
                total += item.price * item.quantity;
            });
            setTotalPrice(total);
        }
        totalPriceFunction();
    }, [cartItems])

    return (
        <div className="flex w-full bg-black/10">
            <div className="flex flex-col items-center w-2/3 p-10 mb-20">
                <p className="text-4xl mt-5 mb-10 font-bold">Carrito</p>
                {cartItems.map((item, index) => {
                    return <CarritoItem item={item} key={index} remove={removeItemFromCart}/>
                })}
            </div>
            <div className="flex flex-col items-center justify-center w-1/3 h-screen sticky top-0">
                <p className="text-4xl mb-5 font-bold">Total</p>
                <p className="text-2xl mb-16">$ {totalPrice}</p>
                <button className="bg-red-600/40 rounded-md h-10 w-40 text-white" onClick={() => clearCart()}>Vaciar Carrito</button>
                <Link to='/checkout' className="flex items-center justify-center bg-yellow-600 rounded-md h-14 w-48 mt-5 text-white" >Comprar</Link>
            </div>
        </div>
    )
}

export default Carrito