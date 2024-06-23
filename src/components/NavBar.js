import { Link, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { useContext, useEffect, useState } from "react";
import CartContext from "./context/CartContext";

const NavBar = () => {

    const { cartItems } = useContext(CartContext);

    const [itemsQuantity, setItemsQuantity] = useState(0);

    useEffect(() => {
        let quantity = cartItems.length;
        setItemsQuantity(quantity);
    }, [cartItems])

    const location = useLocation();
    const isHome = location.pathname === '/';

    const navbarStyle = {
        position: isHome ? 'fixed' : '',
    }

    return (
        <nav className="z-10 flex h-[10vh] w-full items-center bg-slate-100" >
            <div className="w-1/3">
                <h1 className="ml-14 font-medium text-3xl ">Ecommerce</h1>
            </div>
            <div className="flex font-light text-lg w-1/3 justify-around ">
                <Link to='/'>Inicio</Link>
                <Link to='/catalogo'>Catalogo</Link>
                <Link to='/sucursales'>Sucursales</Link>
            </div>
            <div className="w-1/3 flex items-center justify-end">
                <Link to='/cuenta'>
                    <AiOutlineUser className="h-8 w-8 mr-10"/>
                </Link>
                <Link to='/carrito' className="flex">
                    <p className="mr-2 text-2xl">{itemsQuantity}</p>        
                    <AiOutlineShoppingCart className="h-8 w-8 mr-20"/>
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;