import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  content: string;

  constructor(private userService: UserService,
    private router: Router,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  clickQuestion(){
    this.router.navigate(['']);
  }

  clickCreate(){
    this.router.navigate(['/create-survey/']);
  }// 

  clickRegister(){
    this.router.navigate(['/register/']);
  }

  clickContribute(){
    this.router.navigate(['/survey-list/']);
  }

}