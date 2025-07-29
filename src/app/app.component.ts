import { Component, OnInit, isDevMode, HostListener, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import {
  SwPush,
  SwUpdate,
  UnrecoverableStateEvent,
  VersionEvent,
  VersionReadyEvent,
} from '@angular/service-worker';
import { PUBLIC_VAPID_KEY_OF_SERVER } from './app.constants';
import { NotificationService } from './notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // Use OnPush change detection to improve performance
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  notificationData: string = '{}';
  title = 'demo1';
  public getScreenWidth: any;
  public getScreenHeight: any;
  showSidebar: boolean = true;
  showNavbar: boolean = true;
  isLoading: boolean;

  constructor(
    private router: Router,
    private updateService: SwUpdate,
    private pushService: SwPush,
    private notificationService: NotificationService,
  ) {
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (
          event['url'] == '/user-pages/login' ||
          event['url'] == '/user-pages/register' ||
          event['url'] == '/error-pages/404' ||
          event['url'] == '/error-pages/500'
        ) {
          this.showSidebar = false;
          this.showNavbar = false;
          document.querySelector('.main-panel')?.classList.add('w-100');
          document
            .querySelector('.page-body-wrapper')
            ?.classList.add('full-page-wrapper');
          const content = document.querySelector('.content-wrapper');
          content?.classList.remove('auth', 'auth-img-bg');
          content?.classList.remove('auth', 'lock-full-bg');
          if (event['url'] == '/error-pages/404' || event['url'] == '/error-pages/500') {
            content?.classList.add('p-0');
          }
        } else {
          this.showSidebar = true;
          this.showNavbar = true;
          document.querySelector('.main-panel')?.classList.remove('w-100');
          document
            .querySelector('.page-body-wrapper')
            ?.classList.remove('full-page-wrapper');
          const content = document.querySelector('.content-wrapper');
          content?.classList.remove('auth', 'auth-img-bg');
          content?.classList.remove('p-0');
        }
      }
    });
    // Spinner for lazyload modules
    this.router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
    // Scroll to top after route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    console.log('AppComponent.ngOnInit');
    if (!this.updateService.isEnabled) {
      console.log('AppComponent.ngOnInit: Service Worker is not enabled');
      return;
    }
    console.log('AppComponent.ngOnInit: Service Worker is enabled');
    this.#handleUpdates();
    this.#handleNotifications();
  }

  ngOnDestroy(): void {
    // Intentionally left blank – place to clean up subscriptions if added later
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }
  unsubscribe(): void {
    this.pushService.unsubscribe().then(() => {
      console.log('Unsubscribed');
    });
  }
  sendNotification(): void {
    this.notificationService.notifications(this.notificationData);
  }

  #handleUpdates(): void {
    this.updateService.versionUpdates.subscribe((event: VersionEvent) => {
      console.log(event);
      alert(event.type);
      if (
        event.type === 'VERSION_READY' &&
        confirm(`New version ${(event as VersionReadyEvent).latestVersion.hash} available. Load New Version?`)
      ) {
        window.location.reload();
      }
    });
    this.updateService.unrecoverable.subscribe((event: UnrecoverableStateEvent) => {
      alert('Error reason : ' + event.reason);
    });
  }

  async #handleNotifications(): Promise<void> {
    try {
      const sub = await this.pushService.requestSubscription({
        serverPublicKey: PUBLIC_VAPID_KEY_OF_SERVER,
      });
      this.notificationService.addSubscription(sub);
      console.log('Subscribed');
    } catch (err) {
      console.error('Could not subscribe due to:', err);
    }
    this.pushService.messages.subscribe((message) => {
      console.log(message);
    });
    this.pushService.notificationClicks.subscribe((message) => {
      console.log(message);
    });
    this.pushService.subscription.subscribe((subscription) => {
      console.log(subscription);
    });
  }
}