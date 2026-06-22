import { RPC } from "@mixer/postmessage-rpc";
import { startTrap } from "./trapVM";
import { vm, rpc } from "./store";
import { get } from "svelte/store";
import { RPC_Message } from "../enum";
import { startTrapProject } from "./trapProjectStore";

const { open } = window; // ccw will patch this

if (opener) {
  const rpcInstance = new RPC({
    target: opener,
    serviceId: `${RPC_Message.shared_SERVICE_PREFIX}${document.URL}`,
  });
  rpc.set(rpcInstance);
} else {
  const Iid = setInterval(() => {
    if (!document.body) {
      return;
    }
    try {
      init();
    } catch (e) {
      return;
    }
    clearInterval(Iid);
  });
}

async function init() {
  if (!open || open.toString() !== "function open() { [native code] }") {
    alert("failed to get window.open!");
    return;
  }
  const openButton = document.createElement("button");
  const shadowContainer = document.createElement("div");
  const shadow = shadowContainer.attachShadow({ mode: "closed" });
  document.body.insertBefore(shadowContainer, document.body.firstChild);
  shadow.appendChild(openButton);
  openButton.style.zIndex = "9999";
  openButton.innerText = "打开firewall主界面";
  const openUrl = `${import.meta.env.VITE_URL}?from=${document.URL}`;
  openButton.onclick = () => {
    const managerWindow = open(openUrl, "ccw-firewall");
    console.log(managerWindow);
    if (!managerWindow) {
      alert("failed to open monitor!");
      return;
    }
    const rpcInstance = new RPC({
      target: managerWindow,
      serviceId: "ccw firewall",
    });
    rpc.set(rpcInstance);
    openButton.remove();
  };
}

startTrap().then((gandiVM) => {
  vm.set(gandiVM);
  if (get(rpc)) {
    const rpcInstance = get(rpc);
    rpcInstance.call(RPC_Message.html_UPDATE_VM_TRAPPED, {});
  }
});
rpc.subscribe((rpc) => {
  if (!rpc) {
    return;
  }
  console.log(rpc);
  rpc.expose(RPC_Message.monkey_VM_TRAPPED, () => !!get(vm));
  rpc.expose(RPC_Message.monkey_GET_PROJECT_NAME, getProjectName);
  rpc.expose(RPC_Message.shared_FOCUS, () => {
    window.focus();
  });
  {
    const { URL } = document;
    window.addEventListener("beforeunload", () => {
      rpc.call(RPC_Message.shared_OFFLINE, { url: URL });
    });
  }
  observeTitle();
});

function observeTitle() {
  const titleDom = document.querySelector("title")!;
  const observer = new MutationObserver(() => {
    get(rpc).call(RPC_Message.html_UPDATE_GET_PROJECT_NAME, {
      name: getProjectName(),
    });
  });
  observer.observe(titleDom, { childList: true });
}

function getProjectName() {
  return document.title.split(" - ").slice(1, -2).join(" - ");
}

let overwriteConfig: {
  projectLink: string;
  title: string;
};

function getOverwriteConfig(): {
  projectLink: string;
  title: string;
} {
  if (overwriteConfig) {
    return overwriteConfig;
  }
  const url = new URL(document.URL);
  overwriteConfig = JSON.parse(url.searchParams.get("overwrite"));
  if (!overwriteConfig) {
    return;
  }
  overwriteConfig.projectLink = `https://m.ccw.site${overwriteConfig.projectLink}`;
  url.searchParams.delete("overwrite");
  history.pushState(null, "", url);
  return overwriteConfig;
}

if (getOverwriteConfig()) {
  const overwrite: {
    projectLink: string;
    title: string;
  } = getOverwriteConfig();
  alert(`将会覆盖${overwrite.projectLink}(${overwrite.title})`);
}

startTrapProject();
console.log("project");
