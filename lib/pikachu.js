import Game from "./game.js";
import GameView from "./game_view.js";


document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  const c = canvas.getContext('2d');


 const ctx = canvas.getContext("2d");
 var background = new Image();
 background.src = "assets/pokemon.jpg";
 background.onload = function() {
    // ctx.drawImage(background, 100, 100);
    ctx.drawImage(background, 0, 0, 500, 854, 0, 0, 500, 333);
};

// function loadImage(){
//     imgWidth = scrollImg.width,
//     imgHeight = scrollImg.height;
//     canvasTemp.width = imgWidth;
//     canvasTemp.height =  imgHeight;
//     render();
// }
//
// function render(){
//     ctx.clearRect(0,0,canvasWidth,canvasHeight);
//
//     if(scrollVal >= canvasWidth){
//         scrollVal = 0;
//     }
//
//     scrollVal+=speed;
//     ctx.drawImage(scrollImg,canvasWidth-scrollVal,0,scrollVal,imgHeight, 0, 0, scrollVal,imgHeight);
//     ctx.drawImage(scrollImg,scrollVal,0,imgWidth, imgHeight);
//
//      // To go the other way instead
//      ctx.drawImage(scrollImg,-scrollVal,0,imgWidth, imgHeight);
//      ctx.drawImage(scrollImg,canvasWidth-scrollVal,0,imgWidth, imgHeight);
//
//     setTimeout(function(){render();},10);
// }


 const game = new Game();
 new GameView(game, ctx).start();
});


// <html>
// <body>
// <canvas width="800" height="600" id="canvas"></canvas>
// <script>
// var canvas = document.getElementById('canvas');
// var c = canvas.getContext('2d');
// c.fillStyle = "red";
// c.fillRect(100,100,400,300);
// </script>
// </body>
// </html>
