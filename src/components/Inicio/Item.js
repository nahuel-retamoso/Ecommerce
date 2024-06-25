import { Link } from "react-router-dom"

const Item = ({ title, description, image, price, id }) => {
    return (
        <Link to={`/detail/${id}`} className="rounded-sm mx-5 card w-80 h-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt={title} /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p className="h-10 overflow-hidden ">{description}</p>
                <div className="card-actions justify-end">
                    <p className="text-xl text-gray-800 mt-2">$ {price}</p>
                </div>
            </div>
        </Link>
    )
}

export default Item