import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TOOLTIP_LABEL} from '../../models/constants/tooltipLabel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavAction: EventEmitter<void>;
  public languageLabel = TOOLTIP_LABEL.header.language;
  public settingsLabel = TOOLTIP_LABEL.header.settings;
  public profileLabel = TOOLTIP_LABEL.header.profile;
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
