import { useState } from "react";
import CreateAccount from "./CreateAccount";
import Login from "./Login";

const LoginContainer = () => {
    const [activeSection, setActiveSection] = useState('login');

    return (
      <div className="flex items-center justify-center w-full z-40 pt-10 pb-20">
        <div className="flex flex-col items-center justify-center w-3/4 border bg-white/80 rounded pb-10 pt-10">
        <h1 className="text-4xl font-bold mb-10">
          {activeSection === 'login' ? 'Iniciar Sesión' : 'Registrarme'}
        </h1>
          <div className="flex flex-col w-1/3">
            <div className="flex w-full h-14 mb-10">
              <button
                className={`w-1/2 ${activeSection === 'login' ? 'border-b-2 border-yellow-600' : ''}`}
                onClick={() => setActiveSection('login')}
              >
                Ingresar
              </button>
              <button
                className={`w-1/2 ${activeSection === 'register' ? 'border-b-2 border-yellow-600' : ''}`}
                onClick={() => setActiveSection('register')}
              >
                Registrarse
              </button>
            </div>
            {activeSection === 'login' ? <Login /> : <CreateAccount />}
          </div>
        </div>
      </div>
    );
}

export default LoginContainer;