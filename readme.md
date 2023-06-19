<!-- DATABASE='mongodb+srv://miguellopez32:43082386@cluster0.ktv8kqa.mongodb.net/' -->

db.createCollection('nuevousu',{
 <!-- validator:{
        $jsonSchema:{
            bsonType:'object',
            required::['nombre','email','dni'],
            properties:{
                nombre:{
                    bsonType:'string',
                    description:'aqui va el nombre de usuario',
                },
                email:{
                    bsonType:'string',
                    description:'aqui va el email del usuario',
                },
                dni:{
                    bsonType:'int',
                    minimum:100,
                    maximum:90000000,
                    description:'aqui va el dni'
                }
            }
        }
    }
}) -->