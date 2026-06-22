type MaybeWithRuntime = { runtime: GandiRuntime } | any;

export function startTrap(): Promise<GandiVM> {
  return new Promise((resolve) => {
    trapViaDefine(resolve);
  });
}

function trapViaDefine(resolve: Function) {
  const orig = Object.defineProperty;
  Object.defineProperty = function (
    obj: MaybeWithRuntime,
    ...rest
  ): MaybeWithRuntime {
    if (checkWithRuntime(obj, resolve)) {
      Object.defineProperty = orig;
    }
    return orig.call(this, obj, ...rest);
  };
}

function checkWithRuntime(obj: MaybeWithRuntime, resolve: Function) {
  if (!obj?.runtime?.extensionManager?.vm) {
    return false;
  }
  const runtime = obj.runtime as GandiRuntime;
  const gandiVM = runtime.extensionManager.vm;
  resolve(gandiVM);
  console.log("vm trapped" + gandiVM);
  return true;
}
