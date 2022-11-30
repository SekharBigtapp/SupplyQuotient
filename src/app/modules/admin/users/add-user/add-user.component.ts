import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServices } from '../user.services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserform!: FormGroup;
  UserList: any;
  RolesList: any = [];
  validation_messages = {
    Username: [
      { type: 'required', message: 'Please Enter User Name' },
    ],
    Display_Name: [
      { type: 'required', message: 'Please Enter Display Name' },
    ],
    email: [
      { type: 'required', message: 'Please Enter EmailId' },
    ],
    Password: [
      { type: 'required', message: 'Please Enter Password' },
    ],
    Role: [
      { type: 'required', message: 'Please Select Role Type' },
    ],
     
  };

  constructor( private userservices:UserServices, private router: Router, private formBuilder: FormBuilder,  ) { }

  ngOnInit(): void {
    this.addUserform = this.formBuilder.group({
      Username: ['',Validators.required],
      Display_Name: ['',Validators.required],
      email: ['',Validators.required],
      Password: ['',Validators.required],
      Role: ['',Validators.required],
    })
    for (let user of this.UserList) {
      for (let role of this.RolesList) {
        if (user.Role == role.Role) {
          user.Rolename = role.Rolename;
        }
      }
    }
   
  }

  getRoles(){
    this.userservices.GetRoles().subscribe((response) => {
      console.log(response);
      for(let roles of response){
        if(roles.isActive == 'Y')
        {
          this.RolesList.push(roles);
        }
      }
    
    })
  }

  onAddUserSubmit(){
    let obj = {
      "Username": this.addUserform.value.Username,
      "Display_Name": this.addUserform.value.Display_Name,
      "email" : this.addUserform.value.email,
      "Password": this.addUserform.value.Password,
      "Role" : this.addUserform.value.Role,
    }
    this.userservices.AddUsers(obj).subscribe((response) =>{
      console.log(response);
      this.router.navigateByUrl('/user')
    })
  }
      
  

}

