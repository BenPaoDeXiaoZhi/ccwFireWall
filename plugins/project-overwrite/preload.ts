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
    if("assetHost" in v){
      console.log(this, v);
    }
  }
}

Object.defineProperty(Object.prototype, "props", propsDefine)