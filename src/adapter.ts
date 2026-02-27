if (!("unsafeWindow" in window)) {
  (window as any).unsafeWindow = window;
}
