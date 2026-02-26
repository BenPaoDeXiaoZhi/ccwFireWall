import type { Component } from 'svelte';

export type FunctionalComponent = ({
  vm: GandiVM,
  root: HTMLElement,
}) => Function;

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