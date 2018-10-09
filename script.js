const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

var PointA;
var PointB;
var PointC;

var A_initVel = new Vector2(3,8);
var A_initAcc = new Vector2(0,0);
var A_Force = new Vector2(0,0);

var B_initVel = new Vector2(4,9);
var B_initAcc = new Vector2(0,0);
var B_Force = new Vector2(0,0);

var C_initVel = new Vector2(5,0);
var C_initAcc = new Vector2(0,0);
var C_Force = new Vector2(0,0);

function clamp(gameObject){
  if(gameObject.pos.dx < gameObject.point.r){
    gameObject.vel.dx = Math.abs(gameObject.vel.dx);
  }
  if(gameObject.pos.dx > 800-gameObject.point.r){
    gameObject.vel.dx = -Math.abs(gameObject.vel.dx);
  }
  if(gameObject.pos.dy < gameObject.point.r){
    gameObject.vel.dy = Math.abs(gameObject.vel.dy);
  }
  if(gameObject.pos.dy > 600-gameObject.point.r){
    gameObject.vel.dy = -Math.abs(gameObject.vel.dy);
  }
}

function Gravity(gameObject1, gameObject2, gameObject3, force1, force2, force3){
  gameObject1.acc = force1;
  gameObject2.acc = force2;
  gameObject3.acc = force3;
}

function UpdateForce(){
  var Delta_AB = new Vector2(0,0);
  Delta_AB.diffVector(PointA.pos,PointB.pos);
  var Delta_AC = new Vector2(0,0);
  Delta_AC.diffVector(PointA.pos,PointC.pos);

  var Delta_BA = new Vector2(0,0);
  Delta_BA.diffVector(PointB.pos,PointA.pos);
  var Delta_BC = new Vector2(0,0);
  Delta_BC.diffVector(PointB.pos,PointC.pos);

  var Delta_CA = new Vector2(0,0);
  Delta_CA.diffVector(PointC.pos,PointA.pos);
  var Delta_CB = new Vector2(0,0);
  Delta_CB.diffVector(PointC.pos,PointB.pos);

  A_Force = new Vector2(-(Delta_AB.dx+Delta_AC.dx)/100,-(Delta_AB.dy+Delta_AC.dy)/100);
  B_Force = new Vector2(-(Delta_BA.dx+Delta_BC.dx)/100,-(Delta_BA.dy+Delta_BC.dy)/100);
  C_Force = new Vector2(-(Delta_CA.dx+Delta_CB.dx)/100,-(Delta_CA.dy+Delta_CB.dy)/100);
}

function init(){
  let Random_X = Math.floor(Math.random()*800);
  let Random_Y = Math.floor(Math.random()*600);
  let Random_Vel = new Vector2(Math.floor(Math.random()*10),Math.floor(Math.random()*10));
  PointA = new GameObject(new Point(Random_X,Random_Y,10,"blue","A"),
                              new Vector2(Random_X,Random_Y),Random_Vel,
                              A_initAcc,1);

  Random_X = Math.floor(Math.random()*800);
  Random_Y = Math.floor(Math.random()*600);
  Random_Vel = new Vector2(Math.floor(Math.random()*10),Math.floor(Math.random()*10));
  PointB = new GameObject(new Point(Random_X,Random_Y,10,"red","B"),
                          new Vector2(Random_X,Random_Y),Random_Vel,
                          B_initAcc,1);

  Random_X = Math.floor(Math.random()*800);
  Random_Y = Math.floor(Math.random()*600);
  Random_Vel = new Vector2(Math.floor(Math.random()*10),Math.floor(Math.random()*10));
  PointC = new GameObject(new Point(Random_X,Random_Y,10,"green","C"),
                          new Vector2(Random_X,Random_Y),Random_Vel,
                          C_initAcc,1);

  animation();
}

function checkVelocity(max){
  if(PointA.vel.dx > max){
    PointA.vel.dx = max;
  }
  else if(PointA.vel.dx < -max){
    PointA.vel.dx = -max;
  }
  if(PointA.vel.dy > max){
    PointA.vel.dy = max;
  }
  else if(PointA.vel.dy < -max){
    PointA.vel.dy = -max;
  }

  if(PointB.vel.dx > max){
    PointB.vel.dx = max;
  }
  else if(PointB.vel.dx < -max){
    PointB.vel.dx = -max;
  }
  if(PointB.vel.dy > max){
    PointB.vel.dy = max;
  }
  else if(PointB.vel.dy < -max){
    PointB.vel.dy = -max;
  }

  if(PointC.vel.dx > max){
    PointC.vel.dx = max;
  }
  else if(PointC.vel.dx < -max){
    PointC.vel.dx = -max;
  }
  if(PointC.vel.dy > max){
    PointC.vel.dy = max;
  }
  else if(PointC.vel.dy < -max){
    PointC.vel.dy = -max;
  }
}

function animation(){
  requestAnimationFrame(animation);
  context.clearRect(0,0,800,600);
  PointA.update();
  PointB.update();
  PointC.update();
  UpdateForce();
  Gravity(PointA,PointB,PointC,A_Force,B_Force,C_Force);

  checkVelocity(25);

  clamp(PointA);
  clamp(PointB);
  clamp(PointC);
  PointA.draw(context);
  PointB.draw(context);
  PointC.draw(context);
}
init();
