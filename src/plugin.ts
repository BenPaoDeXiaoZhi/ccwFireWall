import type { Component } from 'svelte';

export type FunctionalComponent = (
  ctx: PluginContext
) => Function;

export class Plugin {
  name: string;
  icon: string|Component;
  main: Component;
  constructor(
    name:string,
    icon: string|Component,
    main: Component|FunctionalComponent
  ){
    this.name = name;
    this.icon = icon;
    this.main = main;
  }
}

export type PluginContext = {
  vm: GandiVM,
  container: HTMLElement,
  root: HTMLElement,
}