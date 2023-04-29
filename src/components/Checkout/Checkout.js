import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'
import { createOrder } from '../../firebase/firestore';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');

    const { currentUser } = useContext(AuthContext);
    const { cartItems, clearCart } = useContext(CartContext);

    useEffect(() => {
        if (currentUser) {
            setFirstName(currentUser.displayName.split(' ')[0]);
            setLastName(currentUser.displayName.split(' ')[1]);
            setEmail(currentUser.email);
        }
    }, [currentUser]);

    const sendEmail = (form) => {

        emailjs.send(process.env.REACT_APP_serviceId, process.env.REACT_APP_templateId, form, process.env.REACT_APP_publicKey)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error);
            });
    };


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        alert('Pago completado con éxito');

        createOrder(currentUser.uid, email, shippingAddress, cartItems, totalPrice).then(response => {
            const form = {
                name: `${firstName} ${lastName}`,
                order:response,
                adress: shippingAddress,
                email: email,
            }
            sendEmail(form);
        })
        clearCart();
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className='text-2xl font-bold mb-10 mt-10'>Finalizar compra</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <h3 className='text-xl font-bold mb-2'>Información Personal</h3>
                    <p>Nombre:</p>
                    <input className='mt-2 mb-4 border rounded border-black pl-3 h-8' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <p>Apellido:</p>
                    <input className='mt-2 mb-4 border rounded border-black pl-3 h-8' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <p>Correo:</p>
                    <input className='mt-2 mb-4 border rounded border-black pl-3 h-8' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <h3 className='text-xl font-bold mb-2'>Información de la tarjeta</h3>
                    <p>Numero de tarjeta</p>
                    <input className='mt-2 mb-4 border rounded border-black pl-3 h-8' type="text" value='4242 4242 4242 4242' />
                    <p>Fecha de vencimiento:</p>
                    <input className='mt-2 mb-4 border rounded border-black pl-3 h-8 w-20' type="text" value='234' />
                    <p>CVV:</p>
                    <input className='mt-2 mb-4 border rounded border-black pl-3 h-8 w-20' type="text" value='02/25' />
                    <h3 className='text-xl font-bold mb-2'>Datos de envío</h3>
                    <p>Dirección:</p>
                    <input className='mt-2 mb-4 border rounded border-black pl-3 h-8' type="text" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
                    <button className='bg-yellow-600 rounded w-40 h-10 text-white/90 mt-5 mb-20' type="submit">Pagar</button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;

