import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-purple-300 flex'>
          
            <div className='mycontainer  flex items-center justify-between px-4 py-5 h-14'>
<div className='logo font-bold text-2xl'>
    <span className='text-green-500'> &lt;</span>
    Paas
    <span className='text-green-500'>OP&gt;</span>
</div>

               
                <button className='text-white bg-green-600 flex my-5 rounded-3xl justify-center items-center ring-white ring-1'>
                     <img className = 'w-10  p-1'  src="github.png" alt="" />
                     <span className='font-bold px-2'>GitHub</span>
                </button>
            </div>

            

        </nav>
    )
}

export default Navbar
