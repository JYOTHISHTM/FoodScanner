
import express,{Application} from 'express'
import cors from 'cors'


const app:Application=express()

app.use(express.json())
app.use(cors())



app.get('/home',(req,res)=>{
    res.send("Api is Running ")
})


export default app

