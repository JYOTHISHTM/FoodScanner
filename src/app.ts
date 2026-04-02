
import express,{Application} from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import productRoutes from './routes/productRoutes'


const app:Application=express()

app.use(express.json())
app.use(cors())


app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

app.get('/home',(req,res)=>{
    res.send("Api is Running ")
})


export default app

