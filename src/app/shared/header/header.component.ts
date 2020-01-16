import { AuthResponseData } from './../../models/authResponseData';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
currentUser
isAuthenticated = false;

constructor(private authService:AuthService,
    private router:Router
    ) {}
  ngOnInit() {

  this.currentUser = localStorage.getItem('fullName');

    }
  logOut(){
    this.authService.logout();

  }
 
}
