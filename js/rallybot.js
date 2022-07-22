//The RallyBot Class
class RallyBot {
  #maxCurrentSpeed=0;
  #coords=Vector(0,0);
  constructor(name,energy,maxSpeed,frame,moduleSlot) {
    this.name=name;
    this.energy=energy;
    this.maxSpeed=maxSpeed;
    this.#maxCurrentSpeed=maxSpeed;
    this.frame=frame;
  }
  constructIn(el,coords){
    this.#coords=coords;
    el.innerHTML+=`
    <div id="${this.name}" class="rallybotPoser" style="left:${this.#coords.x}px;bottom:${this.#coords.y}px;">
      ${this.frame.html}
    </div>
    `
  }
  connectModules(armLeftModule,armRightModule,legLeftModule,legRightModule,backModule){
    this.armLeftModule=armLeftModule;
    this.armRightModule=armRightModule;
    this.legLeftModule=legLeftModule;
    this.legRightModule=legRightModule;
    this.backModule=backModule;
    this.frame.connectModules(this.armLeftModule,this.armRightModule,this.legLeftModule,this.legRightModule,this.backModule);
  }
  move(direction, map)
  {
    console.log(this.#coords);
    this.#coords=this.#coords.sum(direction);
    console.log(this.#coords);
    if(map(this.#coords))
    {
      this.#coords=this.#coords.sum(direction.negative);
    }
    console.log(this.#coords);
    getElement(`#${this.name}`).style.left=this.#coords.x+"px";
    getElement(`#${this.name}`).style.bottom=this.#coords.y+"px";
  }
  get coords(){
    return this.#coords
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
  //This is a 1 Dimensional Array, every channel is object in format:{name,inCount}
  #channels=[];
  #module;
  constructor(channels,strength,maxTransportableEnergy) {
    this.#channels=channels;
    this.strength=strength;
    this.maxTransportableEnergy=maxTransportableEnergy;
  }
  connectModule(module){
    //If Strength is 5 and weight is 10 then this won't work
    //if needing energy larger than can be gived this won`t work
    if (this.strength>=module.weight&&this.maxTransportableEnergy>=module.needingEnergy) {
      this.#module=module;
    }else {
      alert('wtf u doing, DONT DO THIS!!!!! THIS DONT WORK!!!!!!!!!!');
    }
  }
  useModule(callName,...args){
    let currChannel=this.#channels.findIndex(c=>c.name===callName);
    if (this.#channels[currChannel].inCount>=args.length) {
      this.#module.do(currChannel,...args);
    }else {
      alert("too many args");
    }
  }
}
class Module
{
  constructor(name, needingEnergy, works, weight,html)
  {
    this.name = name;
    this.needingEnergy = needingEnergy;
    this.works = works;
    this.weight = weight;
    this.html=html;
  }
  do(idx, ...args)
  {
    this.works[idx](...args);
  }
}
var baseFrameHtml=(modules)=>`
<div class="rallybot">
  <div class="scene">
    <div class="shape cuboid-1 body1">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="cr cr-0">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-1">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-2">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-3">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
    </div>
    <div class="shape cylinder-1 armLeft2">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cylinder-2 armRight2">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cylinder-3 armLeft1">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cylinder-4 armRight1">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cylinder-5 armLeft3">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cylinder-6 armRight3">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cuboid-2 body3">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="cr cr-0">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-1">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-2">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-3">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
    </div>
    <div class="shape cylinder-7 body2">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cylinder-8 leftLeg2">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cylinder-9 rightLeg2">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cylinder-10 leftLeg1">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cylinder-11 rightLeg1">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cylinder-12 neck">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cuboid-3 head2">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="cr cr-0">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-1">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-2">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-3">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
    </div>
    <div class="shape cuboid-4 head1">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="cr cr-0">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-1">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-2">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-3">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
    </div>
    <div class="shape cylinder-13 rightLeg3">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cylinder-14 leftLeg3">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cuboid-5 leftLeg4">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="cr cr-0">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-1">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-2">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-3">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
    </div>
    <div class="shape cuboid-6 rightLeg4">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="cr cr-0">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-1">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-2">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-3">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
    </div>
    <div class="shape cylinder-15 armLeft4">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cylinder-16 armRight4">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    </div>
    <div class="shape cuboid-7 armLeftSlot1">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
    </div>
    <div class="shape cuboid-8 armLeftSlot2">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
    </div>
    <div class="shape cuboid-9 armRightSlot2">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
    </div>
    <div class="shape cuboid-10 armRightSlot1">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
    </div>
  </div>
</div>
`;
/*<div class="rallybot">
  <div class="scene">
    <div class="shape cuboid-1 body1">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="cr cr-0">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-1">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-2">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-3">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="shape cylinder-7 body2">
        <div class="face bm"></div>
        <div class="face tp"></div>
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
        <div class="face side s3"></div>
        <div class="face side s4"></div>
        <div class="face side s5"></div>
        <div class="face side s6"></div>
        <div class="face side s7"></div>
        <div class="face side s8"></div>
        <div class="face side s9"></div>
        <div class="face side s10"></div>
        <div class="face side s11"></div>
        <div class="face side s12"></div>
        <div class="face side s13"></div>
        <div class="shape cuboid-2 body3">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="cr cr-0">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-1">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-2">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-3">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
    </div>
      </div>
      <div class="shape cylinder-12 neck">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
      <div class="shape cuboid-3 head2">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="cr cr-0">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-1">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-2">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-3">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="shape cuboid-4 head1">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="cr cr-0">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-1">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-2">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-3">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
    </div>
    </div>
    </div>
    </div>
    <div class="shape cylinder-3 armLeft1">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
      <div class="shape cylinder-1 armLeft2">
        <div class="face bm"></div>
        <div class="face tp"></div>
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
        <div class="face side s3"></div>
        <div class="face side s4"></div>
        <div class="face side s5"></div>
        <div class="face side s6"></div>
        <div class="face side s7"></div>
        <div class="face side s8"></div>
        <div class="face side s9"></div>
        <div class="face side s10"></div>
        <div class="face side s11"></div>
        <div class="face side s12"></div>
        <div class="face side s13"></div>
        <div class="shape cylinder-5 armLeft3">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
      <div class="shape cylinder-15 armLeft4">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
      <div class="shape cuboid-7 armLeftSlot1">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
    </div>
    <div class="shape cuboid-8 armLeftSlot2">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
    </div>
    </div>
    </div>
      </div>
    </div>
    <div class="shape cylinder-4 armRight1">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    <div class="shape cylinder-2 armRight2">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
    <div class="shape cylinder-6 armRight3">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
      <div class="shape cylinder-16 armRight4">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
      <div class="shape cuboid-9 armRightSlot2">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
    </div>
    <div class="shape cuboid-10 armRightSlot1">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
    </div>
    </div>
    </div>

    </div>
    </div>
    <div class="shape cylinder-10 leftLeg1">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
      <div class="shape cylinder-8 leftLeg2">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>

    <div class="shape cylinder-14 leftLeg3">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
      <div class="shape cuboid-5 leftLeg4">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="cr cr-0">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-1">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-2">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-3">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
    </div>
    </div>
    </div>
    </div>
    <div class="shape cylinder-11 rightLeg1">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
      <div class="shape cylinder-9 rightLeg2">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
      <div class="shape cylinder-13 rightLeg3">
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="face side s0"></div>
      <div class="face side s1"></div>
      <div class="face side s2"></div>
      <div class="face side s3"></div>
      <div class="face side s4"></div>
      <div class="face side s5"></div>
      <div class="face side s6"></div>
      <div class="face side s7"></div>
      <div class="face side s8"></div>
      <div class="face side s9"></div>
      <div class="face side s10"></div>
      <div class="face side s11"></div>
      <div class="face side s12"></div>
      <div class="face side s13"></div>
      <div class="shape cuboid-6 rightLeg4">
      <div class="face ft"></div>
      <div class="face bk"></div>
      <div class="face rt"></div>
      <div class="face lt"></div>
      <div class="face bm"></div>
      <div class="face tp"></div>
      <div class="cr cr-0">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-1">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-2">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
      <div class="cr cr-3">
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
      </div>
    </div>
    </div>
    </div>
    </div>
  </div>
</div>*/
var baseFrame=new Frame('base',baseFrameHtml)
