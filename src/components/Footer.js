const Footer = () => {
    return (
        <footer className="flex items-center bg-black text-white/50 h-48">
            <div className="flex flex-col items-center w-1/4">
                <p>Created by Nahuel Ale Retamoso</p>
            </div>
            <div className="flex flex-col items-center w-1/4 h-full pt-10">
                <p className="text-xl pb-2">Centro de Atencion al Cliente</p>
                <p>Telefono: 0800-222-2222</p>
                <p>Horario: Lunes a Viernes de 9 a 18hs</p>
            </div>
            <div className="flex flex-col items-center w-1/4 h-full pt-10">
                <p className="text-xl pb-2">Redes Sociales</p>
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Twitter</p>
            </div>
            <div className="flex flex-col items-center w-1/4 h-full pt-10">
                <p className="text-xl pb-2">Ayuda</p>
                <p>Envios</p>
                <p>Devoluciones</p>
                <p>Garantias</p>
            </div>
        </footer>
    );
}

export default Footer;