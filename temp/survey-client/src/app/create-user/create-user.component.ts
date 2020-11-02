import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserFirstService } from '../userFirst.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserFirstService,
    private router: Router) { }

  ngOnInit() {
  }

  saveUser(){
    this.userService.createUser(this.user).subscribe(data => {
      console.log(data);
      this.goToUserList();
    },
    error => console.log(error));
  }

  goToUserList(){
    this.router.navigate(['/users']);
  }

  onSubmit(){
    this.saveUser();
  }

}
