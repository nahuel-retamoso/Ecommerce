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
        <div className="flex items-center bg-white rounded-md w-40 h-10 overflow-hidden mt-5">
            <button className="w-1/3 text-2xl hover:bg-black/10 h-full" onClick={() => rest()}>-</button>
            <p className="flex justify-around w-1/3">{quantity}</p>
            <button className="w-1/3 text-xl hover:bg-black/10 h-full" onClick={() => sum()}>+</button>
        </div>
    )
}

export default QuantitySelector