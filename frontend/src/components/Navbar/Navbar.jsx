import axios from 'axios';
import { div } from 'motion/react-client';
import { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function Navbar() {

    const [dados, setDados] = useState([])

    const [isVisible, setIsVisible] = useState(true)


    const [isModalOpen, setIsModalOpen] = useState(false)
    const usuario = JSON.parse(localStorage.getItem("usuario"))

    const navigate = useNavigate()

    const fetchUsuario = async () => {
        try {

            if (!usuario?.id) return

            const response = await axios.get(
                `http://localhost:3000/listar/${usuario.id}`
            )

            console.log(response.data)

            // transforma em array caso venha objeto
            setDados(
               response.data ? (Array.isArray(response.data) ? response.data : [response.data]) : []
            )

        } catch (error) {
            console.error("Erro ao carregar usuário:", error)
            setDados([])
        }
    }


    useEffect(() => {
        fetchUsuario()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("usuario")
        localStorage.removeItem("token")
        navigate('/')
    }

    const handleEdit = async () => {

    }


    return (


        <div className='bebas-neue-regular w-full h-15 bg-gradient-to-r from-blue-500 via-blue-950 to-blue-500 border-t-2 text-white flex'>
            <div className='w-150 h-15 flex items-center justify-center text-2xl px-10'>
                <ul className='flex justify-between w-full gap-10 '>
                    <li>
                        <button className='cursor-pointer bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-200  transition-all rounded-2xl hover:px-2  ease-in-out'>Mesa</button>
                    </li>
                    <li>
                        <button className='cursor-pointer bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-200  transition-all rounded-2xl hover:px-2  ease-in-out'>Hambúrgueres</button>
                    </li>
                    <li>
                        <button className='cursor-pointer bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-200  transition-all rounded-2xl hover:px-2  ease-in-out'>Bebidas</button>
                    </li>
                    <li>
                        <button className='cursor-pointer bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-200  transition-all rounded-2xl hover:px-2  ease-in-out'>Sobremesas</button>
                    </li>
                </ul>
            </div>
            <div className='w-full items-center justify-center flex'>
                <button className='flex border items-center w-50 rounded-2xl justify-center gap-4 py-2 cursor-pointer' onClick={() => setIsModalOpen(true)}><FaUser /> Minha conta</button>
            </div>

            {isModalOpen && (
                <div className='flex flex-col w-full absolute top-0 left-0 items-center justify-center bg-linear-to-bl from-neutral-600 via-black to-neutral-600  h-screen'>
                    <AnimatePresence initial={true}>

                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='backdrop-blur-md w-100 h-150  rounded-[10px] absolute right-111 p-5'
                            key="box"
                        >

                            <IoIosClose className='absolute top-2 right-2 cursor-pointer text-5xl  hover:text-red-500 hover:scale-105 transition-all duration-200' onClick={() => setIsModalOpen(false)} />

                            <header>
                                <h1 className='w-full h-30 items-center flex justify-center text-5xl text-shadow-lg text-shadow-black'>Sua conta</h1>
                            </header>
                            <main className='h-100  w-full'>
                                {dados.map((dado) => (
                                    <div key={dado.idusuario} className='flex flex-col items-center justify-center gap-4 mt-10'>
                                        <p className='text-2xl'><span className='text-shadow-lg text-shadow-black'>Nome:</span> {dado?.nome}</p>
                                        <p className='text-2xl'><span className='text-shadow-lg text-shadow-black'>Email:</span> {dado.email}</p>
                                        <p className='text-2xl'><span className='text-shadow-lg text-shadow-black'>Telefone:</span> {dado.telefone}</p>
                                        <p className='text-2xl'><span className='text-shadow-lg text-shadow-black'>CPF:</span> {dado.cpf}</p>
                                        <button className='bg-gradient-to-r w-full from-red-500 to-white hover:from-white hover:to-red-500 transition rounded-2xl px-4 py-2 text-white duration-400 cursor-pointer text-2xl' onClick={handleLogout}>Sair da conta</button>
                                        <button className='bg-gradient-to-r w-full from-blue-500 to-white hover:from-white hover:to-blue-500 transition rounded-2xl px-4 py-2 text-white duration-400 cursor-pointer text-2xl' onClick={handleEdit}>Editar dados</button>
                                    </div>
                                ))}
                            </main>
                        </motion.section>
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}

export default Navbar
