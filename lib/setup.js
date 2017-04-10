import {pikaNoises} from "./handleInput";

class Setup {
  constructor(){
    if (!localStorage.scores){
      let scores = [50, 40, 30, 20, 10];
      localStorage.setItem('scores', JSON.stringify(scores));
    }
    this.points = new Audio('assets/audio/points.mp3');
    this.points.volume = 0.05;
    this.pikalose = new Audio('assets/audio/pikalose.mp3');
    this.pikawin = new Audio('assets/audio/pikawin.mp3');
    pikaNoises.push(this.pikalose, this.pikawin, this.points);
    let song = document.getElementById("theme-song");
    song.volume = 0.33;
    let scrollVal = 0;
    let speed = 0.18;
    //disable up/down scrolling
    window.addEventListener("keydown", function(e){
      if([32,37,38,39,40].indexOf(e.keyCode) > -1){
        e.preventDefault();
      }
    });

    //render the background image
    document.addEventListener("DOMContentLoaded", function(){
      let mute = document.createElement("div");
      mute.className = "fa fa-volume-up";
      mute.addEventListener("click", function(){
        song.muted = !song.muted;
        pikaNoises.forEach(function(el){
          el.muted = !el.muted;
        });
        mute.className == "fa fa-volume-up" ? mute.className = "fa fa-volume-off" : mute.className = "fa fa-volume-up"
      });
      document.getElementById("instructions").appendChild(mute);
      let line0 = document.createElement("div");
      line0.className = "flex";
      line0.id = "click-to-play";
      let clearMessage = document.createElement("p");
      clearMessage.innerHTML = "Click to Play/Pause";
      line0.appendChild(clearMessage);
      document.getElementById("clear").appendChild(line0);
      let clearImageArrows = document.createElement("img");
      clearImageArrows.src = "assets/images/arrows.jpg";
      clearImageArrows.id = "arrows";
      let line1 = document.createElement("div");
      line1.className = "flex";
      line1.appendChild(clearImageArrows);
      let outerDiv = document.createElement("div");
      let move = document.createElement("span");
      move.innerHTML = "Move";
      move.id = "move-message";
      let clearImagePikachu = document.createElement("img");
      clearImagePikachu.src = "assets/images/pikachu.png";
      clearImagePikachu.id = "pikachu";
      outerDiv.id = "pikachuMove"
      outerDiv.appendChild(move);
      outerDiv.appendChild(clearImagePikachu);
      line1.appendChild(outerDiv);
      document.getElementById("clear").appendChild(line1);
      let line2 = document.createElement("div");
      line2.className = "flex";
      let outerDiv2 = document.createElement("div");
      let clearImagePokeball = document.createElement("img");
      clearImagePokeball.src = "assets/images/pokeball.png";
      clearImagePokeball.id = "pokeball";

      let clearImagePidgey = document.createElement("img");
      clearImagePidgey.src = "assets/images/pidgey.png";
      clearImagePidgey.id = "pidgey";


      let avoid = document.createElement("span");
      avoid.innerHTML = "Avoid";
      avoid.id = "avoid-message";
      outerDiv2.appendChild(avoid);
      outerDiv2.appendChild(clearImagePokeball);
      outerDiv2.appendChild(clearImagePidgey);
      outerDiv2.id = "avoidEnemy";
      line2.appendChild(outerDiv2);
      document.getElementById("clear").appendChild(line2);

      let line3 = document.createElement("div");
      line3.className = "flex";
      let outerDiv3 = document.createElement("div");
      outerDiv3.id = "berryCollect";
      let clearImageBerry = document.createElement("img");
      clearImageBerry.src = "assets/images/berry.png";
      clearImageBerry.id = "berry";

      let collect = document.createElement("span");
      collect.innerText = "Collect";
      collect.id = "collect-message";
      outerDiv3.appendChild(collect);
      outerDiv3.appendChild(clearImageBerry);
      line3.appendChild(outerDiv3);
      document.getElementById("clear").appendChild(line3);



      let line4 = document.createElement("div");
      line4.className = "flex";
      let outerDiv4 = document.createElement("div");
      let winInstructions = document.createElement("p");

      winInstructions.innerText = "Play until the end of song (1:00) to win!"
      winInstructions.id = "win-message";
      outerDiv4.appendChild(winInstructions);
      line4.appendChild(outerDiv4);
      document.getElementById("clear").appendChild(line4);

    });
  }
}

export default Setup;
