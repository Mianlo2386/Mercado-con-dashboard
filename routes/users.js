import express from 'express'
import passport from 'passport'

const router=express.Router()

import User from '../models/usermodel.js'

/* 
router.get('/',(req,res)=>{
    res.render(users/index')
})
 */

router.get('/login',(req,res)=>{
    res.render('users/login')
})

router.post('/login',passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/login',
    failureFlash:'Alguno de los datos es incorrecto. Intente nuevamente!'
}))

router.post('/registrar',(req,res)=>{
    let {nombre,email,password}=req.body;
    let userData={
        nombre:nombre,
        email:email
    }
    User.register(userData,password,(error,user)=>{
        if(error){
            req.flash('error_msg','ERROR:'+error)
            res.redirect('/registrar')
        }
        req.flash('success_msg','Cuenta creada')
        res.render('users/registrar')
    })
    
})
 
//cerrar sesion
router.get('/logout',(req,res)=>{
    req.logOut()
    req.flash('success_msg','Se cerro la sesion')
    res.redirect('/login')
})

router.get('/dashboard',(req,res)=>{
    res.render('admin/dashboard')
})

router.get('/olvide',(req,res)=>{
    res.render('users/olvide')
})

//todos los usuarios
router.get('/alluser',(req,res)=>{
    User.find({})
    .then(users=>{
        res.render('users/alluser',{users:users})
    })
    .catch(error=>{
        //mensaje de error para el administrador
        res.redirect('users/alluser')
    })
})
router.get('/edituser/:id',(req,res)=>{
    let buscarId={_id:req.params.id}
    User.findOne(buscarId)
    .then(user=>{
        res.render('/users/edituser',{user:user})
    })
    .catch(error=>{
        //mensaje del error
        res.redirect('users/alluser')
    })
    /* req.params.nombre */
})

router.delete('/eliminar/users/:id',(req,res)=>{
    let buscarId={_id:req.params.id}
    User.deleteOne(buscarId)
    .then(user=>{
       //mensaje se borro con exito
       res.redirect('users/alluser') 
    })
    .catch(error=>{
        //mensaje de error en base
        res.redirect('users/alluser') 
    })
})

export default router
/* const express=required('express')==>import....FORMA ANTIGUA
module.exports=router */
//export {router}
