import db from "../config/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT nome, email, telefone, cpf FROM usuario WHERE idusuario = ?', [id])

        res.status(200).json({message: "Usuário carregado com sucesso: ",rows})

    } catch (error) {
        res.status(500).json({message: "Erro ao carregar usuário: ", error})
    }
}

export const postUser = async (req, res) => {
    try {
        const { nome, email, senha, telefone, cpf } = req.body;

        if (!nome || !email || !senha || !telefone || !cpf) {
            return res.status(400).json({ Message: "Preencha os campos" })
        }

        // 2. Verificar se usuário já existe
        const [existingUser] = await db.query(
            "SELECT idusuario FROM usuario WHERE email = ? OR telefone = ? OR cpf = ?",
            [email, telefone, cpf]
        );



        if (existingUser.length > 0) {
            return res.status(409).json({ message: "Usuário já cadastrado." });
        }


        const salts = 10
        const hashSenha = await bcrypt.hash(senha, salts);

        const [rows] = await db.query("INSERT INTO usuario (nome, email, senha, telefone, cpf, ativo) VALUES (?, ?, ?, ?, ?, 1)", [nome, email, hashSenha, telefone, cpf])

        return res.status(201).json({
            message: "Usuário criado com sucesso!",
            userId: rows.insertId
        })


    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({
            message: "Erro interno do servidor",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Buscar usuário
        const [rows] = await db.query('SELECT idusuario, nome, email, senha FROM usuario WHERE email = ?',
            [email])

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const usuario = rows[0]

        // Verificar senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gerar token (1 hora de validade)
        const token = jwt.sign(
            {
                id: usuario.idusuario,
                nome: usuario.nome,
                email: usuario.email
            },
            process.env.JWT_SECRET, // colocar no .env
            { expiresIn: '1h' }
        );

        // Resposta
        res.json({
            message: 'Login realizado com sucesso!',
            token,
            usuario: {
                id: usuario.idusuario,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" })
    }
}