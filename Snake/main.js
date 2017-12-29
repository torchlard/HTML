/* settings */
var wall_width=600; var wall_height=600;  var wall_thick=10;
var snake_size = 10;
var time_unit = 100;
var go_game, get_food;

var snake = {
  x: [30,40,50,60,70,80],
  y: [30,30,30,30,30,30],
  alive: true,
  direction: "right"
};
var food = {
  x: [],
  y: [],
  max: 3,
  rate: 4
};
var app = {
  score: 0
};

// var snake1 = new Snake([30,40],[30,30],true);

$(document).ready(function(){
  // prevent keyboard scroll
  var ar = new Array(33,34,35,36,37,38,39,40);
  $(document).keydown(function(e){
    var key = e.which;
    if($.inArray(key,ar)>-1){
      e.preventDefault();
      return false;
    }
    return true;
  });

  /* draw background */
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  c.setAttribute("width",wall_width+"px");
  c.setAttribute("height",wall_height+"px");

  ctx.beginPath();
  ctx.fillStyle = "#0F0";
  draw_snake();
  document.addEventListener("keydown", change_direction, false);

  /* Move snake */
  function move_snake(){
    var next_x, next_y;
    var len = snake.x.length;
    if (snake.direction == "left"){
      next_x = snake.x[len-1]-snake_size;
      next_y = snake.y[len-1];
      if (next_x >= 0 && not_collide(next_x,next_y)){
        next_step(next_x, next_y);
        return true;
      }
    } else if (snake.direction == "right"){
      next_x = snake.x[len-1]+snake_size;
      next_y = snake.y[len-1];
      if (next_x <= wall_width-wall_thick && not_collide(next_x,next_y)){
        next_step(next_x, next_y);
        return true;
      }
    } else if (snake.direction == "up"){
      next_x = snake.x[len-1];
      next_y = snake.y[len-1]-snake_size;
      if (next_y >= 0 && not_collide(next_x,next_y)){
        next_step(next_x, next_y);
        return true;
      }
    } else if (snake.direction == "down"){
      next_x = snake.x[len-1];
      next_y = snake.y[len-1]+snake_size;
      // console.log(next_x,next_y);
      // console.log(snake.x,snake.y);
      if (next_y <= wall_height-wall_thick && not_collide(next_x,next_y)){
        next_step(next_x, next_y);
        return true;
      }
    }
    end_game();
    return false;
  }

  /* detect collide with itself*/
  function not_collide(x,y){
    var len = snake.x.length;
    for (var i=0; i<len; i++){
      if(snake.x[i]==x && snake.y[i]==y){
        // console.log('over',x,y,snake.x,snake.y);
        return false; // exist
      }
    }
    return true;
  }

  /* move to next step*/
  function next_step(new_x,new_y){
    detect_food(new_x,new_y);
    snake.x.push(new_x);
    snake.y.push(new_y);
    ctx.fillStyle = "#0F0";
    ctx.fillRect(new_x,new_y,snake_size,snake_size);
    ctx.clearRect(snake.x[0],snake.y[0],snake_size,snake_size);
    snake.x.shift();
    snake.y.shift();
  }

  function draw_snake(){
    var length = snake.x.length;
    for(var i=0; i<length; i++){
      ctx.fillRect(snake.x[i], snake.y[i],snake_size,snake_size);
    }
  }

  function startGame(){
    go_game = setInterval(move_snake, time_unit);
    get_food = setInterval(create_food, food.rate*1000);
  }

  function change_direction(event){
    switch (event.keyCode) {
      case 37:
        if (snake.direction!="right"){
          snake.direction = "left";
        }
        break;
      case 38:
        if (snake.direction!="down"){
          snake.direction = "up";
        }
        break;
      case 39:
        if (snake.direction!="left"){
          snake.direction = "right";
          break;
        }
      case 40:
        if (snake.direction!="up"){
          snake.direction = "down";
          break;
        }
    }
  }

  /* main loop */
  function end_game(){
    snake.alive = false;
    clearInterval(go_game);
    clearInterval(get_food);
    // alert("Lose!");
    $("#result").text("Lose");
  }

  function create_food(){
    var new_x, new_y;
    while(food.x.length < food.max){
      new_x = parseInt(Math.random()*(wall_width-wall_thick)/10)*10;
      new_y = parseInt(Math.random()*(wall_height-wall_thick)/10)*10;
      // console.log(new_x,new_y);
      if (!not_collide(new_x,new_y)){
        continue;
      }
      food.x.push(new_x);
      food.y.push(new_y);
    }
    ctx.fillStyle = "#F00";
    for (var i=0; i<food.x.length; i++){
      ctx.fillRect(food.x[i],food.y[i],snake_size,snake_size);
    }
  }

  /* clear array and clear food if collide */
  function detect_food(x,y){
    for (var i=0; i<food.x.length; i++){
      if (food.x[i]==x && food.y[i]==y){
        food.x.splice(i,1);
        food.y.splice(i,1);
        ctx.clearRect(x,y,snake_size,snake_size);
        extend_snake();
      }
    }
  }

  /* extend snake by 1 after eating food */
  function extend_snake(){
    var len = food.x.length;
    // var x1 = food.x[len-1], x2 = food.x[len-2];
    // var y1 = food.y[len-1], y2 = food.y[len-2];
    var new_x = 2*food.x[len-1]-food.x[len-2];
    var new_y = 2*food.y[len-1]-food.y[len-2];
    ctx.fillRect(new_x,new_y,snake_size,snake_size);
    snake.x.push(new_x);
    snake.y.push(new_y);
    app.score += 1;
    $("#score").text(app.score);
    // console.log(snake.x,snake.y);
  };
  $("#start").click(function(){ startGame(); });


});



