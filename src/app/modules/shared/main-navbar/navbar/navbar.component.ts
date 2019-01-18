import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public links: Array<string>;

  constructor() {
    this.links = [];
  }

  ngOnInit() {
    this.links = ['toto', 'titi', 'tutu', 'tata'];
  }

}
