const HittableObjects=[];
class HittableObject {
  constructor(health,armor) {
    this.health=health;
    this.armor=armor;
    HittableObjects[HittableObjects.length]=this;
  }
}
class Hitter {
  constructor(hit,range) {
    this.hit=hit;
    this.range=range;
  }
  attack(coords) {
    HittableObjects.forEach(target => {
      if(rectangleCollision2D(coords,Vector(this.range*2,this.range),target.coords)) {
        target.health -= (this.hit -= target.armor/2);
        target.armor -= this.hit;
      }
    });
  }
}
