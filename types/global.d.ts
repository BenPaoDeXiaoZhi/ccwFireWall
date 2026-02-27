declare interface GandiRuntime extends VM.Runtime {
  extensionManager: GandiExtMgr;
}

declare interface GandiVM extends VM {
  runtime: GandiRuntime;
}

declare interface GandiExtMgr extends VM.ExtensionManager {
  vm: GandiVM;
}

declare const unsafeWindow:Window;
