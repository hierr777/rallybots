var testRallyBot=new RallyBot('prototype',1000,100,baseFrame,new ModuleSlot([{name:"main",inCount:1}],10,10),100,100,10,100);
testRallyBot.constructIn(body,Vector(100,100));
var gameloop=new Loop("gameloop",()=>{
    testRallyBot.gravitate(Vector(0,-10),(cp,dir)=>rectangleCollision2D(Vector(0,1),Vector(innerWidth+dir.x,1+(-dir.y)),cp));
});
gameloop.start(120);
