import { config } from "../store";

const origin = {
  console,
};
config.subscribe((config) => {
  if (!!config.consoleRedirect) {
    console = unsafeWindow.console;
  } else {
    console = origin.console;
  }
});
