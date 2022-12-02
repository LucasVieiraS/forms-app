import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { SessionService } from '../services/session.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  sessionData = null;

  constructor(private sessionService: SessionService, private storageService: StorageService) {
  }

  logOut() {
    this.sessionService.logOut();
  }

  async init() {
    this.sessionData = await this.storageService.get('session');
  }

  ngOnInit() {
    this.init();
  }

}
