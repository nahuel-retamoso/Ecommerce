import ImageSelector from "./ImageSelector";
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
    const [itemSize, setItemSize] = useState('');
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



    const sizeSelector = (selected) => {
        setItemSize(selected);
        setQuantity(1);
    
        const fetchStock = async () => {
            try {
                const stockData = await getStockBySize(product[0]._id, selected._key);
                setStock(stockData.sizes.stock);
                console.log('Size selected:', selected);
            } catch (error) {
                console.error('Error fetching stock:', error);
            }
        };
    
        fetchStock();
    };

    const AddItem = () => {
        if (itemSize) {
            addItemToCart(product[0]._id, quantity, itemSize.size, product[0].price);
            setAdded(true);
        } else {
            alert('Selecciona un tamaño')
        }
    }



    return (
        <div className="flex items-center justify-around w-full h-[90vh] bg-slate-100 p-10">
            <div className="overflow-hidden flex justify-around items-center h-full w-full rounded-sm shadow-xl bg-base-100">
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
                </div> : <Info product={product} setSize={sizeSelector} size={itemSize} quantity={quantity} setQuantity={setQuantity} stock={stock} AddItem={AddItem} added={added} />}

            </div>
        </div>
    )
}

export default Detail;