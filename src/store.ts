import { writable } from "svelte/store";
const configKey = "firewall.config"
let origConfig = {};
try {
    origConfig = JSON.parse(localStorage.getItem(configKey);
}catch(e) {
    console.warn("firewall:", e);
};
export const config = writable<Record<string, any>>({});
config.subscribe((cfg)=>{
    localStorage.setItem(configKey, JSON.stringify(cfg));
});