require ('dotenv').config()
import express from 'express'
import router from './routes/user_routes'
const cors = require('cors')
const app = express()

app.use(cors({
    origin: "http://localhost:5174", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
app.use('/v0.0.1/api', router)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Ctrl + C para cerrar')
    console.log(`App escuchando en el puerto ${PORT}`)
})