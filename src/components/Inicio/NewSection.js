import Item from "./Item"

const NewSection = () => {
    return (
        <div className="w-full h-[70vh] flex flex-col items-center bg-black/10">
            <div className="flex items-center justify-center w-full h-[8vh] bg-yellow-600">
                <h2 className="text-xl font-bold ">Productos descatados</h2>
            </div>
            <div className="flex w-5/6 items-center justify-around">
                <Item/>
                <Item/>
                <Item/>
                <Item/>
            </div>
        </div>
    )
}

export default NewSection