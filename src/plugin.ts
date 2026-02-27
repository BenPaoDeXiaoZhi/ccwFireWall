import type { Component } from "svelte";
import type { Writable } from "svelte/store";

export class Plugin {
  name: string;
  icon: string | Component;
  main: Component;
  constructor(name: string, icon: string | Component, main: Component) {
    this.name = name;
    this.icon = icon;
    this.main = main;
  }
}

export type PluginContext = {
  vm: Writable<GandiVM>;
  container: HTMLElement;
  root: HTMLElement;
};
