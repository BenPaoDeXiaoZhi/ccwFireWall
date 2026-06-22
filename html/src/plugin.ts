import type { Component } from "svelte";

export class Plugin {
  name: string;
  icon: string | Component;
  main: Component<PluginContext>;
  constructor(
    name: string,
    icon: string | Component,
    main: Component<PluginContext>,
  ) {
    this.name = name;
    this.icon = icon;
    this.main = main;
  }
}

export type PluginContext = {
  vm: GandiVM | undefined;
  root: HTMLElement | ShadowRoot;
};
