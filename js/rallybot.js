//The RallyBot Class
class RallyBot {
  #maxCurrentSpeed=0;
  #coords=Vector(0,0);
  constructor(name,energy,maxSpeed,frame,moduleSlot,armLeftModule,armRightModule,legLeftModule,legRightModule,backModule) {
    this.name=name;
    this.energy=energy;
    this.maxSpeed=maxSpeed;
    this.#maxCurrentSpeed=maxSpeed;
    this.frame=frame;
    this.moduleSlot=moduleSlot;
    this.armLeftModule=armLeftModule;
    this.armRightModule=armRightModule;
    this.legLeftModule=legLeftModule;
    this.legRightModule=legRightModule;
    this.backModule=backModule;
    this.frame.connectModules(this.armLeftModule,this.armRightModule,this.legLeftModule,this.legRightModule,this.backModule);
  }
  constructIn(el,coords){
    this.#coords=coords;
    el.innerHTML+=`
    <div id="${this.name}" class="rallybot" style="left:${this.#coords.x};bottom:${this.#coords.y};">
      ${this.frame.html}
    </div>
    `
  }
}
class Frame {
  #modules={lhm:undefined,rhm:undefined,llm:undefined,rlm:undefined,bm:undefined}
  #html=(modules)=>`${modules.lhm.html}${modules.rhm.html}${modules.llm.html}${modules.rlm.html}${modules.bm.html}`;
  constructor(name,html) {
    this.name=name;
    this.#html=html;
  }
  connectModules(lhm,rhm,llm,rlm,bm){
    this.#modules.lhm=lhm;
    this.#modules.rhm=rhm;
    this.#modules.llm=llm;
    this.#modules.rlm=rlm;
    this.#modules.bm=bm;
  }
  get html(){
    return this.#html(this.#modules);
  }
}
class ModuleSlot {
  //This is a 2 Dimensional Array
  #chanells=[];
  #module;
  constructor(chanells,strength) {
    this.#chanells=chanells;
    this.strength=strength;
  }
  connectModule(module){
    //If Strength is 5 and weight is 10 then this won't work
    if (this.strength > module.weight) {
      this.#module=module;
    }
  }
}


class Module 
{
  constructor(name, needingEnergy, works, weight)
  {
    this.name = name;
    this.needingEnergy = needingEnergy;
    this.works = works;
    this.weight = weight;
  }
  
  process(idx, ...args)
  {
    this.works[idx](...args);
  }
}
