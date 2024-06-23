import { Link } from "react-router-dom"

const Item = ({ title, description, image, price }) => {
    return (
        <Link className="m-10 w-1/5 h-96 flex flex-col items-center bg-slate-100 p-6 hover:scale-105 shadow hover:shadow-md overflow-hidden" to='/detail'>

            <div className="w-full h-2/3 overflow-hidden">
                <img className="w-full h-full object-cover" src={image} alt={title} />
            </div>
            <div className="w-full">
                <h3 className="pt-5 text-xl">{title}</h3>
                <h3 className="text-sm truncate">{description}</h3>
                <h3 className="font-bold text-2xl mt-2">${price}</h3>
            </div>
        </Link>
    )
}

export default Item