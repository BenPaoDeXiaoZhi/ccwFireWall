import { RPC } from "@mixer/postmessage-rpc";
import { writable } from "svelte/store";
import { RPC_Message } from "../../enum";

export type RPCstore = {
  [k: string]: RPCdata;
};

export type RPCdata = {
  rpc: RPC;
  meta: {
    url: string;
    name: string;
    vmTrapped: boolean;
    extraName: string;
  };
  target: WindowProxy;
};

export const rpcInstances = writable<RPCstore>({});

export async function storeRPC(rpc: RPC, url: string, target: WindowProxy) {
  const name: string = await rpc.call(RPC_Message.monkey_GET_PROJECT_NAME, {});
  const vmTrapped: boolean = await rpc.call(RPC_Message.monkey_VM_TRAPPED, {});
  const Url = new URL(url);
  let extraName = "";
  if (Url.searchParams.get("overwrite")) {
    const { title } = JSON.parse(Url.searchParams.get("overwrite")!);
    extraName = title;
  }
  rpcInstances.update((instances) => ({
    ...instances,
    [url]: {
      rpc,
      meta: {
        name,
        url,
        vmTrapped,
        extraName,
      },
      target,
    },
  }));
  rpc.expose(RPC_Message.html_UPDATE_VM_TRAPPED, () => {
    rpcInstances.update((instances) => ({
      ...instances,
      [url]: {
        ...instances[url],
        meta: {
          ...instances[url].meta,
          vmTrapped: true,
        },
      },
    }));
  });
  rpc.expose(
    RPC_Message.html_UPDATE_GET_PROJECT_NAME,
    ({ name }: { name: string }) => {
      rpcInstances.update((instances) => ({
        ...instances,
        [url]: {
          ...instances[url],
          meta: {
            ...instances[url].meta,
            name,
          },
        },
      }));
    },
  );
  rpc.expose(
    RPC_Message.shared_OFFLINE,
    ({ url: offlineUrl }: { url: string }) => {
      rpcInstances.update((instances) => {
        console.log(offlineUrl, url);
        if (offlineUrl !== url) return instances;
        const { [url]: _, ...rest } = instances;
        return rest;
      });
    },
  );
}
