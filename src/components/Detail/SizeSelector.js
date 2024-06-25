const SizeSelector = ({sizes, set, selected}) => {

    return (
        <div className="flex space-x-5 justify-around items-center w-fit font-light text-sm rounded-md">
            {sizes?.map((size, index) => {
                return <button className={`rounded-full h-9 w-9 flex items-center justify-around ${selected == size ? 'bg-accent shadow-md' : 'hover:bg-black/20 bg-base-200'}`} onClick={() => set(size)}>{size.size}</button>
            })}
        </div>
    )
}

export default SizeSelector