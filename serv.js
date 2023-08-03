const express=require('express')
const app=express()
const socket = require("socket.io");

app.use(express.static(__dirname + '/views'));
app.get('/',(req,res)=>{
    res.sendFile('views/html.html',{root:__dirname})})


const server= app.listen(process.env.PORT || 3000,() => {
    console.log('your serveur is working')
})
var sio = socket(server);












sio.on('connection',(visitor)=>{
    console.log("theren is a visitor", visitor.id);
    visitor.on("new", function (data) {
        sio.sockets.emit("new1", data);
        })






        visitor.on("replay-test", function (data1) {
            sio.sockets.emit("replay-test2", data1+1);
            })

})