import { vm } from "./store";

type MaybeWithRuntime = { runtime: GandiRuntime } | any;
export function startTrap(useBind: boolean) {
  console.log(`useBind:${useBind}`);
  if (!useBind) {
    trapViaDefine();
  } else {
    trapViaBind();
  }
}

function trapViaBind() {
  const proto = Function.prototype;
  const orig = proto.bind;
  proto.bind = function (this2: MaybeWithRuntime, ...rest) {
    if (checkWithRuntime(this2)) {
      proto.bind = orig;
    }
    return orig.call(this, this2, ...rest);
  };
}

function trapViaDefine() {
  const orig = Object.defineProperty;
  Object.defineProperty = function (
    obj: MaybeWithRuntime,
    ...rest
  ): MaybeWithRuntime {
    if (checkWithRuntime(obj)) {
      Object.defineProperty = orig;
    }
    return orig.call(this, obj, ...rest);
  };
}

function checkWithRuntime(obj: MaybeWithRuntime) {
  if (!obj?.runtime) {
    return false;
  }
  const runtime = obj.runtime as GandiRuntime;
  const gandiVM = runtime.extensionManager.vm;
  vm.set(gandiVM);
  console.log(gandiVM);
  return true;
}
