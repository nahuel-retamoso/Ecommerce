import { Link } from "react-router-dom"

const Item = ({ title, description, image, price, id }) => {
    return (
        <Link to={`/detail/${id}`} className="rounded-sm mx-5 card w-80 h-96 bg-base-100 shadow-sm hover:shadow-2xl">
            <figure><img src={image} alt={title} /></figure>
            <div className="p-8">
                <div className="h-16 flex justify-between items-start">
                    <h2 className="text-lg font-light mr-4">
                        {title}
                    </h2>
                    <div className="badge badge-secondary mt-1">NEW</div>
                </div>
                <p className="line-clamp-2">{description}</p>
                <div className="card-actions justify-end">
                    <p className="text-xl font-light text-gray-800 mt-4 mr-4">$ {price}</p>
                </div>
            </div>
        </Link>
    )
}

export default Item