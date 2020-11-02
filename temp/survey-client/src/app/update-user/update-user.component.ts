import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserFirstService } from '../userFirst.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  user: User = new User();
  constructor(private userService: UserFirstService, 
    private route:ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data =>{
      this.user=data;
    }, error => console.log(error));
  }

  onSubmit(){
    this.userService.updateUser(this.id, this.user).subscribe(data =>{
      this.goToUserList();
    }, error => console.log(error));
  }

  goToUserList(){
    this.router.navigate(['/users']);
  }

}
