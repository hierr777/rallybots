var testRallyBot=new RallyBot('prototype',1000,100,baseFrame,new ModuleSlot([{name:"main",inCount:1}],10,10));
testRallyBot.constructIn(body,Vector(100,100));
testRallyBot.move(Vector(1,10),cp=>rectangleCollision2D(0,0,Vector(10000,10000),cp,0,Vector(0.5,0.5)));
