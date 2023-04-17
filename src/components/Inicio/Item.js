import { Link } from "react-router-dom"

const Item = () => {
    return (
        <Link className="w-1/5 h-3/4 flex flex-col justify-around items-center bg-white p-5 hover:scale-105 shadow hover:shadow-md" to='/detail'>
            <div className=" overflow-hidden">
                <img src="./tshirt-black.jpg"/>
            </div>
            <div className="w-full">
                <h3 className="pt-5 text-xl">Producto textil</h3>
                <h3 className="text-sm">Breve descripcion del producto</h3>
                <h3 className="font-bold text-2xl mt-2">$4000</h3>
            </div>
        </Link>
    )
}

export default Item