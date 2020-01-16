import { AuthResponseData } from './../models/authResponseData';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ViewChild({read:'f', static:true}) loginForm:NgForm
  error: string = null;
  auth:AuthResponseData; //stugich
  constructor(private authService:AuthService, 
    private router: Router
    ) {}

  ngOnInit() {

  }
  
  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    };
    const email = form.value.email;
    const password = form.value.password;
    this.auth = form.value; //stugich
    this.authService.login(this.auth).subscribe(respData =>{
      console.log(respData);
      localStorage.setItem('token', respData.token);
      localStorage.setItem('fullName', `${respData.user.srName} ${respData.user.name}`);
      if (respData.user.isAdmin) {
        localStorage.setItem('isAdmin', 'admin');
        this.router.navigate(['events-table']);
      } else {
        this.router.navigate(['/events']);
      }
      },
      errorMessage =>{
        this.error = errorMessage;
        console.log(errorMessage);
      });
    form.reset();
  }
  
}
