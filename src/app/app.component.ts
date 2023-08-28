import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import rg4js from 'raygun4js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      // Track navigation errors when the NavigationError event occurs
      if (event instanceof NavigationError) {
        // Track navigation error
        rg4js('send', {
          error: event.error
        });
      }
    });

    this.router.events.subscribe(event => {
      // Track page views when the NavigationEnd event occurs
      if (event instanceof NavigationEnd) {

        console.log(event.url)

        rg4js('trackEvent', {
          type: 'pageView',
          path: event.url
        });
      }
    });
  }



  // rg4js('trackEvent', {
  //   type: 'pageView',
  //   path: '/' + window.location.pathname
  // });

}
