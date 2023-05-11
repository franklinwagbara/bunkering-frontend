import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { IMenuItem, ISubmenu } from '../../interfaces/menuItem';

@Component({
  host: {
    '(document:click)': 'onClickOutSide($event)',
  },
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  public isOpen$ = new BehaviorSubject<boolean>(false);
  public isOpen = false;
  public isActive = false;

  @Input() title;
  @Input() path;
  @Input('menu-items') menuItems: IMenuItem[];

  @ViewChild('menu_item') menuItem;
  @ViewChild('dropdown') dropdown;

  constructor(
    private elRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      url.forEach((u) => {
        if (u.path.includes(this.path)) this.isActive = true;
        else this.isActive = false;

        // u.path.includes();
      });
    });
  }

  onClickOutSide(event) {
    if (
      !this.menuItem.nativeElement.contains(event.target) &&
      !this.dropdown.nativeElement.contains(event.target)
    ) {
      this.isOpen = false;
      this.isOpen$.next(false);
    }
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.isOpen$.next(this.isOpen);
  }

  navigateTo(menuItem: ISubmenu) {
    if (!menuItem.url) return;
    this.router.navigate([menuItem.url]);
  }

  navigateToUrl(url) {
    this.router.navigate([url]);
  }
}
