import ImageSelector from "./ImageSelector";
import QuantitySelector from "./QuantitySelector";
import SizeSelector from "./SizeSelector";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import CartContext from "../context/CartContext";
import { getSpecificProduct, getStockBySize } from "../../sanity";
import Info from "./Info";

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
            const productData = await getSpecificProduct(id);
            setProduct(productData);
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
            <div className="overflow-hidden z-20 flex justify-around items-center h-full w-full rounded-sm shadow-xl bg-base-100">
                <ImageSelector images={product[0]?.images} />
                {Object.keys(product).length === 0 ? <div className="p-20 h-full w-2/5 rounded-l-none">
                    <div className="skeleton mb-3 h-6 w-full"></div>
                    <div className="skeleton mb-3 h-6 w-full"></div>
                    <div className="skeleton mb-3 h-6 w-full"></div>
                    <div className="skeleton mb-3 h-6 w-full"></div>
                    <div className="skeleton mb-3 h-6 w-full"></div>
                    <div className="skeleton mb-3 h-6 w-full"></div>
                    <div className="skeleton mb-3 h-6 w-full"></div>
                    <div className="skeleton mb-3 h-6 w-full"></div>
                </div> : <Info product={product} setSize={setSize} size={size} quantity={quantity} setQuantity={setQuantity} stock={stock} AddItem={AddItem} added={added}/>}
                
            </div>
        </div>
    )
}

export default Detail;