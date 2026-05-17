import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()
const db = mysql2.createPool({
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "fultast",
    database: process.env.DB_NAME || "inciveldelivery",
    host: process.env.DB_HOST || "localhost"
})

export default db;