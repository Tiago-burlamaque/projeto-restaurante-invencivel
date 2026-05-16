import axios from 'axios';
import { div } from 'motion/react-client';
import { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';

function Navbar() {

    const [dados, setDados] = useState([])

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
                Array.isArray(response.data)
                    ? response.data
                    : [response.data]
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
                <section className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center'>
                    <div className='bg-blue-500 min-h-[30rem]  rounded-[10px] min-w-[20rem] p-[2rem]'>
                        <header className='w-full h-30  items-center justify-center flex border-b-2'>
                            <IoIosClose className='fixed top-32 right-137 cursor-pointer shadow bg-linear-65 hover:to-red-500 hover:from-red-950 transition duration-300 ease-in-out hover:scale-105 rounded-full text-4xl' onClick={() => setIsModalOpen(false)} />
                            <h1 className='text-4xl'>Informações</h1>
                        </header>
                        {dados.map((dado) => (
                            <main
                                key={dado.idusuario}
                                className='w-full h-50 items-center justify-center flex-col flex text-2xl'
                            >
                                <h1>Nome: {dado.nome}</h1>
                                <h1>Email: {dado.email}</h1>
                                <h1>Telefone: {dado.telefone}</h1>
                            </main>
                        ))}
                        <footer className='w-full h-40 flex flex-col gap-4'>
                            <button className='p-2 rounded text-2xl shadow shadow-2xl cursor-pointer bg-blue-600 hover:bg-blue-950 transition duration-300 ease-in-out hover:scale-105' onClick={handleEdit}>Editar</button>
                            <button className='p-2 rounded text-2xl shadow shadow-2xl cursor-pointer bg-red-600 hover:bg-red-950 transition duration-300 ease-in-out hover:scale-105' onClick={handleLogout}>Logout</button>
                        </footer>
                    </div>
                </section>
            )}
        </div>
    )
}

export default Navbar
