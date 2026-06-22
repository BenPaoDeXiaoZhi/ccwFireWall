declare interface GandiRuntime extends VM.Runtime {
  extensionManager: GandiExtMgr;
}

declare interface GandiVM extends VM {
  runtime: GandiRuntime;
}

declare interface GandiExtMgr extends VM.ExtensionManager {
  vm: GandiVM;
  _prepareExtensionInfo(name: string, info: any): any;
}
