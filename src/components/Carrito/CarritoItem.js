import { getProductById } from '../../firebase/firestore';
import { useEffect, useState } from 'react';

const CarritoItem = ({item, remove}) => {

    const {productId, quantity} = item;
    const [product, setProduct] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const product = await getProductById(productId);
            setProduct(product);
        };
        fetchData();
    }, []);

    if (!product) {
      return null;
    }

    const TotalPrice = product?.price * quantity;

    return (
      <div className="flex w-5/6 bg-white/90 mb-3 shadow">
        <div className="flex items-center justify-center h-28 m-2 w-40 overflow-hidden">
          <img
            src={product?.images[0]}
            className="m-2"
          />
        </div>
        <p className="flex items-center pl-10 text-xl w-1/2 h-full bg-white/90">
          {product?.name}
        </p>
        <p className="flex items-center justify-center bg-white/90 w-1/6 text-xl">
          x {quantity}
        </p>
        <p className="flex items-center justify-center bg-white/90 w-1/6 text-xl font-bold">
          ${TotalPrice}
        </p>
        <div className="flex items-center justify-center w-1/6 h-full bg-white/90">
          <button className='text-3xl font-bold text-red-700' onClick={() => remove(productId)}>X</button>
        </div>
      </div>
    );
  };
  

export default CarritoItem