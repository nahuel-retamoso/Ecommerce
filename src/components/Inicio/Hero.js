const Hero = () => {
    return (
        <div className="h-[90vh] relative w-full overflow-hidden">
            <div className="h-[6vh] w-full bg-yellow-600 font-bold flex items-center justify-center text-md">10% de descuento en todos nuestros productos</div>
            <div className="flex flex-col absolute bg-white/20 backdrop-blur-xl h-1/2 w-1/4 ml-32 mt-32 items-center justify-center p-20 rounded-md text-white/70">
                <h2 className="text-5xl mb-10">Camperas</h2>
                <p>Nuestras buenas camperas son comodas y sirven para el uso diario de la vida en la ciudad, ademas cuentan con un gran estilo</p>
            </div>
            <button className="absolute bg-yellow-600 w-80 h-20 right-80 bottom-44 text-3xl text-white rounded-md">Comprar Ahora</button>
            <img src="heroImage.jpg" alt='hero-image' />
        </div>
    )
}

export default Hero;