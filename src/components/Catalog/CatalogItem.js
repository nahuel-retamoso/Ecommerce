import { Link } from "react-router-dom"

const CatalogItem = ({product}) => {


    return (
        <Link to={`/detail/${product._id}`} className="card w-full bg-base-100 rounded-sm hover:shadow-xl shadow-sm">
        <figure><img src={product.images[0]} alt="Shoes" /></figure>
        <div className="card-body">
          <div className="h-16 flex justify-between items-start">
            <h2 className="text-lg font-light mr-4">
              {product.title}
            </h2>
              <div className="badge badge-secondary mt-1">NEW</div>
          </div>
          <div className="card-actions items-center justify-end">
          <div className="badge badge-outline mr-1">10% descuento</div>
            <div className="font-light text-xl">${product.price}</div> 
          </div>
        </div>
      </Link>
    )
}

export default CatalogItem