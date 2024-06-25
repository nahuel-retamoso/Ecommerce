import { useEffect, useState } from 'react';
import { getSpecificProduct } from '../../sanity';

const CarritoItem = ({ item, remove }) => {

  const { productId, quantity, size } = item;
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const product = await getSpecificProduct(productId);
      setProduct(product[0]);
      console.log('Este es un item del carrito:', product)
    };
    fetchData();
  }, []);

  if (!product) {
    return null;
  }

  return (
    <tbody>
      <tr>
        <th>
          <label>
            <button className='btn btn-circle' onClick={() => remove(productId)}>X</button>
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={product.images[0]}
                  alt={product.title} />
              </div>
            </div>
            <div>
              <div className="font-normal">{product.title}</div>
              <div className="text-sm font-light opacity-50">Talle: {size}</div>
            </div>
          </div>
        </td>
        <td className='text-sm opacity-50 font-light'>x {quantity}</td>
        <th>
          <div className="text-sm font-light opacity-50">$ {product.price * quantity}</div>
        </th>
      </tr>
    </tbody>
  );
};


export default CarritoItem