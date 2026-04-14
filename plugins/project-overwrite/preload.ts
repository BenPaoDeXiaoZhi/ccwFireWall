import { config } from "#src/store";
type GandiState = {
  props: any;
  props_: any;
};

export type Fetcher = GandiState & {
  fetchProject(url: string, t: "FETCHING_WITH_ID"): void;
};
export type Loader = GandiState & {
  loadProject(): void;
};
export type Writer = GandiState & {
  storeProject(): void;
};
type ProjectStates = Fetcher | Loader | Writer;

let fetcher: Fetcher;
let loader: Loader;
let writer: Writer;

const propsDefine: PropertyDescriptor = {
  get(this: ProjectStates) {
    return this.props_;
  },
  set(this: ProjectStates, v: any) {
    Object.defineProperty(this, "props_", {
      value: v,
      enumerable: false,
      configurable: true,
    });
    if (this && "fetchProject" in this && !fetcher) {
      fetcher = this;
      console.log(this);
    }
    if (this && "loadProject" in this && !loader) {
      loader = this;
      console.log(this);
    }
    if (this && "storeProject" in this && !writer) {
      writer = this;
      console.log(this);
    }
  },
  enumerable: false,
};

Object.defineProperty(Object.prototype, "props", propsDefine);

export function getStates() {
  function check(
    resolve: (value: {
      fetcher: Fetcher;
      loader: Loader;
      writer: Writer;
    }) => void,
  ) {
    if (fetcher && loader && writer) {
      resolve({ fetcher, loader, writer });
    }
    requestAnimationFrame(() => {
      check(resolve);
    });
  }
  return new Promise(check);
}
