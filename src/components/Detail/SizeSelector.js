const SizeSelector = ({sizes, set, selected}) => {

    return (
        <div className="flex justify-around items-center w-fit h-10 bg-white rounded-md mt-2 ">
            {sizes?.map((size, index) => {
                return <button className={`hover:bg-black/20 rounded-full h-8 w-8 flex items-center justify-around ml-2 ${selected == size ? 'bg-yellow-600' : ''}`} onClick={() => set(size)}>{size}</button>
            })}
        </div>
    )
}

export default SizeSelector