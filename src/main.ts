import { mount } from "svelte";
import { startTrap } from "./trapVM";
import App from "./App.svelte";
import plugins from "../plugins/plugin-manifest";
import "./adapter";

let { document, localStorage } = unsafeWindow;

const rootContainer = document.createElement("div");
document.body.appendChild(rootContainer);
let target: HTMLElement;
if (localStorage.getItem("firewall.noShadow") != "true") {
  const shadowRoot = rootContainer.attachShadow({ mode: "open" });
  target = document.createElement("div");
  shadowRoot.appendChild(target);
} else {
  console.warn("未使用shadow dom，可能暴露");
  target = rootContainer;
}

const app = mount(App, {
  target,
  props: {
    plugins,
    page: 0,
  },
});

export default app;
