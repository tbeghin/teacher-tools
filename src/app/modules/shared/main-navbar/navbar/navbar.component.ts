import {Component, OnInit} from '@angular/core';
import {AppLinks} from '../../models/appLinks';
import {APP_MENU} from '../../models/constants/app-menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public links: Array<AppLinks>;

  constructor() {
    this.links = APP_MENU;
  }

  ngOnInit() {
  }
}
