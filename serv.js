const express = require("express");
const app = express();
const socket = require("socket.io");

app.use(express.static(__dirname + "/views"));
app.get("/", (req, res) => {
  res.sendFile("views/html.html", { root: __dirname });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("your serveur is working");
});
var sio = socket(server);
var tr
tab = [];
var player=0
function xxx() {
    if (player == 0) {
      player = 1;
      return "<p>x</p>";
    } else {
      player = 0;
      return "<p>o</p>";
    }
  }

sio.on("connection", (visitor) => {
  console.log("theren is a visitor", visitor.id);
  tab.push(visitor.id);
  console.log(tab);
tr=tab[0]
  visitor.on("new", function (data) {
    if (visitor.id==tr){
    sio.sockets.emit("new1", data);
    if(visitor.id==tab[1]){    tr=tab[0]
    }else{    tr=tab[1]
    }
}


  });

  visitor.on("replay-test", function (data1) {
    sio.sockets.emit("replay-test2", data1 + 1);
  });

  //sio.sockets.to(tab[0]).emit('mes',xxx())

});



