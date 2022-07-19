class RallyBot {
  constructor(name,powerbank,motor,frame,moduleSlot,armLeft,armRight,legLeft,legRight,head) {
    this.name=name;
    this.powerbank=powerbank;
    this.motor=motor;
    this.frame=frame;
    this.moduleSlot=moduleSlot;
    this.armLeft=armLeft;
    this.armRight=armRight;
    this.legLeft=armLeft;
    this.legRight=armRight;
    this.head=head;
  }
}
class PowerBank {
  constructor(maxCharge) {
    this.maxCharge=maxCharge;
    this.charge=maxCharge;
  }
  charge(item){
    item.charge+=item.needingCharge<=this.charge ? item.needingCharge : item.needingCharge-this.charge;
    this.charge-=item.needingCharge<=this.charge ? item.needingCharge : item.needingCharge-this.charge;
  }
}
