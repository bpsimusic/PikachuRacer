import Game from "./game.js";
import GameView from "./game_view.js";


document.addEventListener("DOMContentLoaded", function(){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let scrollImg = new Image();
    let scrollVal = 0;
    let speed =0.08;

    scrollImg.src = "assets/pokemon.jpg";
    scrollImg.onload = renderImage;

    function renderImage(){
      //if you change scrollVal >=, you must change the ctx.drawImage.
        if(scrollVal >= 600){
            return;
        }
        scrollVal+=speed;
        ctx.drawImage(scrollImg, scrollVal, 0, 640, 854, 0,0,canvas.width, canvas.height);
        setTimeout(function(){renderImage();},10);
      }

   const game = new Game();
   new GameView(game, ctx).start();
});
