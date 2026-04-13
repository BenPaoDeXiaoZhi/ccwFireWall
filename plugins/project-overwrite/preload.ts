import { writable, get } from "svelte/store";

type GandiState = {
  props: any;
  props_: any;
};

type Fetcher{
  fetchProject(): void;
}
type Loader{
  loadProject(): void;
}

export const fetcher=writable<Fetcher>();
export const loader=writable<Loader>();

const propsDefine = {
  get(this: GandiState){
    return this.props_;
  },
  set(this: GandiState, v: any){
    this.props_ = v;
    if(this && this.fetchProject){
      fetcher.set(this);
      console.log(this);
    }
    if(this && this.loadProject){
      loader.set(this);
      console.log(this);
    }
    if(get(fetcher) && get(loader)){
      delete Object.prototype.props;
    }
  }
}

Object.defineProperty(Object.prototype, "props", propsDefine)