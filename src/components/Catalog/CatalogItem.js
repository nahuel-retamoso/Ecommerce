import { Link } from "react-router-dom"

const CatalogItem = ({product}) => {

    const firstImage = product.images && product.images.length > 0 ? product.images[0] : '';

    return (
        <Link to={`/detail/${product.id}`}>
            <div className="flex flex-col justify-around items-center bg-white p-5 h-[25rem] shadow hover:scale-105 hover:shadow-md">
                <div className=" overflow-hidden h-64">
                    <img src={firstImage}/>
                </div>
                <div className="w-full ml-2">
                    <h3 className="pt-5 mb-2">{product.name}</h3>
                    <h3 className="text-2xl font-bold">${product.price}</h3>
                </div>
            </div>
        </Link>
    )
}

export default CatalogItem