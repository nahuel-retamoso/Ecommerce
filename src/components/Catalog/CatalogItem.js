import { Link } from "react-router-dom"

const CatalogItem = ({product}) => {


    return (
        <Link to={`/detail/${product._id}`} className="card w-full bg-base-100 hover:shadow-2xl shadow-xl">
        <figure><img src={product.images[0]} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          {/* <p>{product.description}</p> */}
          <div className="card-actions items-center justify-end">
          <div className="badge badge-outline">10% descuento</div>
            <div className="text-success text-lg">${product.price}</div> 
          </div>
        </div>
      </Link>
    )
}

export default CatalogItem