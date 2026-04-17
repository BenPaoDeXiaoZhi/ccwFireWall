type MaybeWithRuntime = { runtime: GandiRuntime } | any;
import { config } from "./store";
import { get } from "svelte/store";

const useBind = !!get(config).useBind;
config.update((c) => ((c.useBind = useBind), c));

export function startTrap(): Promise<GandiVM> {
  console.log(`useBind:${useBind}`);
  return new Promise((resolve) => {
    if (!useBind) {
      trapViaDefine(resolve);
    } else {
      trapViaBind(resolve);
    }
  });
}

function trapViaBind(resolve: Function) {
  const proto = Function.prototype;
  const orig = proto.bind;
  proto.bind = function (this2: MaybeWithRuntime, ...rest) {
    if (checkWithRuntime(this2, resolve)) {
      proto.bind = orig;
    }
    return orig.call(this, this2, ...rest);
  };
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
  console.log(gandiVM);
  return true;
}
