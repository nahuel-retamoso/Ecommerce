import { Link } from "react-router-dom";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";

const Info = ({product, setSize, size, quantity, setQuantity, stock, AddItem, added}) => {
    return (
        <div className="flex flex-col justify-between h-full w-2/5 py-20 px-20">
            <div className="w-full">
                <h2 className="text-4xl font-light text-gray-800">{product[0]?.title}</h2>
                <p className="mt-5 font-extralight text-gray-700">{product[0]?.description}</p>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center mb-5 justify-between">
                    <SizeSelector set={setSize} sizes={product[0]?.sizes} selected={size} />
                    <QuantitySelector quantity={quantity} set={setQuantity} stock={stock} />
                </div>
                <div className="px-1 flex items-center justify-between">
                    <p className="h-full text-2xl mt-5 font-mono text-success">${product[0]?.price}</p>
                    {added == true ? <div className="flex space-x-2"><Link to='/carrito' className="btn btn-secondary">Comprar</Link><Link to='/catalogo' className="btn btn-neutral">Seguir viendo</Link></div> : <button className="btn btn-primary" onClick={AddItem}>Agregar al carrito</button>}
                </div>
            </div>
        </div>
    )
}

export default Info;