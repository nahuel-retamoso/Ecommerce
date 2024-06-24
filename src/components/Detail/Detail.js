import ImageSelector from "./ImageSelector";
import QuantitySelector from "./QuantitySelector";
import SizeSelector from "./SizeSelector";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import CartContext from "../context/CartContext";
import { getSpecificProduct, getStockBySize } from "../../sanity";

const Detail = () => {

    const { addItemToCart } = useContext(CartContext);

    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState();
    const [added, setAdded] = useState(false)
    const [stock, setStock] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const product = await getSpecificProduct(id);
            setProduct(product);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log(product)
        console.log('Stock is:', stock)
    }, [product, stock])

    useEffect(() => {
        setQuantity(1)
        const fetchStock = async () => {
            const stock = await getStockBySize(product[0]._id, size._key)
            setStock(stock.sizes.stock)
        };
        fetchStock()
        console.log('Size selected:' , size )
    }, [size])

    const AddItem = () => {
        if (size) {
            addItemToCart(product.id, quantity, size, product.price);
            setAdded(true);
        } else {
            alert('Selecciona un tamaño')
        }
    }

    return (
        <div className="flex items-center justify-around w-full h-[90vh] bg-base-200 p-10">
            <div className="overflow-hidden z-20 flex justify-around items-center h-full w-full rounded-2xl shadow-xl bg-base-100">
                <ImageSelector images={product[0]?.images} />
                <div className="flex flex-col justify-between h-full w-2/5 py-20 px-20">
                    <div className="w-full">
                        <h2 className="text-4xl font-light text-gray-800">{product[0]?.title}</h2>
                        <p className="mt-5 font-extralight text-gray-700">{product[0]?.description}</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-5 justify-between">
                            <SizeSelector set={setSize} sizes={product[0]?.sizes} selected={size}/>
                            <QuantitySelector quantity={quantity} set={setQuantity} stock={stock}/>
                        </div>
                        <div className="px-1 flex items-center justify-between">
                            <p className="h-full text-2xl mt-5 font-mono text-success">${product[0]?.price}</p>
                            {added == true ? <div className="flex"><Link to='/carrito' className="btn btn-secondary">Comprar</Link><Link to='/catalogo' className="btn btn-neutral">Seguir viendo</Link></div> : <button className="btn btn-primary" onClick={AddItem}>Agregar al carrito</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;