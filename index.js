import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'
import morgan from 'morgan'
import userRoutes from './routes/users.js' 
import LocalStrategy from 'passport-local'
import flash from 'connect-flash'

import User from './models/usermodel.js'

const app=express()
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended:true}))
//app.set('view',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static('public'))

app.use(userRoutes)

//ruta para ver como queda el diseño
/* app.get('/',(req,res)=>{
    res.render('admin/dashboard')
}) */


/* app.get('/',(req,res)=>{
    res.render('pages/index')
}) */

/* app.use(userRoutes) */

dotenv.config({path:'./config.env'})

mongoose
.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

.then(mensaje=>{
    console.log('Base de datos conectada');
})

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy({usernameField:'email'},User.authenticate()))

//middleware de mensaje flash
app.use(flash())

//configurar los mensajes globales
//app.use(())

app.listen(process.env.PORT,()=> {
    console.log('Servidor funcionando OK!');
})