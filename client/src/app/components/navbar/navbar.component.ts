import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username:string;
  
  constructor( public authService: AuthService,
               private router: Router,) { }

  ngOnInit() {
    let obj = JSON.parse(localStorage.getItem('user'));
    console.log(obj);
    if (obj) {
      this.username = obj.Username;
    }

    this.authService.getLoggedInName.subscribe(name => this.username = name);
  }

  ngAfterViewInit() {
    let obj = JSON.parse(localStorage.getItem('user'));
    console.log("after:",obj);
    if (obj) {
      this.username = obj.Username;
    }
  }

  // Function to logout user
  onLogoutClick() {
    this.authService.logout(); // Logout user
    //this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' }); // Set custom flash message
    //this.router.navigate(['/']); // Navigate back to home page
  }
}
