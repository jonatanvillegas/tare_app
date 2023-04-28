import mysql from 'mysql2';
import dotenv from 'dotenv';

// configurando la base de datos para los query
dotenv.config();
 const pool = mysql
 .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
 }).promise();


 //obtener tareas 
 export const getTarea= async (id) =>{
    const [row] = await pool.query('SELECT * FROM tareas WHERE user_id = ?', [id])
    return(row)
 }
 
 export const getUserById= async (id) =>{
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id])
    return(rows[0])
 }
 

 export const getUserByEmail = async (email ) =>{
    const [rows] = await pool.query('SELECT * FROM usuario WHERE email  = ?', [email])
    return (rows[0])
 }
 

 export const createTarea = async (user_id, title) =>{
    const [result] = await pool.query('INSERT INTO tareas VALUES (?, ?)', [user_id, title]);
    const todoID = result.insertId;
    return getTarea(todoID)
 }
 

  export const deleteTarea = async (id) =>{
    const [result] = await pool.query('DELETE FROM tareas WHERE id = ?', [id]);
    
    return result
 }

 export const toggleCompleted = async (id, value) =>{
    const newValue = value === true ? "TRUE" : "FALSE";
    const [result] = await pool.query(`UPDATE tareas SET completado = ${newValue} WHERE id = ?`, [id]);
    
    return result
 }
 