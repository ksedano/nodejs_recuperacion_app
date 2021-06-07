const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser')
const { response } = require('express')
app.use(bodyParser.urlencoded({ extended: false }))

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
localStorage.setItem("username","Kevin");
localStorage.setItem("password","1234");

app.get('/', (req, res) => {
    res.redirect("/login");})

app.post('/home', (req, res) => {
    const username = req.body.nombre;
    const password = req.body.password;

    if (localStorage.getItem("username") == username) {
        if (localStorage.getItem("password") == password) {
            res.send(`Hello ${req.body.nombre}!`)
        }
        res.send("La contraseña no coincide.")
    }
    res.send("El usuario no existe.")
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
    if (username == "" || username == " ") {
        res.send("El usuario no puede estar vacio.")
    }
    if (password == "" || password == " ") {
        res.send("La contraseña no puede estar vacia.")
    }
    localStorage.setItem("username",username)
    localStorage.setItem("password",password)

    res.redirect("/login");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})