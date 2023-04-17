import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()
    const [ error, setError ] = useState()

    const handleLogin = async () => {
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                setError("Contraseña incorrecta");
            } else {
                alert("Error al iniciar sesion: ", error.message);
            }
        }
    }

    return (
        <div className="flex flex-col">
            <p className="mb-4">* Email</p>
            <input className="h-10 rounded border border-black mb-4 pl-3" type="text" onChange={(e) => setEmail(e.target.value)}/>
            <p className="mb-4">* Contraseña</p>
            <input className="h-10 rounded border border-black mb-10 pl-3" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="bg-black/50 rounded-md w-full h-10 justify-center items-center flex bg-yellow-600 font-bold text-white/90" onClick={() => {handleLogin()}}>Ingresar</button>
            {error && <p className="text-red-600 mt-5 ml-1">{error}</p>}
        </div>
    )
}

export default Login