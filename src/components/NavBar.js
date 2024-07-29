import { Link, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { useContext, useEffect, useState } from "react";
import CartContext from "./context/CartContext";

const NavBar = () => {

    const { cartItems } = useContext(CartContext);

    const [itemsQuantity, setItemsQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        console.log('Carrito', cartItems)
        setItemsQuantity(cartItems.length);
        if(cartItems.length > 0) {
            let suma = 0;
            for (let i = 0; i < cartItems.length; i++) {
                suma += cartItems[i].price * cartItems[i].quantity;
            }
            setTotalPrice(suma)
            console.log('Total price cart: ', totalPrice)
        }
    }, [cartItems])

    const location = useLocation();
    const isHome = location.pathname === '/';

    const navbarStyle = {
        position: isHome ? 'fixed' : '',
    }

    return (
        <nav className="z-10 flex h-[10vh] w-full items-center bg-slate-100 border-b" >
            <div className=" w-1/3">
                <h1 className="bg-gradient-to-r from-yellow-400 to-orange-400 ml-14 p-2 px-4 w-fit font-medium text-3xl ">Ecommerce</h1>
            </div>
            <div className="flex font-light text-lg w-1/3 justify-around ">
                <Link to='/'>Inicio</Link>
                <Link to='/catalogo'>Catalogo</Link>
                <Link to='/sucursales'>Donde estamos</Link>
            </div>
            <div className="w-1/3 space-x-2 mr-14 flex items-center justify-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full p-2">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="./user.png" 
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to='/cuenta' className="justify-between">
                                Perfil
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item">{cartItems.length}</span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">Productos en el carrito: {itemsQuantity}</span>
                                <span className="text-info">Subtotal: {totalPrice}</span>
                                <div className="card-actions">
                                    <Link to='/carrito' className="btn btn-primary btn-block">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;