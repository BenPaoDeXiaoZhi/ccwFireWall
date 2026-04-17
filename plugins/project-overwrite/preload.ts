import { config } from "#src/store";
import { get } from "svelte/store";
import { isInEditor } from "./Main.svelte";

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
  storeProject(url: string, project: string): Promise<any>;
  tryToAutoSave(): void;
};
type ProjectStates = Fetcher | Loader | Writer;

let fetcher: Fetcher;
let loader: Loader;
let writer: Writer;

const propsDefine: PropertyDescriptor = {
  set(this: ProjectStates, v: any) {
    Object.defineProperty(this, "props", {
      value: v,
      configurable: true,
      enumerable: true,
      writable: true,
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
  configurable: true,
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
      if ("props" in Object.prototype) {
        delete Object.prototype.props;
      }
    }
    requestAnimationFrame(() => {
      check(resolve);
    });
  }
  return new Promise(check);
}

let noAutoSave = true;
export function setNoAutoSave(v: boolean) {
  noAutoSave = v;
}

if (get(config)["overwrite.enable"] && isInEditor) {
  getStates().then(({ fetcher, loader, writer }) => {
    const { fetchProject } = fetcher;
    const { tryToAutoSave, storeProject } = writer;
    fetcher.fetchProject = function (url: string) {
      console.log(url);
      const newUrl = prompt(`作品想要加载${url}，将其替换为`, url) ?? url;
      fetchProject.call(this, newUrl, "FETCHING_WITH_ID");
    };

    writer.tryToAutoSave = function () {
      if (noAutoSave) {
        return;
      }
      tryToAutoSave.call(this);
    };

    writer.storeProject = function (url: string, project: string) {
      const { concat } = String.prototype;
      String.prototype.concat = function (...args: string[]) {
        console.log(this, args);
        const url = concat.call(this, ...args);
        if (url.startsWith(`${writer.props.ccwCDNHost}/user_projects_sb3`)) {
          String.prototype.concat = concat;
          return prompt(`作品想要保存至${url}，将其替换为`, url) ?? url;
        }
        return url;
      };
      return storeProject.call(this, url, project);
    };
  });
}
