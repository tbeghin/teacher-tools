export interface AppLinks {
  label: string;
  link: string;
  icon: string;
}

export class AppLinks implements AppLinks {
  label: string;
  link: string;
  icon: string;

  constructor(label: string, link: string, icon: string) {
    this.label = label;
    this.link = link;
    this.icon = icon;
  }
}
