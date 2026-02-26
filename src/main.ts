import { mount } from "svelte";
import { startTrap } from "./trapVM";
import App from "./App.svelte";

const app = mount(App, {
  target: document.body,
});

const trapConfig = localStorage.getItem("trapType") == "false" ? false : true;
startTrap(trapConfig);
localStorage.setItem("trapType", trapConfig ? "true" : "false");

export default app;
