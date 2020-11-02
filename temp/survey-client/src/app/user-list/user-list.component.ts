import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserFirstService } from '../userFirst.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserFirstService,
    private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(){
    this.userService.getUsersList().subscribe(data => {
      this.users = data
    });
  }

  updateUser(id: number){
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(data =>{
      this.getUsers();
    })
  }

  userDetails(id: number){
    this.router.navigate(['user-details', id]);
  }

}
