// import "./preload";

import { mount } from "svelte";
import App from "./App.svelte";
import "./app.css";
import plugins from "../plugins/plugin-manifest";
import { RPC } from "@mixer/postmessage-rpc";
import { storeRPC } from "./rpc.store";
import { RPC_Message } from "#enum.js";

const rootContainer = document.getElementById("root")!;

const app = mount(App, {
  target: rootContainer,
  props: {
    plugins,
    page: 0,
    root: rootContainer,
  },
});

if (opener) {
  console.log(opener);
  const Url = new URL(document.URL);
  const rpc = new RPC({
    target: opener,
    serviceId: `${RPC_Message.shared_SERVICE_PREFIX}${Url.searchParams.get("from")!}`,
  });
  storeRPC(rpc, Url.searchParams.get("from")!, opener);
  history.pushState(null, "", ".");
}
