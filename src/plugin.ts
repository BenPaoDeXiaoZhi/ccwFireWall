export class Plugin {
  name: string;
  icon: string;
  constructor(name:string, icon: string, main: any){
    this.name = name;
    this.icon = icon;
  }
}