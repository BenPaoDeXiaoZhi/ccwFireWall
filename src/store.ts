import { writable } from "svelte/store";
const configKey = "firewall.config";
let origConfig: Record<string, any> = {};
try {
  origConfig = GM_getValue(configKey, {});
} catch (e) {
  console.warn("firewall:", e);
}
export const config = writable(origConfig);
config.subscribe((cfg) => {
  alert(GM_getValue(configKey))
  GM_setValue(configKey, cfg);
});
