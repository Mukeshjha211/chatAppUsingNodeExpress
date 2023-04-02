const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const { url } = require('inspector');
app.use(bodyParser.urlencoded({extended:false}));



app.get('/', (req, res)=>{
    fs.readFile('username.txt' , (err,data)=>{
if(err){
    console.log(err);
    data = 'NO CHATS EXISTS'
}
res.send(`${data}<form action = "/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')"><input type="text" name= "message" id="message" placeholder="message"><input type= "hidden" name="username" id="username" placeholder="username"><button>Send</button></form>`)
    })
   

})

app.post("/",(req,res)=>{
    console.log('working2'),
    console.log(req.body.username),
    console.log(req.body.message),
    fs.writeFile("username.txt", `${req.body.username}: ${req.body.message}`, {flag:'a'},(err)=>{
        console.log(err); res.redirect("/")
    })

})

app.use('/login', (req,res)=>{
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="POST"><input id="username" type="text" placeholder = "username"><button type="submit">login</button></form>')
})

const server = http.createServer(app);
server.listen(4003);