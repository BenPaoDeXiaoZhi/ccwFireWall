declare interface GandiRuntime extends VM.Runtime {
  extensionManager: GandiExtMgr;
}

declare interface GandiVM extends VM {
  runtime: GandiRuntime;
}

declare interface GandiExtMgr extends VM.ExtensionManager {
  vm: GandiVM;
}

declare var unsafeWindow: Window & {
  console: Console;
};
declare var GM_setValue: (name: string, v: any) => void;
declare var GM_getValue: <T>(name: string, defaultValue?: T) => T | any;
