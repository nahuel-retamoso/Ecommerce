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
                order: response,
                adress: shippingAddress,
                email: email,
            }
            sendEmail(form);
        })
        clearCart();
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center bg-slate-100 h-[90vh]">
            <form onSubmit={handleSubmit}>
                <div className='flex space-x-5'>
                    <div className='flex flex-col font-light'>
                        <h3 className='text-xl font-extralight mb-2'>Información Personal</h3>
                        <input className='input input-bordered mt-2 mb-4' type="text" placeholder='Nombre' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <input className='input input-bordered mt-2 mb-4' type="text" placeholder='Apellido' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <input className='input input-bordered mt-2 mb-4' type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <h3 className='text-xl font-extralight mb-2'>Datos de envío</h3>
                        <input className='input input-bordered mt-2' type="text" placeholder='Direccion' value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
                    </div>
                    <div className='flex flex-col justify-between font-light'>
                        <div className='flex flex-col'>
                            <h3 className='text-xl font-extralight mb-2'>Información de la tarjeta</h3>
                            <input className='input input-bordered mt-2 mb-4 text-gray-600' type="text" value='4242 4242 4242 4242' />
                            <input className=' text-gray-600 input input-bordered mt-2 mb-4' type="text" value='234' />
                            <input className='text-gray-600 input input-bordered mt-2 mb-4' type="text" value='02/25' />
                        </div>
                        <button className='btn btn-accent' type="submit">Comprar</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;

