import { Component, OnInit } from '@angular/core';
import { UserService} from './../shared/services/user.service'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  elements;

  headElements = ['Name', 'Email', 'Admin'];

  constructor(private user_service:UserService) { }

  ngOnInit() {
    this.user_service.users.valueChanges()
    .subscribe(x=>{
       
          this.elements = x
        
    })
  }

}
