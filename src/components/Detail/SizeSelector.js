const SizeSelector = ({sizes, set, selected}) => {

    return (
        <div className="flex space-x-5 justify-around items-center w-fit h-10 font-light text-sm rounded-md mt-2 py-10">
            {sizes?.map((size, index) => {
                return <button className={`hover:bg-black/20 rounded-full h-8 w-8 flex items-center justify-around bg-base-200 ${selected == size._key ? 'bg-yellow-600' : ''}`} onClick={() => set(size._size)}>{size.size}</button>
            })}
        </div>
    )
}

export default SizeSelector