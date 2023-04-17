import ImageSelector from "./ImageSelector";
import QuantitySelector from "./QuantitySelector";
import SizeSelector from "./SizeSelector";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getProductById } from "../../firebase/firestore";
import CartContext from "../context/CartContext";

const Detail = () => {

    const { addItemToCart } = useContext(CartContext);
    
    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState();
    const [added, setAdded] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const product = await getProductById(id);
            setProduct(product);
        };
        fetchData();
    }, [id]);

    const AddItem = () => {
        if (size) {
            addItemToCart(product.id, quantity, size, product.price);
            setAdded(true);
        } else {
            alert('Selecciona un tamaño')
        }
    }

    return (
        <div className="flex items-center justify-around w-full h-[90vh] bg-black/10">
            <div className="z-20 flex justify-around items-center w-5/6 h-5/6 rounded-md bg-white">
                <ImageSelector images={product.images}/>
                <div className="flex flex-col pt-20 w-1/2 p-10 pr-20 h-full">
                    <h2 className="text-4xl font-bold">{product.name}</h2>
                    <p className="mt-5">{product.description}</p>
                    <p className="text-2xl mt-5 font-bold">${product.price}</p>
                    <p>Stock: {product.stock}</p>
                    <SizeSelector set={setSize} sizes={product.sizes} selected={size}/>
                    <QuantitySelector quantity={quantity} set={setQuantity} stock={product.stock}/>
                    {added == true ? <div className="flex flex-col"><Link to='/carrito' className="flex items-center justify-center bg-black text-white font-bold py-2 px-4 rounded mt-5">Terminar Compra</Link><Link to='/catalogo' className="flex items-center justify-center bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-5">Seguir comprando</Link></div> : <button className="bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-5" onClick={AddItem}>Agregar al carrito</button>}
                </div>
            </div>
        </div>
    )
}

export default Detail;