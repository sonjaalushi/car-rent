import { Component, inject, Signal } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { environment } from '../../../environments/environment';
import { faHome, faList } from '@fortawesome/free-solid-svg-icons';
import { SidebarItem } from './sidebar.types';
import { LayoutService } from '../layout.service';
import { AppRoutes } from '../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgForOf, FaIconComponent, NgClass, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  #layoutService: LayoutService = inject(LayoutService);
  #router: Router = inject(Router);
  sidebarOpen: Signal<boolean> = this.#layoutService.sidebarOpen;
  activeParentUrl: string | undefined = undefined;

  constructor() {
    this.#router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeParentUrl = event.url.replace('/', '');
      }
    });
  }

  sidebarItem: SidebarItem[] = [
    {
      id: 1,
      icon: faHome,
      label: 'Home',
      route: AppRoutes.Home,
    },
    {
      id: 2,
      icon: faList,
      label: 'Table',
      route: AppRoutes.Table,
    },
  ];
  protected readonly environment = environment;
}
