import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

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
        <div className="flex flex-col w-96 space-y-5">
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input onChange={(e) => setEmail(e.target.value)} type="text" className="grow" placeholder="Email" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                </svg>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="grow" value={password} />
            </label>
            <div className="text-sm">
                <p className="font-light">Credenciales de prueba <span className="font-extralight">(tambien podes crear tu cuenta)</span></p>
                <p className="font-thin">Email: <span className="font-light">username@account.com</span></p>
                <p className="font-thin">Password: <span className="font-light">password</span></p>
            </div>
            <button className="bg-black/50 rounded-lg w-full h-12 justify-center items-center flex bg-yellow-600 font-bold text-white/90" onClick={() => { handleLogin() }}>Ingresar</button>
            {error && <p className="text-red-600 mt-5 ml-1">{error}</p>}
        </div>
    )
}

export default Login