var socket = io.connect("https://tik-tak.onrender.com/");
const container = document.querySelector(".cont");
const x = document.querySelectorAll("button");
const table = document.querySelector("table");
const turn_p = document.querySelector(".turn");
const replay = document.querySelector(".replay");
var signe;
var player = 0;
var j = 0;
var f = 0;
const score = document.querySelector(".score");
var test=0
var i=0
function xxx() {
  if (player == 0) {
    player = 1;
    turn_p.innerHTML = "it's your turn MR 'o'";
    return "<p>x</p>";
  } else {
    player = 0;
    turn_p.innerHTML = "it's your turn MR 'x'";
    return "<p>o</p>";
  }
}

container.addEventListener("click", (eo) => {
  if (f==0&&(
    eo.target == x[0] ||
    eo.target == x[1] ||
    eo.target == x[2] ||
    eo.target == x[3] ||
    eo.target == x[4] ||
    eo.target == x[5] ||
    eo.target == x[6] ||
    eo.target == x[7] ||
    eo.target == x[8]
  ) ){
    socket.emit("new", eo.target.id);
  }
});
socket.on("new1", (hh) => {
  x[hh - 1].innerHTML = xxx();

  if (
    f === 0 &&
    ((x[0].innerHTML != "" &&
      ((x[0].innerHTML === x[3].innerHTML &&
        x[0].innerHTML === x[6].innerHTML) ||
        (x[0].innerHTML === x[1].innerHTML &&
          x[0].innerHTML === x[2].innerHTML) ||
        (x[0].innerHTML === x[4].innerHTML &&
          x[0].innerHTML === x[8].innerHTML))) ||
      (x[2].innerHTML != "" &&
        ((x[2].innerHTML === x[5].innerHTML &&
          x[2].innerHTML === x[8].innerHTML) ||
          (x[2].innerHTML === x[4].innerHTML &&
            x[2].innerHTML === x[6].innerHTML))) ||
      (x[1].innerHTML != "" &&
        x[1].innerHTML === x[4].innerHTML &&
        x[1].innerHTML === x[7].innerHTML) ||
      (x[3].innerHTML != "" &&
        x[3].innerHTML === x[4].innerHTML &&
        x[3].innerHTML === x[5].innerHTML) ||
      (x[6].innerHTML != "" &&
        x[6].innerHTML === x[7].innerHTML &&
        x[7].innerHTML === x[8].innerHTML)
        )
  ) {
    turn_p.innerHTML = " we have winner";
    j = 1;
    f = 1;
    if (player == 1) {
      score.children[0].innerHTML = Number(score.children[0].innerHTML) + 1;
    } else {
      score.children[1].innerHTML = Number(score.children[1].innerHTML) + 1;
    }
  }

  if (
    x[0].innerHTML &&
    x[1].innerHTML &&
    x[2].innerHTML &&
    x[3].innerHTML &&
    x[4].innerHTML &&
    x[5].innerHTML &&
    x[6].innerHTML &&
    x[7].innerHTML &&
    x[8].innerHTML != ""
  ) {
    replay.style.display = "block";
  }

  if (j == 1) {
    if (player == 1) {
      turn_p.innerHTML += " <br> graduation MR x";
    } else {
      turn_p.innerHTML += " <br> graduation MR O";
    }
    replay.style.display = "block";
    j = 0;
  }

  replay.onclick = function () {
    x[0].innerHTML = "";
    x[1].innerHTML = "";
    x[2].innerHTML = "";
    x[3].innerHTML = "";
    x[4].innerHTML = "";
    x[5].innerHTML = "";
    x[6].innerHTML = "";
    x[7].innerHTML = "";
    x[8].innerHTML = "";
    f = 0;
    j = 0;
    replay.style.display = "none";
  
    socket.emit("replay-test", test);
  };
});
socket.on("replay-test2", (data) => {
i +=1
if(i==1){
  turn_p.innerHTML="waiting for the player ..."
f=1
}
if(i==2){
  turn_p.innerHTML="it's your turn mr X"
f=0
}
})
