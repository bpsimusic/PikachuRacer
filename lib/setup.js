
class Setup {
  constructor(){
    let win = 0;
    let paused = false;
    let song = document.getElementById("theme-song");
    //render the background image
    document.addEventListener("DOMContentLoaded", function(){
      let mute = document.createElement("div");
      mute.className = "fa fa-volume-up";
      mute.addEventListener("click", function(){
        song.muted = !song.muted;
        mute.className == "fa fa-volume-up" ? mute.className = "fa fa-volume-off" : mute.className = "fa fa-volume-up"
      });
      document.getElementById("instructions").appendChild(mute);
      let line0 = document.createElement("div");
      line0.className = "flex";
      line0.id = "click-to-play";
      let clearMessage = document.createElement("p");
      clearMessage.innerHTML = "Click to Play";
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
      let avoid = document.createElement("span");
      avoid.innerHTML = "Avoid";
      avoid.id = "avoid-message";
      outerDiv2.appendChild(avoid);
      outerDiv2.appendChild(clearImagePokeball);
      line2.appendChild(outerDiv2);
      document.getElementById("clear").appendChild(line2);
      
    });
  }
}

export default Setup;
