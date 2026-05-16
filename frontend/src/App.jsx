import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { toast } from 'react-toastify'
import { InputMask } from 'primereact/inputmask'
import axios from 'axios'
import { FaGoogle } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom'


function App() {
  // Estado de API
  const [apiRegister, setApiRegister] = useState('http://localhost:3000/registro')
  const [apiLogin, setApiLogin] = useState('http://localhost:3000/login')

  // Inputs de login
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  // Inputs de cadastro
  const [registerNome, setRegisterNome] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cpf, setCpf] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const user = localStorage.getItem('usuario')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (user && token) {
      navigate('/home');
    }
  }, [user, navigate]);

  // Função para fechar modal
  const fecharModal = () => {
    setRegisterNome('')
    setRegisterEmail('')
    setRegisterPassword('')
    setConfirmPassword('')
    setTelefone('')
    setCpf('')
    setIsModalOpen(false)
  }

  // Registro corrigido
  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (registerPassword !== confirmPassword) {
      toast.warning("As senhas não coincidem.")
      setLoading(false)
      return
    }

    try {
      const res = await axios.post(apiRegister, {
        nome: registerNome.trim(),
        email: registerEmail.trim(),
        telefone: telefone.replace(/\D/g, ''),
        cpf: cpf.replace(/\D/g, ''),
        senha: registerPassword
      })

      if (res.status === 201) {
        toast.success("Usuário criado com sucesso!")
        fecharModal()
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Email, telefone ou CPF já cadastrados.")
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Dados inválidos")
      } else {
        toast.error("Erro no servidor")
      }
    } finally {
      setLoading(false)
    }
  }

  // Login corrigido
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(apiLogin, {
        email: email.trim(),
        senha: senha
      })

      const { token, usuario } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('usuario', JSON.stringify(usuario))

      toast.success('Usuário logado com sucesso!')
      navigate('/home', { replace: true })
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Email ou senha incorretos')
      } else {
        toast.error('Erro de conexão')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-500 via-yellow-500 to-blue-500 flex flex-col lg:flex-row">
      {/* Lado esquerdo - Hero */}
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-8 lg:p-12 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bebas-neue-regular text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 drop-shadow-2xl leading-tight"
        >
          Seja bem-vindo à
          <span className="block text-yellow-300 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black">Invencible Restaurant</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-md mx-auto leading-relaxed"
        >
          A melhor entrega da sua região!
        </motion.p>
      </div>

      {/* Lado direito - Formulário */}
      <div className="lg:w-1/2 w-full bg-white/90 backdrop-blur-xl lg:rounded-l-3xl shadow-2xl p-6 lg:p-12 flex flex-col">
        {/* Header */}
        <header className="text-center mb-8">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bebas-neue-regular text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-2"
          >
            {isModalOpen ? 'Cadastre-se' : 'Faça Login'}
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isModalOpen ? 'Crie sua conta agora mesmo!' : 'Entre na sua conta'}
          </motion.p>
        </header>

        {/* Formulário Login */}
        {!isModalOpen ? (
          <motion.main
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center space-y-6"
          >
            <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto w-full">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  placeholder="Digite seu email"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  placeholder="Digite sua senha"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white py-4 px-6 rounded-xl text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            {/* Link cadastro */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">Não tem conta?</p>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors duration-300 hover:underline"
              >
                Cadastre-se agora
              </button>
            </div>

            {/* Google */}
            <div className="flex items-center justify-center space-x-2 pt-6 border-t border-gray-200">
              <span className="text-sm text-gray-500">Ou</span>
              <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 text-sm">
                <FaGoogle className="text-xl" />
                Google
              </button>
            </div>
          </motion.main>
        ) : (
          /* Modal de Cadastro - Agora é inline responsivo */
          <motion.main
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col justify-center space-y-6"
          >
            <button
              onClick={fecharModal}
              className="self-end text-gray-500 hover:text-gray-700 text-2xl -mt-8 hover:scale-110 transition-all duration-300"
            >
              <IoIosClose />
            </button>

            <form onSubmit={handleRegister} className="space-y-4 max-w-md mx-auto w-full">
              <div>
                <input
                  value={registerNome}
                  onChange={(e) => setRegisterNome(e.target.value)}
                  type="text"
                  placeholder="Nome completo"
                  className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="Telefone"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InputMask
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="CPF"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Senha"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar senha"
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                required
                disabled={loading}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Cadastrando...' : 'Criar Conta'}
              </button>
            </form>
          </motion.main>
        )}
      </div>
    </section>
  )
}

export default App