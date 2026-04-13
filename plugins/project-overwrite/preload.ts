type GandiState = {
  props: any;
  props_: any;
};

const propsDefine = {
  get(this: GandiState){
    return this.props_;
  },
  set(this: GandiState, v: any){
    this.props_ = v;
    if(v && "ccwCDNHost" in v){
      console.log(this);
    }
  }
}

Object.defineProperty(Object.prototype, "props", propsDefine)