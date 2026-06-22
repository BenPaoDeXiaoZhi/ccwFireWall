import { fetcher, writer } from "./store";

let flag = 0b00;

export function startTrapProject() {
  return new Promise<void>((resolve) => {
    Object.defineProperty(Object.prototype, "props", {
      set(props) {
        if (props && "reduxProjectId" in props) {
          if (this.fetchProject) {
            fetcher.set(this);
            flag |= 0b01;
          }
          if (this.storeProject) {
            writer.set(this);
            flag != 0b10;
          }
          if (flag == 0b11) {
            resolve();
          }
        }

        Object.defineProperty(this, "props", {
          value: props,
          configurable: true,
          writable: true,
          enumerable: true,
        });
      },
    });
  });
}

type GandiState = {
  props: any;
};

export type Fetcher = GandiState & {
  fetchProject(url: string, t: "FETCHING_WITH_ID"): void;
};

export type Writer = GandiState & {
  fetchProject(url: string, t: "FETCHING_WITH_ID"): void;
};
