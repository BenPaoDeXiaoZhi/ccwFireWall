import { mount } from "svelte";
import App from "./App.svelte";
import plugins from "../plugins/plugin-manifest";
import "./adapter";

let { document, localStorage } = unsafeWindow;

const rootContainer = document.createElement("div");
document.body.appendChild(rootContainer);
let target: HTMLElement;
if (localStorage.getItem("firewall.noShadow") != "true") {
  var shadowRoot = rootContainer.attachShadow({ mode: "closed" });
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
    root: target,
  },
});

export default app;
