import React from 'react'

const Footer = () => {
    return (
        <div className='bg-purple-400 text-black flex flex-col justify-center items-center w-full '>
            <div className='logo font-bold text-2xl'>
                <span className='text-green-500'> &lt;</span>
                Paas
                <span className='text-green-500'>OP&gt;</span>
            </div>
            <div className='flex'>
                create with <img className= 'w-6 mx-1'src="heart.png" alt="" /> Harshit-Shrivastav
            </div>
        </div>
    )
}

export default Footer
