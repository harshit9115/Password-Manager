import React from 'react'
import { useRef, useState, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let password = localStorage.getItem("password");
        if (password) {
            try {
                const parsedData = JSON.parse(password).filter(item => item !== null);
                setpasswordArray(parsedData);
            } catch (error) {
                console.error("Failed to parse passwords", error);
                setpasswordArray([]);
            }
        }
    }, []);

    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast('copy to clipboard', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert("Failed to copy text");
        }
    }

    const showpassword = () => {
        passwordRef.current.type = 'text'
        if (ref.current.src.includes("eyecross.png")) {
            ref.current.src = "eye.png"
            passwordRef.current.type = 'text'
        }
        else {
            ref.current.src = "eyecross.png"
            passwordRef.current.type = 'password'
        }
    }

    const savepassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

           
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4 }]))
            setform({ site: "", username: "", password: "" })
            toast('Password saved ', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
        else{
             toast('Error: password not saved!');
        }

    }
    const deletepassword = (id) => {
        console.log("DO you want really delete id", id)
        let c = confirm("Do you want really delete password")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
    }
    const editpassword = (id) => {


        console.log("editing password id", id)


        setpasswordArray(passwordArray.filter(item => item.id !== id))
        setform(passwordArray.filter(item => item.id === id)[0])


        // localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value }) // is called spreed metthod
    }


    return (

        <>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            <div className="absolute inset-0 -z-10 h-full w-full  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className='p-2 md:p-0 md:mycontainer min-h-[79vh] '>

                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>
                    Paas
                    <span className='text-green-500'>OP&gt;</span>
                </h1>
                <p className='text-green-800 text-lg text-center'>Your Own Password Manager</p>
                <div className='text-black flex flex-col p-4 gap-6 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' id='' />
                    <div className='flex flex-col md:flex-row w-full flex justify-between gap-6'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="" />
                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="" />
                            <span className='absolute right-0 top-0.5 cursor-pointer' onClick={showpassword}>
                                <img ref={ref} className='p-1' src="/eye.png" alt="" />
                            </span>

                        </div>
                    </div>

                    <button onClick={savepassword} className='flex justify-center items-center bg-green-500 hover:bg-green-400 rounded-full py-2 px-4 w-fit gap-4'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save Password</button>
                </div>
                <div className='password'>
                    <h2 className='font-bold text-xl py-4'> Your Password</h2>
                    {passwordArray.length === 0 && <div>No Password To Show </div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full m-2">
                            <thead className='bg-green-800 text-white rounded-lg overflow-hidden'>
                                <tr>
                                    <th>site</th>
                                    <th>username</th>
                                    <th>password</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>

                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className=' text-center   py-2'>
                                            <span>{item.site} </span>
                                            <div className='' onClick={() => { copyText(item.site) }}>
                                                <lord-icon className={"cursor-pointer w-6"}
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover">

                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className='text-center py-2'>
                                            <span>{item.username} </span>
                                            <div className='' onClick={() => { copyText(item.username) }}>
                                                <lord-icon className={"cursor-pointer w-6"}
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover">

                                                </lord-icon>
                                            </div>

                                        </td>

                                        <td className='text-center  py-2'>
                                            <span>{item.password}</span>
                                            <div className='' onClick={() => { copyText(item.password) }}>
                                                <lord-icon className={"cursor-pointer w-6"}
                                                    style={{ 'width': '', 'height': '' }}
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover">

                                                </lord-icon>
                                            </div>

                                        </td>
                                        <td className='text-center  py-2'>
                                            <span className='mx-1' onClick={() => { editpassword(item.id) }}>
                                                <lord-icon

                                                    src="https://cdn.lordicon.com/ntjwyxgv.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='mx-1 ' onClick={() => { deletepassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xyfswyxf.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>

                                    </tr>
                                })}

                            </tbody>
                        </table>}
                </div>


            </div>



        </>
    )
}

export default Manager
