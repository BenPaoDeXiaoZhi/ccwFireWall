declare var unsafeWindow: Window & {
  console: Console;
};
declare var GM_setValue: (name: string, v: any) => void;
declare var GM_getValue: <T>(name: string, defaultValue?: T) => T | any;
