import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Carrito from './components/Carrito/Carrito';
import CatalogContainer from './components/Catalog/CatalogContainer';
import Cuenta from './components/Cuenta/Cuenta';
import Detail from './components/Detail/Detail';
import Footer from './components/Footer';
import Hero from './components/Inicio/Hero';
import NavBar from './components/NavBar';
import NewSection from './components/Inicio/NewSection';
import Sucursales from './components/Sucursales';
import LoginContainer from './components/Login/LoginContainer';
import { AuthProvider } from './components/context/AuthContext';
import { CartProvider } from './components/context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Checkout from './components/Checkout/Checkout';

function App() {

  return (
    <div className="h-screen">
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
          <NavBar/>
          <Routes>
            <Route path='/login' element={<LoginContainer/>} />
            <Route path="/" element={<div className="min-h-screen"><Hero/><NewSection/></div>}/>
            <Route path="/catalogo" element={<CatalogContainer/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
            <Route path='/sucursales' element={<Sucursales/>}/>
            <Route path='/carrito' element={<ProtectedRoute/>}>
              <Route index element={<Carrito/>}/>
            </Route>
            <Route path='/cuenta' element={<ProtectedRoute/>}>
              <Route index element={<Cuenta/>}/>
            </Route>
            <Route path='/checkout' element={<ProtectedRoute/>}>
              <Route index element={<Checkout/>}/>
            </Route>
          </Routes>
          <Footer/>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
