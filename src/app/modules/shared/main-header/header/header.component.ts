import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavAction: EventEmitter<void>;
  public title: string;

  constructor() {
    this.sideNavAction = new EventEmitter<void>();
  }

  ngOnInit() {
    this.title = 'Outils profs';
  }

  public changeSideNavMode(): void {
    this.sideNavAction.emit();
  }
}
