import { NavigationStart, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { CartService } from './../../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  numberOfItems: number = 0;
  isLoggedIn = false;
  isAdminUrl = false;
  isAdmin$;
  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService
  ) {
    router.events.subscribe({
      next: (event) => {
        //console.log(event);

        if (event instanceof NavigationStart) {
          let url = (<NavigationStart>event).url;
          this.isAdminUrl = url.includes('/admin');
        }
      },
    });
  }

  ngOnInit(): void {
    this.cartService.cartObservable.subscribe({
      next: (cart) => {
        //console.log(cart);
        this.numberOfItems = Object.keys(cart).length;
      },
    });

    this.userService.loginObservable.subscribe({
      next: () => {
        let token = this.userService.getToken();
        if (token != '') {
          this.checkAdmin();
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
    });
  }

  checkAdmin() {
    this.isAdmin$ = this.userService.isAdmin();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
