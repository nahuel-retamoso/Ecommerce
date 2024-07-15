import { Link } from "react-router-dom"

const Item = ({ title, description, image, price, id }) => {
    return (
        <Link to={`/detail/${id}`} className="rounded-sm mx-5 card w-80 h-96 bg-base-100 shadow-sm hover:shadow-md">
            <figure><img src={image} alt={title} /></figure>
            <div className="pt-8">
            <div className="badge badge-secondary mb-1">NEW</div>
                <div className="flex justify-between items-start ">
                    <h2 className="text-lg font-medium mr-4 text-gray-800">
                        {title}
                    </h2>
                   
                </div>
                <p className="line-clamp-1 text-gray-500 font-light text-md">{description}</p>
                <div className="card-actions justify-start">
                    <p className="text-md font-light text-gray-500 mt-4 mr-1 line-through">$ {price}</p>
                    <p className="text-lg font-medium text-gray-800 mt-4 mr-4 ">$ {price}</p>
                </div>
                <div className="text-green-700 font-semibold ">20% de descuento</div>
            </div>
        </Link>
    )
}

export default Item