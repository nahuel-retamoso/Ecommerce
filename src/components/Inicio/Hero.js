import React, { useEffect, useState } from 'react'
import { getHome } from '../../sanity'

const Hero = () => {
    const [content, setContent] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const content = await getHome()
            setContent(content.length > 0 ? content[0] : null) // Ajusta esto según la estructura de tus datos
            console.log(content)
        }
        fetchData()
    }, [])

    if (!content) {
        return <div>Loading...</div>
    }

    return (
        <div className="h-[90vh] relative w-full overflow-hidden">
            <div className="h-[6vh] w-full bg-yellow-600 font-light flex items-center justify-center text-md text-slate-50">
                {content.slider}
            </div>
            <div className="flex flex-col absolute bg-white/20 backdrop-blur-xl w-1/4 ml-32 mt-40 justify-center p-12 rounded-md text-slate-300">
                <h2 className="text-3xl font-bold mb-2">{content.title}</h2>
                <p className='text-md text-slate-300 font-light'>{content.description}</p>
                <button className=" bg-yellow-600/50 font-normal p-4 px-5 mt-7 text-md w-fit text-slate-100 rounded-2xl">
                Ver ahora
            </button>
            </div>
            <img src={content.image} alt='hero-image' />
        </div>
    )
}

export default Hero
