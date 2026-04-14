if (!window.unsafeWindow) {
  window.unsafeWindow = window;
}
if (!window.GM_getValue) {
  window.GM_getValue = (name, defaultValue) => {
    const value = localStorage.getItem(name);
    if (value === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  };
}

if (!window.GM_setValue) {
  window.GM_setValue = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  };
}
