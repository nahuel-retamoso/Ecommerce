import CarritoItem from './CarritoItem';
import CartContext from '../context/CartContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Carrito = () => {

    const { cartItems, removeItemFromCart, clearCart } = useContext(CartContext);

    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
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
        <div className="flex items-center justify-center w-full bg-slate-100 p-10 h-[90vh]">
            <div className='flex rounded-sm shadow-md flex-col bg-base-100 w-full h-full justify-around items-center p-7'>
                <div className="flex flex-col items-center h-4/6 w-full">
                    <p className="text-2xl font-extralight">Carrito</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                </th>
                                <th className='font-light'>Item</th>
                                <th className='font-light'>Cantidad</th>
                                <th className='font-light'>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        {cartItems.map((item, index) => {
                            return <CarritoItem item={item} key={index} remove={removeItemFromCart} />
                        })}
                    </table>
                </div>
                <div className="flex items-end h-2/6 w-full justify-between">
                    <div className='flex items-center space-x-10'>
                        <p className="text-xl font-extralight">Total</p>
                        <p className="text-2xl font-extralight">$ {totalPrice}</p>
                    </div>
                    <div className='flex space-x-3'>
                        <button className="btn btn-error w-32" onClick={() => clearCart()}>Vaciar Carrito</button>
                        <Link to='/checkout' className="btn btn-primary w-32" >Comprar</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carrito