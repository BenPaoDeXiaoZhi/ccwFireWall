import type { Component } from 'svelte';
export class Plugin {
  name: string;
  icon: string|Component;
  main: Component;
  constructor(name:string, icon: string|Component, main: Component){
    this.name = name;
    this.icon = icon;
    this.main = main;
  }
}