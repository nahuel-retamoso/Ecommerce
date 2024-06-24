const QuantitySelector = ({quantity, set, stock}) => {

    const sum = () => {
        if(quantity < stock){
            set(quantity+1)
        }
    }

    const rest = () => {
        if(quantity > 1){
            set(quantity-1)
        }
    }

    return (
        <div className="flex items-center rounded-md w-40 overflow-hidden h-12">
            <button className="w-1/3 btn font-normal rounded-r-none text-2xl h-full" onClick={() => rest()}>{quantity === 1 ? null : "-"}</button>
            <div className="flex items-center justify-center w-1/3 h-full bg-base-200">
                <p className="flex justify-around font-light">{quantity}</p>
            </div>
            <button className="font-normal w-1/3 btn text-xl h-full rounded-l-none" onClick={() => sum()}>{quantity === stock ? "" : "+"}</button>
        </div>
    )
}

export default QuantitySelector