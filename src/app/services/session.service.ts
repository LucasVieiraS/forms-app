import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService{

  constructor(private storageService: StorageService, private route: Router) {}

  async logOut() {
    await this.storageService.set('session', null);
    this.route.navigateByUrl('/login');
  }

  async logIn(sessionData: User) {
    if (!sessionData) {
      return;
    }
    await this.storageService.set('session', sessionData);
    this.route.navigateByUrl('/home');
  }

  async resetSessionRoute() {
    const session = await this.storageService.get('session');
    if (session != null) {
      this.route.navigateByUrl('/home');
      return;
    }
    this.route.navigateByUrl('/login');
  }
}
