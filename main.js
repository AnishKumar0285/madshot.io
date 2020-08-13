var movement_speed = 8.65;
const ballmovementlength = 2000;
const ballmovementspeed = 10;



var keys = {};

const platpos = [[0,729,1366],[635,608,235],[96,190,488],[751,130,229],[1021,256,348],[1000,501,329],[198,556,286]];

const app = new PIXI.Application({
  width: 800,
  height:400,
  backgroundColor: 0x0096b1
});

PIXI.Texture.scaleMode = PIXI.SCALE_MODES.NEAREST;

const graphics = new PIXI.Graphics();

var bodysvg = {
    data: '<svg width="36" height="58" viewBox="0 0 46 73" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="46" height="73" rx="0" fill="#182226"/></svg>',
    getsvgdata: function(){
      return this.data;
    },
    setscale: function(w,h){
      startindex = this.data.indexOf("width");
      lastindex = this.data.indexOf("\"", startindex+7);
      this.data = this.data.slice(0,startindex) + "width=\"" + w + this.data.slice(lastindex, this.data.length);
      startindex1 = this.data.indexOf("height");
      lastindex1 = this.data.indexOf("\"", startindex1+8);
      this.data = this.data.slice(0,startindex1) + "height=\"" + h +  this.data.slice(lastindex1, this.data.length);
    }
};
var body;

var eyesvg = {
  data: '<svg width="32" height="12" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="12" fill="#F9B887"/><rect x="5" y="3" width="6" height="6" fill="#182226"/><rect x="21" y="3" width="6" height="6" fill="#182226"/></svg>',
  getsvgdata: function(){
    return this.data;
  },
  setscale: function(w,h){
    startindex = this.data.indexOf("width");
    lastindex = this.data.indexOf("\"", startindex+7);
    this.data = this.data.slice(0,startindex) + "width=\"" + w + this.data.slice(lastindex, this.data.length);
    startindex1 = this.data.indexOf("height");
    lastindex1 = this.data.indexOf("\"", startindex1+8);
    this.data = this.data.slice(0,startindex1) + "height=\"" + h +  this.data.slice(lastindex1, this.data.length);
  }
};
var eyearea;

var shootersvg = {
  data: '<svg width="18" height="6" viewBox="0 0 18 6" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="6" rx="0" fill="#FD3323"/></svg>',
  getsvgdata: function(){
    return this.data;
  },
  setscale: function(w,h){
    startindex = this.data.indexOf("width");
    lastindex = this.data.indexOf("\"", startindex+7);
    this.data = this.data.slice(0,startindex) + "width=\"" + w + this.data.slice(lastindex, this.data.length);
    startindex1 = this.data.indexOf("height");
    lastindex1 = this.data.indexOf("\"", startindex1+8);
    this.data = this.data.slice(0,startindex1) + "height=\"" + h +  this.data.slice(lastindex1, this.data.length);
  }
};
var shooter;

var crosshairsvg = {
  data: '<svg width="10" height="10" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="9.5" y1="19" x2="9.5" stroke="#FD3323" stroke-width="3"/><line y1="9.5" x2="19" y2="9.5" stroke="#FD3323" stroke-width="3"/><rect x="1.5" y="1.5" width="16" height="16" stroke="#182226" stroke-width="3"/></svg>',
  getsvgdata: function(){
    return this.data;
  },
  setscale: function(w,h){
    startindex = this.data.indexOf("width");
    lastindex = this.data.indexOf("\"", startindex+7);
    this.data = this.data.slice(0,startindex) + "width=\"" + w + this.data.slice(lastindex, this.data.length);
    startindex1 = this.data.indexOf("height");
    lastindex1 = this.data.indexOf("\"", startindex1+8);
    this.data = this.data.slice(0,startindex1) + "height=\"" + h +  this.data.slice(lastindex1, this.data.length);
  }
};
var crosshair;

var bulletsvg = {
  data: '<svg width="10" height="10" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="6" height="6" rx="0" fill="#FD3323" stroke-width="1" stroke="#182226" /></svg>',
  getsvgdata: function(){
    return this.data;
  },
  setscale: function(w,h){
    startindex = this.data.indexOf("width");
    lastindex = this.data.indexOf("\"", startindex+7);
    this.data = this.data.slice(0,startindex) + "width=\"" + w + this.data.slice(lastindex, this.data.length);
    startindex1 = this.data.indexOf("height");
    lastindex1 = this.data.indexOf("\"", startindex1+8);
    this.data = this.data.slice(0,startindex1) + "height=\"" + h +  this.data.slice(lastindex1, this.data.length);
  }
};

// relative calculator
var relcalc = {
  abswidth : 1366,
  absheight :768,
  getrelwidth : function(w){
    return app.view.width * (w/this.abswidth);
  },
  getrelheight : function(h){
    return app.view.height * (h/this.absheight);
  }
};

const onload = function(){
  document.body.appendChild(app.view);
  contentrender();
  app.stage.interactive = "true";
  document.body.addEventListener("keydown", onkeydown);
  document.body.addEventListener("keyup", onkeyup);
  document.body.addEventListener("mousedown", onpress);
  document.body.addEventListener("mousemove", onmove);
  document.body.style.backgroundColor = "#182226";
  app.view.style.cursor = "none";
  app.ticker.add(gameloop);
}

const onresize = function(){
  contentrender();
}

const contentrender = function(){
  app.stage.removeChildren();

  document.body.style.overflow = "hidden";

  current_ratio = window.innerWidth/window.innerHeight;

  if(current_ratio>= 16/9){
    app.view.height = window.innerHeight;
    app.view.width = app.view.height * (16/9);
  }
  else{
    app.view.width = window.innerWidth;
    app.view.height = app.view.width/(16/9);
  }

  app.view.style.marginTop = (window.innerHeight - app.view.height)/2;
  app.view.style.marginLeft = (window.innerWidth - app.view.width)/2;

  graphicshieght = app.view.height *(40/768);
  graphics.clear();

  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(0, relcalc.getrelheight(729), app.view.width, graphicshieght);
  graphics.drawRect(relcalc.getrelwidth(198), relcalc.getrelheight(556), relcalc.getrelwidth(286), relcalc.getrelheight(40));
  graphics.drawRect(relcalc.getrelwidth(635), relcalc.getrelheight(608), relcalc.getrelwidth(235), relcalc.getrelheight(40));
  graphics.drawRect(relcalc.getrelwidth(96), relcalc.getrelheight(190), relcalc.getrelwidth(488), relcalc.getrelheight(40));
  graphics.drawRect(relcalc.getrelwidth(751), relcalc.getrelheight(130), relcalc.getrelwidth(229), relcalc.getrelheight(40));
  graphics.drawRect(relcalc.getrelwidth(1021), relcalc.getrelheight(256), relcalc.getrelwidth(348), relcalc.getrelheight(40));
  graphics.drawRect(relcalc.getrelwidth(1000), relcalc.getrelheight(501), relcalc.getrelwidth(329), relcalc.getrelheight(40));
  graphics.endFill();

  graphics.beginFill(0x000000);
  graphics.drawRect(relcalc.getrelwidth(123), relcalc.getrelheight(170), relcalc.getrelwidth(30), relcalc.getrelheight(570));
  graphics.drawRect(relcalc.getrelwidth(208), relcalc.getrelheight(170), relcalc.getrelwidth(30), relcalc.getrelheight(570));
  for(var y = 179; y < 740; y+=51){
    graphics.drawRect(relcalc.getrelwidth(123), relcalc.getrelheight(y), relcalc.getrelwidth(115), relcalc.getrelheight(30));
  }

  graphics.drawRect(relcalc.getrelwidth(1150), relcalc.getrelheight(230), relcalc.getrelwidth(30), relcalc.getrelheight(274));
  graphics.drawRect(relcalc.getrelwidth(1235), relcalc.getrelheight(230), relcalc.getrelwidth(30), relcalc.getrelheight(274));
  for(var y = 250; y < 500; y+=51){
    graphics.drawRect(relcalc.getrelwidth(1150), relcalc.getrelheight(y), relcalc.getrelwidth(115), relcalc.getrelheight(30));
  }
  graphics.endFill();

  bodysvg.setscale(app.view.width * (36/1366), app.view.height * (58/768));
  const _body = new PIXI.Texture.from(bodysvg.getsvgdata());
  body = new PIXI.Sprite(_body);
  body.anchor.x = 0.5;
  body.anchor.y = 0.5;
  body.x = app.renderer.width/2;
  body.y = app.renderer.height/2;

  eyesvg.setscale(app.view.width * (32/1366), app.view.height * (12/768));
  const _eyearea = new PIXI.Texture.from(eyesvg.getsvgdata());
  eyearea = new PIXI.Sprite(_eyearea);
  eyearea.anchor.x = 0.5;
  eyearea.anchor.y = 0.5;
  

  shootersvg.setscale(app.view.width * (15/1366), app.view.height * (6/768));
  const _shooter = new PIXI.Texture.from(shootersvg.getsvgdata());
  shooter = new PIXI.Sprite(_shooter);
  shooter.anchor.x = 0;
  shooter.anchor.y = 0.5;

  crosshairsvg.setscale(relcalc.getrelwidth(20), relcalc.getrelheight(20));
  const _crosshair = new PIXI.Texture.from(crosshairsvg.getsvgdata());
  crosshair = new PIXI.Sprite(_crosshair);
  crosshair.anchor.x = 0.5;
  crosshair.anchor.y = 0.5;

  movealong();

  app.stage.addChild(graphics);
  app.stage.addChild(body);
  app.stage.addChild(eyearea);
  app.stage.addChild(shooter);
  app.stage.addChild(crosshair);
}



const onkeydown = function(event){
  keys[event.keyCode] = true;
}

const onkeyup = function(event){
  keys[event.keyCode] = false;
}

const onpress = function(){
  shoot(shooter.rotation, {
    x: shooter.position.x+Math.cos(shooter.rotation)*20,
    y: shooter.position.y+Math.sin(shooter.rotation)*20
  });
}

var bullets = [];  

function shoot(rotation, startPosition){  

var bullet;
  bulletsvg.setscale(relcalc.getrelwidth(10), relcalc.getrelheight(10));
  const _bullet = new PIXI.Texture.from(bulletsvg.getsvgdata());
  bullet = new PIXI.Sprite(_bullet);
  bullet.anchor.x = 0.5;
  bullet.anchor.y = 0.5;
  bullet.position.x = shooter.x;
  bullet.position.y = shooter.y;
  bullet.rotation = rotation;
  shooter.x -= relcalc.getrelwidth(5*Math.cos(rotation));
  shooter.y -= relcalc.getrelheight(5*Math.sin(rotation));
  var oncedone = false;
  app.stage.addChild(bullet);
  app.ticker.add(function(){
    bullet.position.x += relcalc.getrelwidth(Math.cos(bullet.rotation)*ballmovementspeed);
    bullet.position.y += relcalc.getrelheight(Math.sin(bullet.rotation)*ballmovementspeed);
    if(Math.sqrt(Math.pow(shooter.x - bullet.position.x, 2) + Math.pow(shooter.y - bullet.position.y, 2)) >= 50 && oncedone == false){
      shooter.x += relcalc.getrelwidth(5*Math.cos(rotation));
      shooter.y += relcalc.getrelheight(5*Math.sin(rotation));
      oncedone = true;
    }
    if(Math.sqrt(Math.pow(shooter.x - bullet.position.x, 2) + Math.pow(shooter.y - bullet.position.y, 2)) >= ballmovementlength){
      app.stage.removeChild(bullet);
    }
  });
}


const onmove = function(event){
  crosshair.position.x = event.offsetX;
  crosshair.position.y = event.offsetY;
  shooter.rotation = rotateToPoint(event.offsetX, event.offsetY, shooter.position.x, shooter.position.y);
}

function rotateToPoint(mx, my, px, py){  
  var self = this;
  var dist_Y = my - py;
  var dist_X = mx - px;
  var angle = Math.atan2(dist_Y,dist_X);
  return angle;
}

var vel = 0;
var acc = 0.25;

const gameloop = function(){
  var onsurface = false;
  var onladder = false;
  var tow = true;
  for(var i = 0; i< platpos.length; ++i){
    if(body.y + relcalc.getrelheight(29)  == relcalc.getrelheight(platpos[i][1]) && (body.x + relcalc.getrelwidth(18)) >= relcalc.getrelwidth(platpos[i][0]) && ((body.x - relcalc.getrelwidth(18))<= relcalc.getrelwidth(platpos[i][0] + platpos[i][2]))){
      onsurface = true;
      vel = 0;
      break;
    }
    else{
      onsurface = false;
    }
  }

  if((body.x >= relcalc.getrelwidth(123) && body.y + relcalc.getrelheight(29) >= relcalc.getrelheight(170) && body.x <= relcalc.getrelwidth(123+115) && body.y + relcalc.getrelheight(29)<= relcalc.getrelheight(170+500)) || (body.x >= relcalc.getrelwidth(1150) && body.y + relcalc.getrelheight(29) >= relcalc.getrelheight(230) && body.x <= relcalc.getrelwidth(1150+115) && body.y + relcalc.getrelheight(29)<= relcalc.getrelheight(230+150)))
  {
    onladder = true;
  }
  if(onsurface == false && onladder == false){
    var toadd = true;
    vel += acc;
    currentypos = body.y + relcalc.getrelheight(29);
    nextypos = currentypos + relcalc.getrelheight(vel);
    for(var i = 0; i< platpos.length; ++i){
      if(relcalc.getrelheight(platpos[i][1])>=currentypos && relcalc.getrelheight(platpos[i][1]) <= nextypos && (body.x + relcalc.getrelwidth(18)) >= relcalc.getrelwidth(platpos[i][0]) && ((body.x - relcalc.getrelwidth(18))<= relcalc.getrelwidth(platpos[i][0] + platpos[i][2]))){
        toadd = false;
        tow = false;
        body.y = relcalc.getrelheight(platpos[i][1])- relcalc.getrelheight(29);
        movealong();
        break;
      }
      else{
        toadd = true;
      }
    }
    if(toadd == true){
      body.y += relcalc.getrelheight(vel);
      movealong();
    }
  }

  movement_speed_y = relcalc.getrelheight(8);
  movement_speed_x = relcalc.getrelwidth(7.65);

    if((keys["87"] || keys["38"] || keys["32"]) && tow){
      eyearea.y -= movement_speed_y;
      body.y -= movement_speed_y;
      shooter.y -= movement_speed_y;
    }
    if(keys["83"] || keys["40"]){
      if(!(onsurface) && ((body.y + relcalc.getrelheight(29)) + movement_speed_y <= (app.view.height - relcalc.getrelheight(40)))){
      eyearea.y += movement_speed_y;
      body.y += movement_speed_y;
      shooter.y += movement_speed_y;
      }
      else if(onsurface && onladder){
        eyearea.y += movement_speed_y;
      body.y += movement_speed_y;
      shooter.y += movement_speed_y;
      }
    }
    if(keys["68"] || keys["39"]){
      if(body.x + relcalc.getrelwidth(18) <= app.view.width){
      eyearea.x += movement_speed_x;
      body.x += movement_speed_x;
      shooter.x += movement_speed_x;
      }
    }
    if(keys["65"] || keys["37"]){
      if(body.x-relcalc.getrelwidth(18) >= 0){
      eyearea.x -= movement_speed_x;
      body.x -= movement_speed_x;
      shooter.x -= movement_speed_x;
      }
    }
}

const movealong = function(){
  eyearea.x = body.x;
  eyearea.y = body.y - app.view.height * 17/768;

  shooter.x = body.x;
  shooter.y = body.y + app.view.height * 12/768;
}