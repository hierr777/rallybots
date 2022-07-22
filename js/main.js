var testRallyBot=new RallyBot('prototype',1000,100,baseFrame,new ModuleSlot([{name:"main",inCount:1}],10,10));
testRallyBot.constructIn(body,Vector(100,100));
var gameloop=new Loop("gameloop",()=>{
  if (testRallyBot.coords.y>0) {
    testRallyBot.move(Vector(0,-10),cp=>false);
  }
});
gameloop.start(120);
