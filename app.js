const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

var bodyParser = require('body-parser')
const { response } = require('express')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const keyLocalStorage = "users";

app.use(bodyParser.urlencoded({ extended: false }))

let users = {}

const user = { 
    "password" : "1234", 
    "token" : "token"
}
users["Kevin"] = user;

localStorage.setItem(keyLocalStorage,JSON.stringify(users));

app.get('/', (req, res) => {
    res.redirect("/login");
})

app.post('/home', (req, res) => {
    const username = req.body.nombre;
    const password = req.body.password;

    const users = JSON.parse(localStorage.getItem(keyLocalStorage));
    const user = users[username];

    if (user == null) {
        return res.send("El usuario no existe.")
    }

    if(!user.token){
        return res.send("No existe token.")
    }
   
    if (user.password != password) {
       return res.send("La contraseña no coincide.")
    }

    res.send(`<html><body><h3>Hello ${username}!</h3><button type="text"><a href="/logout?username=${username}">Cerrar session</a></button></body></html>`)
    
  })

app.get('/login', (req, res) => {
    res.send('<html><body><h3>Login</h3><form action="/home" method="post"><div class="container"><label for="uname"><b>Username</b></label><input type="text" placeholder="Enter Username" name="nombre" required><label for="psw"><b>Password</b></label><input type="password" placeholder="Enter Password" name="password" required><button type="submit">Login</button></div></form><button type="text"><a href="/register">Register</a></button></body></html>')
})

app.get('/register', (req, res) => {
    res.send('<html><body><h3>Register</h3><form action="/add" method="post"><div class="container"><label for="uname"><b>Username</b></label><input type="text" placeholder="Enter Username" name="nombre" required><label for="psw"><b>Password</b></label><input type="password" placeholder="Enter Password" name="password" required><button type="submit">Login</button></div></form></body></html>')
})

app.post('/add', (req, res) => {
    var username = req.body.nombre;
    var password = req.body.password;
    const users = JSON.parse(localStorage.getItem(keyLocalStorage));

    if (username == "" || username == " ") {
        res.send("El usuario no puede estar vacio.")
    }
    if (password == "" || password == " ") {
        res.send("La contraseña no puede estar vacia.")
    }

    const newUser = { 
        "password" : password, 
        "token" : "token"
    }
    users[username] = newUser;
    localStorage.setItem("users",JSON.stringify(users));


    res.redirect("/login");
})

app.get('/logout', (req, res) => {
    const username = req.query.username
    const users = JSON.parse(localStorage.getItem(keyLocalStorage));
    const user = users[username]

    if(user == null){
        return res.send("El usuario no existe")
    }

    user.token = "";
    users[username] = user;

    console.log(users);

    localStorage.setItem("users", JSON.stringify(users));

    res.redirect("/login")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})