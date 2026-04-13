import { config } from "#src/store";
import { get } from "svelte/store";

if (!("unsafeWindow" in window)) {
  (window as any).unsafeWindow = window;
};

const origin = {
  console
};

config.subscribe((config)=>{
  if(!!config.consoleRedirect){
    console = unsafeWindow.console;
  }else{
    console = origin.console;
  }
});