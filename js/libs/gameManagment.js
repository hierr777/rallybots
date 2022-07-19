class Loop {
  constructor(name,loop,onstart,onend,onpause){
    this.name=name;
    this.loop=loop;
    this.onstart=onstart;
    this.onend=onend;
    this.onpause=onpause;
    this.paused=false;
  }
  start(orientedTPS){
    this.onstart();
    this.intrvl=setInterval(()=>{
      if (!this.paused) {
        console.log("tick");
        this.loop();
      }
    }, 1000/orientedTPS);
  }
  end(){
    this.onend()
    clearInterval(this.intrvl);
  }
  pause(){
    this.onpaused();
    this.paused=!this.paused;
  }
}
