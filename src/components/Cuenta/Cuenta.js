import ItemCompras from "./ItemCompras"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { getOrderHistory } from "../../firebase/firestore"

const Cuenta = () => {

    const navigate = useNavigate();

    const { logout, currentUser } = useContext(AuthContext);

    const [orderHistory, setOrderHistory] = useState();

    const handleLogOut = () => {
        try {
            logout();
            navigate("/");
        } catch (error) {
            alert("Error al cerrar sesion: ", error.message);
        }
    }

    useEffect(() => {
        async function fetchOrderHistory() {
            if (currentUser) {
                try {
                    const orderHistory = await getOrderHistory(currentUser.uid);
                    setOrderHistory(orderHistory);
                } catch (error) {
                    console.error('Error al obtener el historial de compras:', error);
                }
            }
        }
        fetchOrderHistory();
    }, [currentUser]);

    const displayName = currentUser.displayName;
    const email = currentUser.email;

    return (
        <div className="flex flex-col items-center pt-10 pb-20 w-full h-[90vh] bg-slate-100">
            <div className="w-2/3">
                <div className="flex w-full items-center justify-between items-center">
                    <div className="flex flex-col h-40 justify-center">
                        <p className="text-2xl font-light">{displayName}</p>
                        <p className="text-lg font-extralight">{email}</p>
                    </div>
                    <button onClick={() => handleLogOut()} className="btn btn-accent">Logout</button>
                </div>
                        <p className="text-xl font-extralight">Historial de compras</p>
                <table className="table">
                    <thead>
                        <td>Detalles generales</td>
                        <td>Fecha de la orden y datos de envio</td>
                        <td>Detalles especificos</td>
                    </thead>
                    <tbody>
                        {orderHistory?.map((order, index) => {
                            return <ItemCompras key={index} order={order} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cuenta