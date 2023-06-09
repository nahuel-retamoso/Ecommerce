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
        <div className="flex flex-col items-center pt-10 pb-20 w-full bg-black/10">
            <div className="w-2/3">
                <div className="flex w-full items-center">
                    <div className="flex flex-col w-5/6 h-40 justify-center pl-10">
                        <p className="text-4xl font-bold">{displayName}</p>
                        <p className="text-xl mt-3">{email}</p>
                    </div>
                    <div className="w-1/6 h-full flex items-center justify-center">
                        <button onClick={() => handleLogOut()}className="h-10 w-28 bg-yellow-600 rounded-md text-white">Salir</button>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-5 w-full bg-white pb-20">
                    <p className="text-2xl mt-10 mb-10 font-bold">Historial de compras</p>
                    {orderHistory?.map((order, index) => {
                        return <ItemCompras key={index} order={order}/>
                    })}
                    
                </div>
            </div>
        </div>
    )
}

export default Cuenta