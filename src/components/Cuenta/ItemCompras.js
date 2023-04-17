const ItemCompras = () => {
    return (
        <div className="flex flex-col justify-center bg-white w-3/4 h-40 border-b-2 border-black p-8">
            <p className="text-lg h-1/6">Fecha: 12/12/2021</p>
            <div className="flex h-5/6">
                <p className="text-xl w-2/3 flex items-center">Item</p>
                <p className="flex items-center w-1/6">x 3</p>
                <div className="w-1/6 overflow-hidden">
                    <img className="h-full w-20" src="" />
                </div>
            </div>
        </div>
    )
}

export default ItemCompras