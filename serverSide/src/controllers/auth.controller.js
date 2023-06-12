/*
!El backend no entiende los datos json cuando nosotros creamos un servidor de Express.js
!Para subsanarlo en app.js creamos un middleware y usamos app.use(express.json())
*/

//TODO User es la coleccion donde almacenaremos datos en mongodb
import Users from '../models/user.model.js' 

export const register = async (req, res) => {
    //res.send('register')
    //console.log(req.body); visualizamos los datos qe el cliente envia via POST
    const { username, email, password } = req.body
    /* console.log(username, email, password);
    res.send('registrando')*/
    const User = new Users({
        username,
        email,
        password
    })
    try {
        const userSaved = await User.save()
        //res.send('registrando')
        res.json(userSaved)
    }catch(error){
        console.log(error)
}
    //console.log(User)
}   
export const login = (req, res) => {
    //res.send('login')
}

