import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';


const CreateAccount = () => {

    const navigate = useNavigate();

    const { signup } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const { user } = await signup(email, password, firstName, lastName);
            console.log("Usuario registrado: ", user);
            navigate(-1);
        } catch (error) {
            console.error("Error al registrar el usuario: ", error.message);
            setError(error.message);
        }
    };


    return (
        <div className="flex flex-col">
            <p className="mb-4">* Nombre</p>
            <input className="p-3 h-10 rounded border border-black mb-4" type="text" onChange={(e) => setFirstName(e.target.value)} />
            <p className="mb-4">* Apellido</p>
            <input className="p-3 h-10 rounded border border-black mb-4" type="text" onChange={(e) => setLastName(e.target.value)}/>
            <p className="mb-4">* Email</p>
            <input className="p-3 h-10 rounded border border-black mb-4" type="text" onChange={(e) => setEmail(e.target.value)}/>
            <p className="mb-4">* Contraseña</p>
            <input className="p-3 h-10 rounded border border-black mb-4" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <p className="mb-4">* Repetir Contraseña</p>
            <input className="p-3 h-10 rounded border border-black mb-10" type="password" onChange={(e) => setPasswordConfirmation(e.target.value)}/>
            <button  onClick={handleSignUp} className="bg-black/50 rounded-md w-full h-10 justify-center items-center flex bg-yellow-600 font-bold text-white/90">Registrarme</button>
            {error && <p className="text-red-600 mt-5 ml-1">{error}</p>}
        </div>
    )
}

export default CreateAccount