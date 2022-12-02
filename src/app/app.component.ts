import { Component } from '@angular/core';

import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private sessionService: SessionService) {
    setTimeout(() => {
      this.sessionService.resetSessionRoute();
    }, 1000);
  }
}
