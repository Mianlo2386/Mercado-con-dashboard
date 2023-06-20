import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'
import morgan from 'morgan'
//import {router} from './routes/users.js' 
import userRoutes from './routes/users.js' 
import LocalStrategy from 'passport-local'
import flash from 'connect-flash'

import User from './models/usermodel.js'

const app=express()
//morgan para mirar peticiones
app.use(morgan('dev'))
//obtenemos los datos del formulario
app.use(bodyParser.urlencoded({extended:true}))
//app.set('view',path.join(__dirname,'views'))

//motor de plantilla EJS
app.set('view engine','ejs')
//para el uso de carpeta public
app.use(express.static('public'))

app.use(userRoutes)
//app.use(router)

//ruta para ver como queda el diseño
/* app.get('/',(req,res)=>{
    res.render('admin/dashboard')
}) */


/* app.get('/',(req,res)=>{
    res.render('pages/index')
}) */

/* app.use(userRoutes) */
//datos del env
dotenv.config({path:'./config.env'})

//conexion con DB
mongoose
.connect(process.env.DATABASE,{
    /* useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true */
})

.then(mensaje=>{
    console.log('Base de datos conectada');
})

//app.use(passport.initialize())
//app.use(passport.session())
//passport.use(new LocalStrategy({usernameField:'email'},User.authenticate()))

//middleware de mensaje flash
app.use(flash())

//configurar los mensajes globales
//app.use(())

app.listen(process.env.PORT,()=> {
    console.log('Servidor funcionando OK!');
})