import { writable } from "svelte/store";
const configKey = "firewall.config"
let origConfig: Record<string, any> = {};
try {
    origConfig = JSON.parse(localStorage.getItem(configKey));
}catch(e) {
    console.warn("firewall:", e);
};
alert(origConfig);
export const config = writable(origConfig);
config.subscribe((cfg)=>{
    console.info("cfg update:", cfg);
    localStorage.setItem(configKey, JSON.stringify(cfg));
});