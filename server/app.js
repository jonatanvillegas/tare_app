import express  from "express";
import {
    getTarea,
    getUserById,
    getUserByEmail,
    createTarea,
    deleteTarea,
    toggleCompleted
} from './database.js'
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())

app.get("/tarea/:id", async (req, res) => {
    const todos = await getTarea(req.params.id);
    res.status(200).send(todos)
})

app.put('/tarea/:id', async (req,res) =>{
    const {value} = req.body
    const tarea = await toggleCompleted(req.params.id, value)
    res.status(200).send(tarea)
})

app.delete('/tarea/:id', async (req, res)=>{
    await deleteTarea(req.params.id)
    res.send({Message: 'Tarea eliminada correctamente'})
})

app.post('/tarea', async(req,res) =>{
    const {user_id, title} = req.body;
    const tarea = await createTarea(user_id, title);
    res.status(201).send(tarea)
})
app.listen( 4000, () => {
    console.log('el servidor esta corriendo en el puerto 4000')
})