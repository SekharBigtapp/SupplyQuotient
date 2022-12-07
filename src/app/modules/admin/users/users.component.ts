import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/notifier.service';
import { UserServices } from './user.services';


// export interface PeriodicElement {
//   userName: string;
//   companyName: string;
//   email: string;
//   role: string;
//   position:number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, userName: 'Hydrogen', companyName: '1.0079', email: 'H', role:'admin'},
//   {position: 2, userName: 'Hydrogen', companyName: '1.0079', email: 'H', role:'admin'},
//   {position: 3, userName: 'Hydrogen', companyName: '1.0079', email: 'H', role:'admin'},
// ];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  displayedColumns: string[] = ['sno','Username', 'Display_name', 'Email', 'Rolename', 'Actions'];
  isAddUserForm : boolean = false;
  filterdata:any;
  gridData = [];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  AllUsers: any = [];
  filterData: any;

  errorMessage: any;
  Message: any;
  errorType: any;
  validt: any;
  editMode: any;

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
  confirmationDialogService: any;
  

  constructor( private userservices:UserServices, 
    private router: Router, 
    private notifierService : NotifierService,
    private formBuilder: FormBuilder) { }
  

  ngOnInit(): void {
    this.filterdata = {
      filterColumnNames: [
        { "Key": 'sno', "Value": "" },
        { "Key": 'Username', "Value": "" },
        { "Key": 'Display_name', "Value": "" },
        { "Key": 'Email', "Value": "" },
        { "Key": 'Rolename', "Value": "" },
      ],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
    //this.getAllUsers();
    this.getRoles();
   
    this.addUserform = this.formBuilder.group({
      Username: ['',Validators.required],
      Display_Name: ['',Validators.required],
      email: ['',Validators.required],
      Password: ['',Validators.required],
      Role: ['',Validators.required],
    })
    
  }

  getAllUsers() {
    this.userservices.GetUsers().subscribe((response)=>{
      console.log(response);
      const userList : any=[];

      for(let i=0; i<response.length ; i++) {
        response[i].sno= i+1;
        userList.push(response[i]);      
      } 

      for (let user of userList) {
        for (let role of this.RolesList) {
          if (user.Id == role.Id) {
            user.Rolename = role.Rolename;
          }
        }
      }
     
      this.AllUsers = userList;
      console.log (this.AllUsers);
      this.filterdata.gridData = userList;
      this.dataSource = new MatTableDataSource(userList);
      this.filterdata.dataSource = this.dataSource;
      console.log(this.filterdata.dataSource.filterdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }
 
  getRoles(){
    this.userservices.GetRoles().subscribe((response) => {
      //console.log(response);
      for(let roles of response){
        //if(roles.isActive == 'N')
        //{
          this.RolesList.push(roles);
       // }
      }
      console.log(this.RolesList)
    
    })
    this.getAllUsers();
  }

  onAddUser(){
    this.isAddUserForm=true;
  }

  onAddUserSubmit(){
    
    if (this.addUserform.valid){
      if (this.editMode){
        this.userEditSave();
      }
      else{
        this.notifierService.showNotification('Error', "User Already Exist");
        let obj = {
          "Username": this.addUserform.value.Username,
          "Display_name": this.addUserform.value.Display_Name,
          "Email" : this.addUserform.value.email,
          "Password": this.addUserform.value.Password,
          "Role" : this.addUserform.value.Role.toString(),
        }
        
        this.userservices.AddUsers(obj).subscribe((response) =>{
          console.log(response);
          // this.router.navigateByUrl('/user')
          this.getAllUsers();
          this.isAddUserForm = false;
          this.addUserform.reset();
        })
      }
    }
    
  }

  onUserEdit(value:any){
    console.log(value.Role)
    this.editMode = true;
    this.addUserform = this.formBuilder.group({
      Username: value.Username,
      Display_Name: value.Display_name,
      email: value.Email,
      Password: value.Password,
      Role: value.Role,
    })
    this.isAddUserForm = true;
  }
  userEditSave(){
    let obj = {
      "Username": this.addUserform.value.Username,
      "Display_name": this.addUserform.value.Display_Name,
      "Email" : this.addUserform.value.email,
      "Password": this.addUserform.value.Password,
      "Role" : this.addUserform.value.Role.toString(),
    }
    this.userservices.EditUser(obj).subscribe((response) =>{
      console.log(response);
      this.editMode = false;
      this.getAllUsers();
      this.isAddUserForm = false;
      this.addUserform.reset();
    } )
      

  }
  onUserDelete(value:any){
    var message = 'Are you sure you want to delete?';
    alert(message);
    // this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Delete User?')
    // .then((confirmed: any) => console.log('User confirmed:', confirmed))
    // .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    
    let obj ={
      "Username":  value.Username,
      "Email": value.Email,
    }
    this.userservices.DeleteUser(obj).subscribe((response)=>{
      console.log(response);
      this.getAllUsers();

    })
  }

  cancelClick(){

    this.addUserform.reset();
    this.isAddUserForm= false;
  }
  clearClick(){
    this.addUserform = this.formBuilder.group({
      Username: [""],
      Display_Name: [""],
      email: [""],
      Password: [""],
      Role: [""],
    })
  }
}
