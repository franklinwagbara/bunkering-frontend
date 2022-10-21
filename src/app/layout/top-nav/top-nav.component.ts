import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  public menuOpen: boolean = true;
  @Output('onMenuOpen') onMenuOpen = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  navToggle() {
    this.menuOpen = !this.menuOpen;
    this.onMenuOpen.emit(this.menuOpen);
  }
}
