import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TOOLTIP_LABEL} from '../../models/constants/tooltipLabel';
import {AuthenticationService} from '../../login/services/authentication.service';
import {Observable} from 'rxjs';
import {IUser} from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavAction: EventEmitter<void>;
  public headerLabel = TOOLTIP_LABEL.header;
  public currentUser$: Observable<IUser>;
  public title: string;

  constructor(private authenticationService: AuthenticationService) {
    this.sideNavAction = new EventEmitter<void>();
  }

  ngOnInit() {
    this.title = 'Outils profs';
    this.currentUser$ = this.authenticationService.currentUser$;
  }

  public changeSideNavMode(): void {
    this.sideNavAction.emit();
  }
}
