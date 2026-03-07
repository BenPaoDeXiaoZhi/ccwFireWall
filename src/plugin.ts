import type { Component } from "svelte";

export class Plugin {
  name: string;
  icon: string | Component;
  main: Component<PluginContext> | FunctionPlugin;
  constructor(
    name: string,
    icon: string | Component,
    main: Component<PluginContext> | FunctionPlugin,
  ) {
    this.name = name;
    this.icon = icon;
    this.main = main;
  }
}

export type PluginContext = {
  vm: GandiVM | null;
  container: HTMLElement;
  root: HTMLElement | ShadowRoot;
};

type Fn = (ctx: PluginContext) => any;

export class FunctionPlugin {
  init: Fn;
  update: Fn;
  dispose: Fn;
  constructor(init: Fn, update: Fn, dispose: Fn) {
    this.init = init;
    this.update = update;
    this.dispose = dispose;
  }
}
