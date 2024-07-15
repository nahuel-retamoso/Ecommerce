import { Link } from "react-router-dom"

const CatalogItem = ({ product }) => {


  return (

    <Link to={`/detail/${product._id}`} className="rounded-sm mx-5 card w-full h-96 bg-base-100 hover:shadow-sm">
      <figure><img src={product?.images[0]} alt={product?.title} /></figure>
      <div className="pt-8">
        <div className="badge badge-secondary mb-1">NEW</div>
        <div className="flex justify-between items-start ">
          <h2 className="text-lg font-medium mr-4 text-gray-800">
            {product?.title}
          </h2>

        </div>
        <p className="line-clamp-1 text-gray-500 font-light text-md">{product?.description}</p>
        <div className="card-actions justify-start">
          <p className="text-md font-light text-gray-500 mt-4 mr-1 line-through">$ {product?.price}</p>
          <p className="text-lg font-medium text-gray-800 mt-4 mr-4 ">$ {product?.price}</p>
        </div>
        <div className="text-green-700 font-semibold ">20% de descuento</div>
      </div>
    </Link>
  )
}

export default CatalogItem